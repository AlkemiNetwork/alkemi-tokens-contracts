# Alkemi Protocol ERC20 Tokens [![Build Status](https://travis-ci.com/project-alkemi/alkemi-tokens-contracts.svg?branch=master)](https://travis-ci.com/project-alkemi/alkemi-tokens-contracts) [![CircleCI](https://circleci.com/gh/project-alkemi/alkemi-tokens-contracts/tree/master.svg?style=svg)](https://circleci.com/gh/project-alkemi/alkemi-tokens-contracts/tree/master)

## Local development chain

For local development it is recommended to use 
[ganache](http://truffleframework.com/ganache/) to run a local development 
chain. Using the ganache simulator no full Ethereum node is required.

We use the default ganache-cli command to confgure and run a local 
development ganache.

    $ npm run ganache (or ganache-cli --port 8545)

### Development Setup

Node.js LTS or greater required.

```bash
# Bootstrap project dependencies:
$ npm i

# Compile contracts
$ npm run compile

# Run all tests
$ npm run test

# Run Alkemi Token tests
$ npm run test:alkemi-token

# Run Alkemi Prime tests
$ npm run test:alkemi-prime

# Run coverage
$ npm run coverage
```

## Deployment

### Alkemi Token Deployment

To deploy a new Alkemi Token run:

```bash
# Run ganache
$ npm run ganache

# Deploy Contract using openzeppelin sdk and then make sure to call initialize(_sender: address) function
$ openzeppelin create AlkemiToken --network devlopment

# To interact with Alkemi Token
$ openzeppelin call --to deployedProxyAddress -n development
```

### Alkemi Prime Deployment

To deploy a new Alkemi Prime run:

```bash
# Run ganache
$ npm run ganache

# Deploy Contract using openzeppelin sdk and then make sure to call initialize(_sender: address) function
$ openzeppelin create AlkemiPrime --network devlopment

# To interact with Alkemi Token
$ openzeppelin call --to deployedProxyAddress -n development
```

## Upgradeable contracts

We use OpenZeppelin SDK for upgradeablity of the different contracts.
Refer to the [OpenZeppelin SDK documentation](https://docs.openzeppelin.com/sdk/2.5/) 
for more details.

## Issues

If you come across an issue with Alkemi Tokens contracts, do a search in the [Issues](https://bitbucket.org/project-alkemi/alkemi-tokens-contracts/issues) tab of this repo to make sure it hasn't been reported before. Follow these steps to help us prevent duplicate issues and unnecessary notifications going to the many people watching this repo:

- If the issue you found has been reported and is still open, and the details match your issue, give a "thumbs up" to the relevant posts in the issue thread to signal that you have the same issue. No further action is required on your part.
- If the issue you found has been reported and is still open, but the issue is missing some details, you can add a comment to the issue thread describing the additional details.
- If the issue you found has been reported but has been closed, you can comment on the closed issue thread and ask to have the issue reopened because you are still experiencing the issue. Alternatively, you can open a new issue, reference the closed issue by number or link, and state that you are still experiencing the issue. Provide any additional details in your post so we can better understand the issue and how to fix it.
