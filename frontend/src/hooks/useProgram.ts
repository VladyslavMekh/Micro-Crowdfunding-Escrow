import { useMemo } from "react";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import idl from "../../../target/idl/micro_crowdfunding_escrow.json";
import type { MicroCrowdfundingEscrow } from "../../../target/types/micro_crowdfunding_escrow";

export function useProgram() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    return useMemo(() => {
        if (!wallet) return null;
        const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
        return new Program<MicroCrowdfundingEscrow>(idl as MicroCrowdfundingEscrow, provider);
    }, [connection, wallet]);
}