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

const AlkemiToken = artifacts.require("AlkemiToken");

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('Alkemi Token', ([contractOwner, participant1, participant2, participant3, participant4, participant5, random]) => {

  const name = "Alkemi Token";
  const symbol = "ALK";
  const decimals = 18;

  let alkemiToken;

  before(async() => {
    alkemiToken = await AlkemiToken.new({
      from: contractOwner
    })

    await alkemiToken.initialize(contractOwner);
  });

  describe("Deployment", async() => {
    it("check deployment", async() => {
      let tokenName = await alkemiToken.name.call();
      let tokenSymbol = await alkemiToken.symbol.call();
      let tokenDecimals = await alkemiToken.decimals.call();
      let minter = await alkemiToken.isMinter.call(contractOwner);
      assert.equal(tokenName, name);
      assert.equal(tokenSymbol, symbol);
      assert.equal(tokenDecimals, decimals);
      assert.equal(minter, true);
    });
  });

  describe("Mint tokens", async() => {
    const supplyToMint = 500;

    it("should revert when minting token from address that have no permission", async() => {
      await alkemiToken.mint(participant1, supplyToMint, { from: participant2 }).should.be.rejectedWith(EVMRevert);
    });

    it("mint supply", async() => {
      await alkemiToken.mint(participant1, supplyToMint);
      let participant1Balance = await alkemiToken.balanceOf(participant1);
      assert.equal(supplyToMint, participant1Balance.toNumber());
    });
  });

  describe("Transfer token", async() => {
    const amountToTransfer = 150;

    it("should revert when sending token to address(0)", async() => {
      await alkemiToken.transfer(ZERO_ADDR, amountToTransfer, { from: participant1 }).should.be.rejectedWith(EVMRevert);
    });

    it("transfer token", async() => {
      let participant1BalanceBefore = await alkemiToken.balanceOf(participant1);
      await alkemiToken.transfer(participant2, amountToTransfer, { from: participant1 });
      let participant1BalanceAfter = await alkemiToken.balanceOf(participant1);
      let participant2Balance = await alkemiToken.balanceOf(participant2);
      assert.equal(participant1BalanceBefore.toNumber()-amountToTransfer, participant1BalanceAfter.toNumber());
      assert.equal(amountToTransfer, participant2Balance.toNumber());
    });

  });
});