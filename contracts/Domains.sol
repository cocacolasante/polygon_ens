// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract PolygonENS {
    /// variables

    // mappings
    mapping(string => address) public domains;
    mapping(string => string) public records;

    constructor(){
        console.log("I am the constructor");
    }

    // register domain name and add to maping
    function register(string calldata _name) public {

        require(domains[_name] == address(0), "already registered");
        domains[_name] = msg.sender;
        console.log("domain minted to %s", msg.sender);
    }

    function getAddress (string calldata _name) public view returns(address){
        return domains[_name];
    }

    function setRecord(string calldata _name, string calldata _record) public {
        require(domains[_name] == msg.sender, "not owner");
        records[_name] = _record;

    }
    function getRecord(string calldata _name) public view returns(string memory) {
        return records[_name];
    }

}
