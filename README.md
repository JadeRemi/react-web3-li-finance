### Li Finance Web3 Application

A showcase of wallet connectivity for **Ethereum**, **Solana** and **Bitcoin** networks.


### How to run

Installation

```
npm i
```

Launch

```
npm run dev
```

Tests

```
npx playwright install

npm run test
```


===

**What is included:**

- React
- Vite
- Wagmi + Bigmi
- Solana
- Material UI + Tailwind
- Playwright

**PREREQUISITES:**

Browser addons (Chromium):

- Xverse wallet (for BTC/UTXO)
- Solflare (for Solana)
- Metamask (for Ethereum)

Supported addons:

- Phantom
- Bitget
- Unisat
- Coinwallet
- Coinbase
- Wallet Connect
- Brave Wallet

![Screenshot](public/screenshot1.png)


![Screenshot](public/screenshot2.png)


![Screenshot](public/screenshot3.png)


![Screenshot](public/screenshot4.png)


===

Technical task:

**Multi-Chain Wallet Integration**

Objective:
Develop a React-based frontend application that enables users to connect wallets for multiple blockchain protocols (EVM, Solana, and UTXO) and displays their wallet balances. The solution must be implemented using TypeScript

**Requirements:**

1. Wallet Connectivity
Implement wallet connection functionality for the following blockchain ecosystems:
EVM-based blockchains: Only one EVM wallet can be connected at the same time
Solana blockchain
Bitcoin
One Wallet from each ecosystem (e.g., one EVM, one Solana, and one Bitcoin wallet) can be connected simultaneously.
Provide a simple and intuitive user interface for connecting each type of wallet.

2. Token List
Use the LI.FI API to query a list of all supported tokens and display that list on the frontend
Make sure the rendering of that list is optimized

3. Display Balances
After connecting a wallet, fetch and display the actual wallet's balances for each ecosystem in that token list
Ensure the UI dynamically updates when wallets are connected or disconnected.

4. Write a set of unit tests that test above functionality

**Deliverables:**

1. A React + TypeScript application with the following functionality defined above
2. Documentation, including:
Readme file with instructions on how to set up, run, and test the application locally.
Documentation of design decisions and assumptions made during the implementation.
Description of any blockers, challenges, or constraints encountered while building the solution.

**Evaluation Criteria:**

1. Code Quality and Structure
Clear and consistent naming conventions.
Logical and scalable folder/file structure.
Use of TypeScript best practices, including proper type definitions.
Effective error handling and robust code.

2. Documentation
Readability of the documentation and its ability to guide a new developer to set up and understand the project.
Thorough explanation of design decisions and assumptions.
Highlighting of challenges and blockers encountered during development.

3. Adherence to UI/UX Standards
A simple, intuitive, and user-friendly interface.
Responsive design for various screen sizes.
Clear display and dynamic updates of wallet balances.

4. Functionality
Successful implementation of wallet connection for EVM, Solana, and Bitcoin blockchains.
Correct and efficient fetching and display of wallet balances.
Smooth handling of connection and disconnection events.



