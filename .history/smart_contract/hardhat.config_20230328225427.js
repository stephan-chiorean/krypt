//https://eth-sepolia.g.alchemy.com/v2/-n3k24R54lWiCPCdva84_gjisVvk8FgB

require('@nomiclabs/hardhat-waffle');


module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/-n3k24R54lWiCPCdva84_gjisVvk8FgB',
      accounts: ['a1ca22e8e44c7d3f7a2c02ae8a96a2b5fb07904f22781861ccb5d40119ffed18']
    }
  }
}