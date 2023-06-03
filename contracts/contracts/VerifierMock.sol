pragma solidity ^0.8.0;

contract VerifierMock {
    mapping(address => bool) private verified;

    event AddressVerified(address indexed _address);
    event AddressRevoked(address indexed _address);

    function verifyAddress(
        address _account,
        string memory _merkleRoot,
        string memory _leaf
    ) external returns (bool) {
        require(!verified[_account], "Already verified");
        verified[_account] = true;
        emit AddressVerified(_account);

        return true;
    }

    function isVerified(address _address) external view returns (bool) {
        return verified[_address];
    }
}
