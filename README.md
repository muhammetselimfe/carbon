# Avatar: Voluntary Carbon Credit Market on Blockchain

## Project Overview
**Avatar** is an innovative blockchain-based platform designed to facilitate a Voluntary Carbon Credit Market. Leveraging the power of blockchain technology, Avatar aims to streamline the process of buying, selling, and trading carbon credits in a transparent and efficient manner.

## Technologies Used
This project employs a range of technologies to ensure robust and efficient functionality:

###  Scroll
Our contracts have been deployed and verified on the Scroll Sepolia Testnet. Key contracts include:

- **Avatar Contract**: `0xbCb425998f87AE6836Da6Ed38fcD06b66889B702`
- **Certificate Contract**: `0xbFebC4F091608a843178D25CF7EA40cE4976c44F`
- **CarbonMarket Contract**: `0xA09606fbE78A8aAD5b2022F8da3A9e3411FB3a31`
- **UniswapV2Factory Contract**: `0xeB7EF68738a567290334aD014a8d2676963cA2B7`
- **ERC20 Contract**: `0xd44CE48F251cfa19b5b1FB6dBbb00f83A5198FfD`
- **UniswapV2Router Contract**: `0x9bf000632C0D3cC5Ed4B1b6c5A27948EB7CB70A0`

### TheGraph Integration
We utilize TheGraph for querying blockchain data efficiently. This integration allows us to display NFT certificates directly in our frontend application without a traditional backend, using GraphQL queries.

- **Subgraph**: [Avatar Subgraph](https://thegraph.com/studio/subgraph/avatar)
- **Endpoint**: `https://api.studio.thegraph.com/query/57070/avatar/v1`
