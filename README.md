# OrbitLumen

### Knowledge in orbit. Value on-chain.

**A decentralized marketplace for paywalled APIs, datasets, documents, and research — built on Stellar and Soroban smart contracts.**

This repository is the **frontend** for OrbitLumen: the React/TypeScript web application that publishers and consumers use to list, discover, purchase, and consume knowledge assets, with settlement handled entirely on-chain.

---

## What is OrbitLumen

OrbitLumen is a marketplace where knowledge — APIs, datasets, ML models, and research papers — can be listed, priced in XLM, and paywalled without relying on a centralized billing system or a trusted middleman. Publishers register a resource once, and every subsequent access is metered and settled automatically through Soroban smart contracts and the x402 micropayment protocol. There's no invoicing, no manual reconciliation, and no API key sprawl: access itself is the receipt.

The marketplace is designed for both humans and machines. A researcher can browse the catalog and pay for a dataset with a Freighter wallet in a few clicks, while an autonomous agent can discover the same resource through a machine-readable pricing schema, pay per call, and consume it unattended. This "agent-ready" design anticipates a near future where a growing share of API and data consumption is initiated by software rather than people.

Under the hood, OrbitLumen splits responsibility across four repositories: this frontend, a backend API that brokers metadata and analytics, a set of Soroban contracts that hold the source of truth for access grants and payment splits, and a deployment repo that ties infrastructure together. This separation keeps the trust-critical logic (access control, payment settlement) on-chain and auditable, while everything else — search, dashboards, UX — stays fast and iterable off-chain.

---

## Architecture

```
                          ┌──────────────────────────────┐
                          │       Freighter Wallet        │
                          │      (Stellar / Soroban)      │
                          └───────────────┬────────────────┘
                                          │ sign transactions
                                          ▼
┌─────────────────┐   REST / HTTPS   ┌───────────────────┐   x402 (HTTP 402)   ┌────────────────────┐
│  OrbitLumen       │◄───────────────►│  orbitlumen-backend │◄───────────────────►│  Resource Origins    │
│  Frontend          │                │  (Express API)      │                     │  API / Dataset /      │
│  (this repo)       │                │                     │                     │  Model / Research      │
└─────────┬──────────┘                └──────────┬──────────┘                     └────────────────────┘
          │                                       │
          │ auth · catalog · analytics            │ access grants · invoices · payouts
          ▼                                       ▼
┌───────────────────┐                   ┌──────────────────────┐
│     Supabase        │                   │   orbitlumen-contracts │
│ (Postgres · Auth)   │                   │      (Soroban)          │
└───────────────────┘                   └───────────┬──────────────┘
                                                      │
                                                      ▼
                                            ┌───────────────────┐
                                            │   Stellar Network   │
                                            │ (Testnet / Mainnet) │
                                            └───────────────────┘
```

- **Frontend** (this repo) renders the catalog, vault, and publisher dashboards, and drives wallet interactions via Freighter.
- **Backend** brokers catalog metadata, aggregates analytics, and acts as the x402 facilitator between consumers and resource origins.
- **Contracts** hold the canonical state for access grants, escrow, and revenue splits on Soroban.
- **Supabase** stores off-chain metadata (listings, user profiles, cached analytics) that doesn't need to live on-chain.

---

## Tech Stack

| Layer                | Technology              | Purpose                                                   |
| --------------------- | ------------------------ | ----------------------------------------------------------- |
| UI Framework          | React 18                 | Component-based frontend architecture                       |
| Language              | TypeScript                | Static typing across the app                                |
| Build Tool             | Vite                       | Dev server and production bundling                           |
| Styling                | Tailwind CSS               | Utility-first styling and design system                      |
| Wallet Integration     | Stellar Freighter API      | Signing transactions and reading wallet state                 |
| Micropayments          | x402 Protocol              | HTTP-native pay-per-request settlement                        |
| Smart Contracts        | Soroban                    | On-chain access control, escrow, and revenue splits            |
| Data & Auth            | Supabase                   | Off-chain metadata, authentication, and caching                |
| Backend API             | Express                    | Catalog API, analytics aggregation, x402 facilitation           |

---

## Features

- **On-chain access control** — every purchase mints a verifiable Soroban access grant; no shared API keys, no centralized gatekeeper.
- **x402 micropayments** — pay-per-call pricing settled in XLM over the x402 protocol, down to fractions of a cent per request.
- **Publisher dashboard** — publishers list resources, set pricing, and track consumption without writing billing infrastructure.
- **Real-time analytics** — live views into revenue, request volume, and buyer geography as it happens, not at end-of-month.
- **Agent-ready** — a machine-readable pricing schema lets autonomous agents discover, pay for, and consume resources unattended.

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm 9+
- [Freighter](https://www.freighter.app/) browser extension, configured with a Stellar testnet account
- Access to a running `orbitlumen-backend` instance (local or hosted) for full functionality

### Clone

```bash
git clone <this-repo-url>
cd orbitlumen-frontend
```

### Install

```bash
npm install
```

### Configure environment

```bash
cp .env.example .env
```

Fill in the values described in [Environment Variables](#environment-variables) below.

### Run

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

Other scripts:

```bash
npm run build     # type-check and produce a production build
npm run preview   # preview the production build locally
npm run lint      # run Oxlint
```

---

## Environment Variables

| Variable                     | Description                                                        | Example                                |
| ------------------------------ | ---------------------------------------------------------------------- | ------------------------------------------ |
| `VITE_API_BASE_URL`            | Base URL of the `orbitlumen-backend` API                                | `http://localhost:4000`                    |
| `VITE_STELLAR_NETWORK`         | Stellar network the app targets                                         | `TESTNET`                                  |
| `VITE_SOROBAN_RPC_URL`         | Soroban RPC endpoint used for contract reads/simulations                  | `https://soroban-testnet.stellar.org`      |
| `VITE_SOROBAN_CONTRACT_ID`     | Deployed contract ID for the OrbitLumen access-control contract           | `CA...XYZ`                                 |
| `VITE_SUPABASE_URL`            | Supabase project URL                                                     | `https://xyzcompany.supabase.co`           |
| `VITE_SUPABASE_ANON_KEY`       | Supabase anonymous/public API key                                         | `eyJhbGciOi...`                            |
| `VITE_X402_FACILITATOR_URL`    | Endpoint of the x402 facilitator used for micropayment settlement          | `http://localhost:4000/x402`               |

> Never commit a filled-in `.env` file. `.env.example` should be the only version-controlled reference.

---

## Screens

| Screen         | Route          | Description                                                                 |
| --------------- | --------------- | -------------------------------------------------------------------------------- |
| Catalog          | `/catalog`       | Browse, search, and filter paywalled APIs, datasets, models, and research         |
| My Vault         | `/vault`          | View resources you've purchased and their active on-chain access grants           |
| Analytics        | `/analytics`      | Publisher dashboard for revenue, consumption, and buyer geography                  |
| Purchases        | `/purchases`      | Full transaction history and on-chain settlement receipts                          |
| Leaderboard      | `/leaderboard`    | Top publishers and most-consumed resources across the marketplace                  |
| Agent            | `/agent`          | Machine-readable pricing schema and integration docs for autonomous agents          |

---

## SCF Build Award

OrbitLumen is submitted as part of the **Stellar Community Fund (SCF) Build Award** program. The project aims to demonstrate a production-quality, agent-ready commerce primitive for the Stellar ecosystem: on-chain access control for paywalled digital resources, settled through Soroban contracts and the x402 micropayment protocol.

If you're reviewing this submission:

- The **frontend** (this repo) is the primary user-facing surface described in the proposal.
- On-chain logic lives in [`orbitlumen-contracts`](#repository-siblings) and is the component most relevant to technical due diligence.
- See the [Architecture](#architecture) section above for how the pieces fit together, and the [Quick Start](#quick-start) section to run the app locally.

We welcome feedback from SCF reviewers and the broader Stellar community — please open an issue on this repository with any questions.

---

## Repository Siblings

OrbitLumen is split across four repositories:

| Repository              | Purpose                                                                          |
| -------------------------- | --------------------------------------------------------------------------------- |
| `orbitlumen-frontend`      | This repo — the React/TypeScript marketplace UI                                    |
| `orbitlumen-backend`       | Express API for catalog metadata, analytics aggregation, and x402 facilitation      |
| `orbitlumen-contracts`     | Soroban smart contracts for access grants, escrow, and revenue splits                |
| `orbitlumen-deploy`        | Infrastructure-as-code, CI/CD pipelines, and deployment configuration for all services |

---

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository and create a feature branch (`git checkout -b feature/my-change`).
2. Make your changes, following the existing TypeScript and Tailwind conventions in the codebase.
3. Run `npm run lint` and `npm run build` to make sure everything type-checks and builds cleanly.
4. Open a pull request with a clear description of the change and the motivation behind it.

For larger changes — new screens, new contract integrations, changes to the payment flow — please open an issue first to discuss the approach before submitting a PR.

---

## License

This project is licensed under the [MIT License](LICENSE).
