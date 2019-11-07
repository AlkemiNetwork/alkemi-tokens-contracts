const {
    BN,
    constants,
    expectEvent,
    expectRevert,
    ether
  } = require("@openzeppelin/test-helpers");
    
const BigNumber = require('bignumber.js');
const EVMRevert = require('./helpers/EVMRevert').EVMRevert;

const ZERO_ADDR = '0x0000000000000000000000000000000000000000';

const AlkemiPrime = artifacts.require("AlkemiPrime");

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('Alkemi Prime', ([contractOwner, participant1, participant2, participant3, participant4, participant5, random]) => {

  const name = "Alkemi Prime";
  const symbol = "ALP";
  const decimals = 18;

  let alkemiPrime;

  before(async() => {
      alkemiPrime = await AlkemiPrime.new({
      from: contractOwner
    })

    await alkemiPrime.initialize(contractOwner);
  });

  describe("Deployment", async() => {
    it("check deployment", async() => {
      let tokenName = await alkemiPrime.name.call();
      let tokenSymbol = await alkemiPrime.symbol.call();
      let tokenDecimals = await alkemiPrime.decimals.call();
      let minter = await alkemiPrime.isMinter.call(contractOwner);
      assert.equal(tokenName, name);
      assert.equal(tokenSymbol, symbol);
      assert.equal(tokenDecimals, decimals);
      assert.equal(minter, true);
    });
  });

  describe("Mint tokens", async() => {
    const supplyToMint = 500;

    it("should revert when minting token from address that have no permission", async() => {
      await alkemiPrime.mint(participant1, supplyToMint, { from: participant2 }).should.be.rejectedWith(EVMRevert);
    });

    it("mint supply", async() => {
      await alkemiPrime.mint(participant1, supplyToMint);
      let participant1Balance = await alkemiPrime.balanceOf(participant1);
      assert.equal(supplyToMint, participant1Balance.toNumber());
    });
  });

  describe("Transfer token", async() => {
    const amountToTransfer = 150;
  
    it("should not transfer token", async() => {
      let participant1BalanceBefore = await alkemiPrime.balanceOf(participant1);
      let participant2BalanceBefore = await alkemiPrime.balanceOf(participant2);
      await alkemiPrime.transfer(participant2, amountToTransfer, { from: participant1 });
      let participant1BalanceAfter = await alkemiPrime.balanceOf(participant1);
      let participant2BalanceAfter = await alkemiPrime.balanceOf(participant2);
      assert.equal(participant1BalanceBefore.toNumber(), participant1BalanceAfter.toNumber());
      assert.equal(participant2BalanceBefore.toNumber(), participant2BalanceAfter.toNumber());
    });
  });

  describe("Burn token", async() => {
    const amountToBurn = 200;

    it("burn token", async() => {
      let participant1BalanceBefore = await alkemiPrime.balanceOf(participant1);
      await alkemiPrime.burn(amountToBurn, { from: participant1 });
      let participant1BalanceAfter = await alkemiPrime.balanceOf(participant1);
      assert.equal(participant1BalanceBefore.toNumber()-amountToBurn, participant1BalanceAfter.toNumber());
    });
  });
});