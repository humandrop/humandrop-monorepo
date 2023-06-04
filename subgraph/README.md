# HumanDrop subgraph

## Requirements:

- Install the graph globally `yarn global add @graphprotocol/graph-cli`

## Development

`graph codegen && graph build --network <polygon | mumbai>`

## Deploying

If it's your first time, you must auth `graph auth --product hosted-service CODE`

To deploy:
`graph deploy --product hosted-service rafinskipg/humandrop-mumbai --network mumbai`

To deploy:
`graph deploy --product hosted-service rafinskipg/humandrop-polygon --network matic`

## Deployment URLs

https://thegraph.com/hosted-service/subgraph/rafinskipg/humandrop-mumbai

https://thegraph.com/hosted-service/subgraph/rafinskipg/humandrop-polygon
