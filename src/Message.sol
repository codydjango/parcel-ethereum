pragma solidity ^0.5.0;

contract Message {
    string message;

    constructor(string memory _special) public {
        message = _special;  
    }

    function getTheMessage() public view returns (string memory) {
        return message;
    }
}
