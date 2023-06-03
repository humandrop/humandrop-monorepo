pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IVerifier {
    function isVerified(address _account) external view returns (bool);
}

contract AirdropFactory {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    IVerifier public verifier;

    Counters.Counter private _airdropIds;

    mapping(uint256 => Airdrop) public airdrops;
    mapping(address => uint256[]) public airdropsByOwner;

    constructor(address _verifier) {
        verifier = IVerifier(_verifier);
    }

    event AirdropCreated(
        uint256 id,
        address owner,
        address tokenAddress,
        uint256 amountPerUser,
        uint256 startDate,
        uint256 endDate,
        uint256 maxUsers
    );

    function createAirdrop(
        address _tokenAddress,
        uint256 _amountPerUser,
        uint256 maxUsers,
        uint256 startDate,
        uint256 endDate
    ) external returns (uint256) {
        _airdropIds.increment();
        uint256 newAirdropId = _airdropIds.current();

        airdrops[newAirdropId] = new Airdrop(
            newAirdropId,
            msg.sender,
            _tokenAddress,
            _amountPerUser,
            startDate,
            endDate,
            maxUsers,
            address(verifier)
        );


        airdropsByOwner[msg.sender].push(newAirdropId);

        emit AirdropCreated(
            newAirdropId,
            msg.sender,
            _tokenAddress,
            _amountPerUser,
            startDate,
            endDate,
            maxUsers
        );

        // Send the tokens to the airdrop contract
        IERC20(_tokenAddress).transferFrom(
            msg.sender,
            address(airdrops[newAirdropId]),
            _amountPerUser * maxUsers
        );

        return newAirdropId;
    }

    function getAirdropsByOwner(
        address _owner
    ) external view returns (uint256[] memory) {
        return airdropsByOwner[_owner];
    }
}

contract Airdrop is Pausable, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    using Counters for Counters.Counter;

    Counters.Counter private claimedCount;


    uint256 public id;
    address public owner;
    IERC20 public token;
    uint256 public amountPerUser;
    uint256 public startDate;
    uint256 public endDate;
    uint256 public maxUsers;

    IVerifier public verifier;

    mapping(address => bool) public claimed;

    event Claimed(address indexed account, uint256 amount);

    constructor(
        uint256 _id,
        address _owner,
        address _tokenAddress,
        uint256 _amountPerUser,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _maxUsers,
        address _verifier
    ) {
        id = _id;
        owner = _owner;
        token = IERC20(_tokenAddress);
        amountPerUser = _amountPerUser;
        startDate = _startDate;
        endDate = _endDate;
        maxUsers = _maxUsers;
        verifier = IVerifier(_verifier);
    }

    function claim() external nonReentrant whenNotPaused {
        require(verifier.isVerified(msg.sender), "Not verified");
        require(!claimed[msg.sender], "Already claimed");

        uint256 balance = token.balanceOf(address(this));
        require(balance >= amountPerUser, "Not enough tokens");
        require(block.timestamp >= startDate, "Not started");
        require(block.timestamp <= endDate, "Ended");
        require(claimedCount.current() < maxUsers, "Max users reached");


        claimed[msg.sender] = true;
        token.transfer(msg.sender, amountPerUser);

        emit Claimed(msg.sender, amountPerUser);
        claimedCount.increment();
    }

    function isHuman(address _account) external view returns (bool) {
        return verifier.isVerified(_account);
    }

    function hasClaimed(address _account) external view returns (bool) {
        return claimed[_account];
    }

    function totalClaims() external view returns (uint256) {
        return claimedCount.current();
    }

    function pause() external {
        require(msg.sender == owner, "Not authorized");
        _pause();
    }

    function unpause() external {
        require(msg.sender == owner, "Not authorized");
        _unpause();
    }

    // Owner can withdraw any tokens that are sent here by mistake
    function withdraw(address _tokenAddress) external {
        require(msg.sender == owner, "Not authorized");
        IERC20 token = IERC20(_tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        token.transfer(msg.sender, balance);
    }
}
