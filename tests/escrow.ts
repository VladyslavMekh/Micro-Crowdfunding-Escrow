import * as anchor from "@coral-xyz/anchor";
import { assert } from "chai";
import { BN } from "bn.js";

import { MicroCrowdfundingEscrow } from "../target/types/micro_crowdfunding_escrow";

describe("micro-crowdfunding-escrow", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program =
      anchor.workspace.microCrowdfundingEscrow as anchor.Program<MicroCrowdfundingEscrow>;

  const creator = provider.wallet.publicKey;
  const donor = provider.wallet;

  const SYSTEM_PROGRAM_ID = anchor.web3.SystemProgram.programId;

  const CAMPAIGN_SEED = Buffer.from("campaign");
  const VAULT_SEED = Buffer.from("vault");
  const CONTRIBUTOR_SEED = Buffer.from("contributor");

  const MIN_DONATION = 1_000_000; // 0.001 SOL

  // ------------------------------------------------------------
  // PDA helpers
  // ------------------------------------------------------------

  function campaignPda(campaignId: BN) {
    return anchor.web3.PublicKey.findProgramAddressSync(
        [
          CAMPAIGN_SEED,
          creator.toBuffer(),
          campaignId.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
    );
  }

  function vaultPda(campaign: anchor.web3.PublicKey) {
    return anchor.web3.PublicKey.findProgramAddressSync(
        [VAULT_SEED, campaign.toBuffer()],
        program.programId
    );
  }

  function contributorPda(
      campaign: anchor.web3.PublicKey,
      donorPublicKey: anchor.web3.PublicKey
  ) {
    return anchor.web3.PublicKey.findProgramAddressSync(
        [
          CONTRIBUTOR_SEED,
          campaign.toBuffer(),
          donorPublicKey.toBuffer(),
        ],
        program.programId
    );
  }

  async function getBalance(
      publicKey: anchor.web3.PublicKey
  ): Promise<number> {
    return provider.connection.getBalance(publicKey);
  }

  // ------------------------------------------------------------
  // Blockchain time helper
  // ------------------------------------------------------------

  async function getBlockchainTime(): Promise<number> {
    const slot = await provider.connection.getSlot("processed");

    const blockTime =
        await provider.connection.getBlockTime(slot);

    if (blockTime === null) {
      throw new Error(
          `Could not get block time for slot ${slot}`
      );
    }

    return blockTime;
  }

  /*
   * Wait until Solana Clock is past the deadline.
   *
   * The local validator in this project does not support
   * the warpSlot RPC method.
   *
   * Therefore we create real transactions to make the
   * local validator produce new blocks.
   */
  async function waitUntilDeadline(
      deadline: number
  ): Promise<void> {
    const timeout = Date.now() + 30_000;

    while (true) {
      const blockchainTime =
          await getBlockchainTime();

      console.log(
          `blockchainTime=${blockchainTime}, deadline=${deadline}`
      );

      if (blockchainTime > deadline) {
        return;
      }

      if (Date.now() > timeout) {
        throw new Error(
            `Timeout waiting for campaign deadline. ` +
            `blockchainTime=${blockchainTime}, ` +
            `deadline=${deadline}`
        );
      }

      /*
       * Produce a real transaction.
       *
       * Sending 1 lamport from the wallet to itself
       * forces the local validator to process a transaction.
       */
      const transaction =
          new anchor.web3.Transaction().add(
              anchor.web3.SystemProgram.transfer({
                fromPubkey: provider.wallet.publicKey,
                toPubkey: provider.wallet.publicKey,
                lamports: 1,
              })
          );

      await provider.sendAndConfirm(transaction);

      /*
       * Give the validator a moment to update its clock.
       */
      await new Promise((resolve) =>
          setTimeout(resolve, 100)
      );
    }
  }

  // ============================================================
  // 1. initialize_campaign
  // ============================================================

  it("initialize_campaign", async () => {
    const campaignId = new BN(1001);

    const targetAmount = new BN(
        5 * anchor.web3.LAMPORTS_PER_SOL
    );

    /*
     * Use blockchain time instead of Date.now().
     */
    const currentTime =
        await getBlockchainTime();

    const deadline =
        new BN(currentTime + 60);

    const [campaign] =
        campaignPda(campaignId);

    const [vault] =
        vaultPda(campaign);

    await program.methods
        .initializeCampaign(
            campaignId,
            targetAmount,
            deadline
        )
        .accounts({
          creator,
          campaign,
          vault,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .rpc();

    const account =
        await program.account.campaign.fetch(
            campaign
        );

    assert.equal(
        account.creator.toBase58(),
        creator.toBase58()
    );

    assert.equal(
        account.campaignId.toNumber(),
        campaignId.toNumber()
    );

    assert.equal(
        account.targetAmount.toNumber(),
        targetAmount.toNumber()
    );

    assert.equal(
        account.currentAmount.toNumber(),
        0
    );

    assert.equal(
        account.deadline.toNumber(),
        deadline.toNumber()
    );

    assert.isFalse(
        account.isFinalized
    );

    console.log(
        "initialize_campaign: OK"
    );

    console.log(
        "campaign:",
        campaign.toBase58()
    );

    console.log(
        "vault:",
        vault.toBase58()
    );
  });

  // ============================================================
  // 2. donate
  // ============================================================

  it("donate", async () => {
    const campaignId = new BN(1002);

    const targetAmount = new BN(
        5 * anchor.web3.LAMPORTS_PER_SOL
    );

    const currentTime =
        await getBlockchainTime();

    const deadline =
        new BN(currentTime + 60);

    const [campaign] =
        campaignPda(campaignId);

    const [vault] =
        vaultPda(campaign);

    const [contributorRecord] =
        contributorPda(
            campaign,
            donor.publicKey
        );

    /*
     * Initialize campaign.
     */

    await program.methods
        .initializeCampaign(
            campaignId,
            targetAmount,
            deadline
        )
        .accounts({
          creator,
          campaign,
          vault,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .rpc();

    /*
     * Donation amount.
     */

    const donationAmount =
        new BN(MIN_DONATION);

    const vaultBefore =
        await getBalance(vault);

    /*
     * Donate.
     */

    await program.methods
        .donate(donationAmount)
        .accounts({
          donor: donor.publicKey,
          campaign,
          vault,
          contributorRecord,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .rpc();

    const vaultAfter =
        await getBalance(vault);

    /*
     * Fetch campaign.
     */

    const campaignAccount =
        await program.account.campaign.fetch(
            campaign
        );

    /*
     * Fetch contributor.
     */

    const contributorAccount =
        await program.account.contributorRecord.fetch(
            contributorRecord
        );

    /*
     * Campaign amount increased.
     */

    assert.equal(
        campaignAccount.currentAmount.toNumber(),
        MIN_DONATION
    );

    /*
     * Contributor record contains donation.
     */

    assert.equal(
        contributorAccount.amount.toNumber(),
        MIN_DONATION
    );

    assert.equal(
        contributorAccount.donor.toBase58(),
        donor.publicKey.toBase58()
    );

    assert.equal(
        contributorAccount.campaign.toBase58(),
        campaign.toBase58()
    );

    /*
     * Vault received donation.
     */

    assert.equal(
        vaultAfter - vaultBefore,
        MIN_DONATION
    );

    console.log(
        "donate: OK"
    );
  });

  // ============================================================
  // 3. refund
  // ============================================================

  it("refund", async () => {
    const campaignId = new BN(1003);

    /*
     * Target is much higher than donation.
     *
     * Therefore campaign will fail.
     */
    const targetAmount = new BN(
        5 * anchor.web3.LAMPORTS_PER_SOL
    );

    /*
     * Get actual blockchain time.
     */
    const currentTime =
        await getBlockchainTime();

    /*
     * Short deadline.
     */
    const deadline =
        new BN(currentTime + 5);

    const [campaign] =
        campaignPda(campaignId);

    const [vault] =
        vaultPda(campaign);

    const [contributorRecord] =
        contributorPda(
            campaign,
            donor.publicKey
        );

    /*
     * ----------------------------------------------------------
     * initialize_campaign
     * ----------------------------------------------------------
     */

    await program.methods
        .initializeCampaign(
            campaignId,
            targetAmount,
            deadline
        )
        .accounts({
          creator,
          campaign,
          vault,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .rpc();

    /*
     * ----------------------------------------------------------
     * donate
     * ----------------------------------------------------------
     */

    const donationAmount =
        new BN(MIN_DONATION);

    await program.methods
        .donate(donationAmount)
        .accounts({
          donor: donor.publicKey,
          campaign,
          vault,
          contributorRecord,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .rpc();

    /*
     * Verify campaign before refund.
     */

    const campaignBeforeRefund =
        await program.account.campaign.fetch(
            campaign
        );

    assert.equal(
        campaignBeforeRefund.currentAmount.toNumber(),
        MIN_DONATION
    );

    assert.isFalse(
        campaignBeforeRefund.currentAmount.gte(
            campaignBeforeRefund.targetAmount
        )
    );

    console.log(
        "refund deadline:",
        deadline.toNumber()
    );

    /*
     * ----------------------------------------------------------
     * Wait until deadline
     * ----------------------------------------------------------
     */

    await waitUntilDeadline(
        deadline.toNumber()
    );

    /*
     * ----------------------------------------------------------
     * refund
     * ----------------------------------------------------------
     */

    const vaultBefore =
        await getBalance(vault);

    await program.methods
        .refund()
        .accounts({
          donor: donor.publicKey,
          campaign,
          vault,
          contributorRecord,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .rpc();

    const vaultAfter =
        await getBalance(vault);

    /*
     * Vault should lose exactly donation amount.
     */

    assert.equal(
        vaultBefore - vaultAfter,
        MIN_DONATION
    );

    /*
     * Contributor record should be closed.
     */

    const contributorAfterRefund =
        await provider.connection.getAccountInfo(
            contributorRecord
        );

    assert.isNull(
        contributorAfterRefund
    );

    console.log(
        "refund: OK"
    );
  });

  // ============================================================
  // 4. claim_funds
  // ============================================================

  it("claim_funds", async () => {
    const campaignId = new BN(1004);

    /*
     * Donation equals target.
     */
    const targetAmount =
        new BN(MIN_DONATION);

    const currentTime =
        await getBlockchainTime();

    const deadline =
        new BN(currentTime + 60);

    const [campaign] =
        campaignPda(campaignId);

    const [vault] =
        vaultPda(campaign);

    /*
     * ----------------------------------------------------------
     * initialize_campaign
     * ----------------------------------------------------------
     */

    await program.methods
        .initializeCampaign(
            campaignId,
            targetAmount,
            deadline
        )
        .accounts({
          creator,
          campaign,
          vault,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .rpc();

    /*
     * ----------------------------------------------------------
     * donate
     * ----------------------------------------------------------
     */

    const [contributorRecord] =
        contributorPda(
            campaign,
            donor.publicKey
        );

    await program.methods
        .donate(
            new BN(MIN_DONATION)
        )
        .accounts({
          donor: donor.publicKey,
          campaign,
          vault,
          contributorRecord,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .rpc();

    /*
     * Verify campaign reached target.
     */

    const campaignBeforeClaim =
        await program.account.campaign.fetch(
            campaign
        );

    assert.equal(
        campaignBeforeClaim.currentAmount.toNumber(),
        MIN_DONATION
    );

    assert.equal(
        campaignBeforeClaim.targetAmount.toNumber(),
        MIN_DONATION
    );

    assert.isFalse(
        campaignBeforeClaim.isFinalized
    );

    /*
     * Verify vault contains donation.
     */

    const vaultBefore =
        await getBalance(vault);

    assert.equal(
        vaultBefore,
        MIN_DONATION
    );

    /*
     * ----------------------------------------------------------
     * claim_funds
     * ----------------------------------------------------------
     */

    await program.methods
        .claimFunds()
        .accounts({
          creator,
          campaign,
          vault,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .rpc();

    /*
     * Campaign should be finalized.
     */

    const campaignAfterClaim =
        await program.account.campaign.fetch(
            campaign
        );

    assert.isTrue(
        campaignAfterClaim.isFinalized
    );

    /*
     * Vault should be empty.
     */

    const vaultAfter =
        await getBalance(vault);

    assert.equal(
        vaultAfter,
        0
    );

    console.log(
        "claim_funds: OK"
    );
  });
});