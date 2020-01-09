pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Mintable.sol";

contract AlkemiToken is Initializable, ERC20Detailed, ERC20Mintable {
    function initialize(address _sender) public initializer {
        ERC20Detailed.initialize("Alkemi Token", "ALK", 18);

        ERC20Mintable.initialize(_sender);
    }

}
