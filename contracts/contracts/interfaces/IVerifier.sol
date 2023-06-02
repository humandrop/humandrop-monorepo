pragma solidity ^0.8.0;

interface IVerifier {
    event AddressVerified(address indexed _address);
    event AddressRevoked(address indexed _address);

    function verifyAddress(
        address _account,
        bytes32 _merkleRoot,
        bytes32 _leaf
    ) external returns (bool);

    function isVerified(address _address) external view returns (bool);
}