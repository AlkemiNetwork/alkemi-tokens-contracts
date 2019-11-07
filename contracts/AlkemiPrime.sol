pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Burnable.sol";

contract AlkemiPrime is Initializable, ERC20Detailed, ERC20Mintable, ERC20Burnable {
  function initialize(address _sender) public initializer {
    ERC20Detailed.initialize("Alkemi Prime", "ALP", 18);

    ERC20Mintable.initialize(_sender);
  }

  // Non transferable token
  function transfer(address to, uint256 value) public returns (bool) {
    return false;
  }

  function transferFrom(address from, address to, uint256 value) public returns (bool) {
    return false;
  }

}
