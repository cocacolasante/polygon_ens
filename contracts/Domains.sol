// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import { StringUtils } from "../libraries/StringUtils.sol";

contract PolygonENS {
    /// variables
    string public tld;

    // mappings
    mapping(string => address) public domains;
    mapping(string => string) public records;

    constructor(string memory _tld) payable{
        tld = _tld;
        console.log("ENS Deployed: ", _tld);
    }

    // determine price 
    function price(string calldata name) public pure returns(uint){
        uint len = StringUtils.strlen(name);
        require(len > 0);
        if(len == 3){
            return 5 * 10**17;
        } else if (len == 4){
            return 3 * 10**17;
        } else {
            return 1 * 10**17;
        }
    }


    // register domain name and add to maping
    function register(string calldata _name) public payable {
        require(domains[_name] == address(0), "already registered");

        uint _price = price(_name);

        require(msg.value >= _price, "not enough Matic paid");

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
