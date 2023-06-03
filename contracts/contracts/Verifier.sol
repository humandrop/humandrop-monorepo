pragma solidity ^0.8.0;
import "./interfaces/IWorldId.sol";
import {ByteHasher} from "./lib/ByteHasher.sol";

contract Verifier {
    using ByteHasher for bytes;

    IWorldID public worldId;
    mapping(address => bool) private verified;
    uint256 internal immutable externalNullifier;

    constructor(
        address _worldId,
        string memory _appId,
        string memory _actionId
    ) {
        worldId = IWorldID(_worldId);
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
    }

    event AddressVerified(address indexed _address);
    event AddressRevoked(address indexed _address);

    function verifyAddress(
        address _account,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external returns (bool) {
        require(!verified[_account], "Already verified");

        worldId.verifyProof(
            root,
            // 1,
            abi.encodePacked(_account).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        verified[_account] = true;
        emit AddressVerified(_account);

        return true;
    }

    function isVerified(address _address) external view returns (bool) {
        return verified[_address];
    }
}
