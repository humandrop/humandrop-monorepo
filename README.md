# HumanDrop

![](./docs/humandrop.png)

Have you ever wanted to make sure that your airdrop was claimed only by humans?

Introducing *Humandrop*

Humandrop is an opensource toolkit and platform to create human only claimable airdrops.

## How does HumanDrop work?

Users are able to create new contracts that are deployed on Polygon thanks to a contract factory through our [webapp](./humandrop-webapp/README.md).

In the contract, the users are able to specify which token they want to airdrop and how much each human can claim from it. 

Human verifications are stored in a Verifier contract. Each human verified can claim any token from the AirdropFactory. 


## Creating an Airdrop on humandrop.com

Users that don't want to deploy a SmartContract or don't want to create a custom UI to generate an Airdrop can use HumanDrop webapp to create Airdrops and guide their users during the claiming process.

For more information, visit [https://humandrop.com/airdrop](https://humandrop.com/airdrop)

## Integrating HumanDrop in your airdrop SmartContract

Some projects may want to airdrop specified quantities of tokens to each individual wallet based on historical reputation on their project. To do that, the airdrop contracts can interact with the HumanDrop verifiers or viceversa.


### Using HumanDrop Verifier

HumanDrop verifier is deployed on Polygon at 0x000, to interact with it you can just simply call "isVerified" on the Verifier contract.


```
IVerifier public verifier;

// Your airdrop contract
constructor(address _verifier) {
    //... your contract constructor ...
    verifier = IVerifier(_verifier);

}

function claim(address _account) external {
    require(verifier.isVerified(msg.sender), "Not a human");

    // Your claim logic
}


```

Note: It is important that your users are verified first. Redirect your users to [https://humandrop.com/verify](https://humandrop.com/verify) to register in the HumanDrop Verifier. 

## How is "proof of humanity" ensured?

We use [Worldcoin WorldId](https://docs.worldcoin.org/api) to verify that all the users that interact with HumanDrop are human*. 

