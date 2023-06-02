pragma solidity ^0.8.0;

interface IWorldcoin {
    function verifyMerkleRoot(
        bytes32 merkleRoot,
        bytes32 leaf,
        address account
    ) external returns (bool);
}

contract Verifier {
    IWorldcoin public worldcoin;
    mapping(address => bool) private verified;

    constructor(address _worldcoin) {
        worldcoin = IWorldcoin(_worldcoin);
    }

    event AddressVerified(address indexed _address);
    event AddressRevoked(address indexed _address);

    function verifyAddress(
        address _account,
        bytes32 _merkleRoot,
        bytes32 _leaf
    ) external returns (bool) {
        require(!verified[_account], "Already verified");

        if (worldcoin.verifyMerkleRoot(_merkleRoot, _leaf, _account)) {
            verified[_account] = true;
            emit AddressVerified(_account);

            return true;
        }

        return false;
    }

    function isVerified(address _address) external view returns (bool) {
        return verified[_address];
    }
}
