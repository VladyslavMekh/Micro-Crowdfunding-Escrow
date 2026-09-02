# Micro-Crowdfunding Escrow

![image](https://github.com/VladyslavMekh/Micro-Crowdfunding-Escrow/blob/main/assets/logo_with_text.png "Micro-Crowdfunding Escrow logo")

A decentralized micro-crowdfunding platform built on **Solana**, where
contributors' funds are help in an **on-chain escrow account** controlled by a
smart contract (Anchor program) and released only according to transparent,
predefined rules – instead of relying on a trusted third party.

The project consists of two parts:

– **`program/`** – the on-chain smart contract (program) build with
the [Anchor](https://www.anchor-lang.com/) framework. </br>
– **`frontend/`** – a client application for interacting with the program
(creating campaigns, contributing, checking escrow status).

> ⚠️ The project is deployed and tested on **devnet** and is intended for
> learning/demo purposes. Get a proper security audit before using it in
> production.

---

## Table of Contents

– [How It Works](#how-it-works)</br>
– [Tech Stack](#tech-stack)</br>
– [Repository Structure](#repository-structure)</br>
– [Prerequisites](#prerequisites)</br>
– [Installation & Setup](#installation--setup)</br>
– [Testing](#testing)</br>
– [Deploying the Program](#deploying-the-program)</br>
– [Frontend](#frontend)</br>
– [Roadmap](#roadmap)</br>
– [License](#license)</br>
– [Contact](#contact)</br>

---

## How It Works

The idea behind escrow-based crowdfunding is simple:

1. A campaign creator sets up a campaign with a funding goal and (optionally) a
   deadline.
2. Contributors send funds – instead of going directly to the campaign creator,
   the money is deposited into a **PDA (Program Derived Address)** controlled by
   the smart contract.
3. Once the campaign's conditions are met (e.g., the funding goal is reached),
   the funds are released to the recipient.
4. If the campaign fails to reach its goal (or is cancelled / the deadline
   passes), contributors can claim a **refund** directly from the escrow
   account.

This way, no single party unilaterally controls the funds – the release/refund
logic is fully enforced by the program's code rather than by a platform
operator.

*(For the exact list program instructions and their parameters, see the code in
`program/src`.)*

## Tech Stack

| Component        | Technology                                                                                                                                 |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| Smart contract   | [Anchor](https://www.anchor-lang.com/) (Rust)                                                                                              |
| Blockchain       | [Solana](https://solana.com/)                                                                                                              |
| Client libraries | [`@coral-xyz/anchor`](https://www.npmjs.com/package/@coral-xyz/anchor), [`@solana/web3.js`](https://www.npmjs.com/package/@solana/web3.js) |
| Tests            | TypeScript, Mocha/Chai, `ts-mocha`                                                                                                         |
| Formatting       | Prettier                                                                                                                                   |
| Package manager  | Yarn                                                                                                                                       |
| Frontend         | TypeScript (see `frontend/`)                                                                                                               |

## Repository Structure

```
Micro-Crowdfunding-Escrow/
├── assets/                            # Logo and other static assets
├── frontend/                          # Client application
├── program/                           # Anchor program (smart contract) written in Rust
├── Anchor.toml                        # Anchor configuration (cluster, scripts, wallet)
├── Cargo.toml / Cargo.lock            # Rust dependencies for the program
├── package.json / package-lock.json   # Dependencies for tests/tooling
└── tsconfig.json                      # TypeScript configuration
```

## Prerequisites

Before you start, install:

– [Rust](https://www.rust-lang.org/tools/install) </br>
– [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools) </br>
– [Anchor CLI](https://www.anchor-lang.com/docs/installation) (version matching
`Anchor.toml`) </br>
– [Node.js](https://nodejs.org/) (LTS) and [Yarn](https://yarnpkg.com/) </br>
– A Solana wallet for devnet (`solana-keygen new`), at the path referenced in
`Anchor.toml` (`~/.config/solana/id.json`)

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/VladyslavMekh/Micro-Crowdfunding-Escrow.git
cd Micro-Crowdfunding-Escrow

# Install dependencies
yarn install

# Build the program
anchor build

# (optional) fund your devnet wallet
solana airdrop 2 --url devnet
```

After building, update the `program_id` in `Anchor.toml` and in the program code
(`declare_id`) with the value produced by `anchor build` / `anchor keys list`.

## Testing

> ⚠️ The suite is not implemented yet.
>
> Once tests are added (TypeScript + Mocha/Chai, run via Anchor), they will be
> executed with:

```bash
anchor test
```

> This will spin up a local validator, deploy the program, and run the test
> suite from `tests/`.

– [ ] Add test suite (unit + integration test via Anchor)

## Deploying the Program

```bash
# Deploy to devnet (default cluster, see Anchor.toml)
anchor deploy

# Or explicitly specify the cluster
anchor deploy --provide.cluster devnet
```

## Fronted

The client app lives in `frontend/` and interacts with the program via
`@coral-xyz/anchor` and `@solana/web3.js`, using the IDL generated during
`anchor build`.

```bash
cd frontend
yarn install
yarn dev
```

*(Double-check the exact run scripts against `frontend/package.json` if they differ.)*

## Roadmap

– [ ] Support for milestone-based partial payouts
– [ ] Contributor voting for early fund release/refund
– [ ] Smart contract security audit
– [ ] Mainnet-beta deployment

## License

This project is licensed under the [MIT License](LICENSE).

## Contact
Author: [Vladyslav Mekh](https://github.com/VladyslavMekh) </br>
Email: [vladmekh101@gmail.com](mailto:vladmekh101@gmail.com) </br>
Issues and suggestions are welcome via the repository's [GitHub Issues](https://github.com/VladyslavMekh/Micro-Crowdfunding-Escrow/issues).