var alkemiPrime = artifacts.require("AlkemiPrime");
var alkemiToken = artifacts.require("AlkemiToken");

module.exports = (deployer, accounts) => {
  deployer.then(async() => {
    await deployer.deploy(alkemiToken, accounts[0]);

    await deployer.deploy(alkemiPrime, accounts[0]);
  });
}
