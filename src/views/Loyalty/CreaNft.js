// ** MUI Imports
import { ethers } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import { useState, useEffect } from 'react'
import erc721abi from 'src/views/Loyalty/ERC721abi.json'
import bytecode from 'src/views/Loyalty/bytecode.json'
import { ContractFactory } from 'ethers'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

const PurpleOvalInput = styled('input')({
  borderRadius: '50px',
  backgroundColor: 'transparent',
  color: '#000000',
  padding: '10px',
  border: '2px solid #6A1B9A',
  outline: 'none',
  marginRight: '10px'
})

const CreaNft = () => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  const goerliProviderUrl = 'https://goerli.infura.io/v3/39e808bc435f475c92682224863598a5' // sostituisci con il tuo ID progetto Infura
  const contractAddress = '0xe0bC8029a37d42bb1F8910ae5F0D420f423eF37F'
  const contractABI = erc721abi

  //funzione Minta NFT
  const handleMint = async e => {
    e.preventDefault()
    const data = new FormData(e.target)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()
    const contractBytecode = bytecode
    const factory = new ethers.ContractFactory(contractABI, contractBytecode, signer)
    const contract = await factory.deploy(data.get('_name'), data.get('_symbol'), data.get('_initBaseURI'))
    await contract.deployed()
    console.log('Contract deployed at address:', contract.address)
  }

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Crea il tuo NFT! 🥳</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Inserisci i dati necessari:
        </Typography>
        <form onSubmit={handleMint} className='flex'>
          <PurpleOvalInput placeholder='Nome del contratto' type='text' name='_name' />
          <PurpleOvalInput placeholder='Simbolo del contratto' type='text' name='_symbol' />
          <PurpleOvalInput placeholder='Base URI del contratto' type='text' name='_initBaseURI' />

          <Button type='submit' size='small' variant='contained'>
            Invia
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreaNft
