const { scripts, ConfigManager } = require("@openzeppelin/cli");
const { add, push, create } = scripts;

var AlkemiPrime = artifacts.require("AlkemiPrime");
var AlkemiToken = artifacts.require("AlkemiToken");

async function deploy(options) {
  add({ 
      contractsData: [
          { name: 'AlkemiPrime', alias: 'AlkemiPrime' },
          { name: 'AlkemiToken', alias: 'AlkemiToken' }
      ]
  });

  await push(options);

  let alkemiToken = await create(Object.assign({ contractAlias: 'AlkemiToken' }, options));
  let alkemiPrime = await create(Object.assign({ contractAlias: 'AlkemiPrime' }, options));
}

module.exports = function(deployer, networkName, accounts) {
  deployer.then(async () => {
      const { network, txParams } = await ConfigManager.initNetworkConfiguration({ network: networkName, from: accounts[0] });
      await deploy({ network, txParams });
  })
}