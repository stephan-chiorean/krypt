import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log({
    provider,
    signer,
    transactionContract,
  });
};

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState('');
  const [formData, setFormData] = useState({ addressTo: '', amount: 0, keyword: '', message: ''});

  const handleChange = (e, name) => {
    setFormData((prevState) => ({...prevState, [name]: e.target.value}));
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setConnectedAccount(accounts[0]);
      } else {
        console.log('No accounts found');
      }
      console.log(accounts);
    } catch (err) {
      console.error(err);
      throw new Error('No ethereum object');
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setConnectedAccount(accounts[0]);
      console.log('CONNECTED', connectedAccount);
    } catch (err) {
      console.error(err);
      throw new Error('No ethereum object.');
    }
  };

  const sendTransaction = async() => {
    try {
        if(!ethereum) return alert("Please install metamask");
        const {addressTo, amount, keyword, message} = formData;
        getEthereumContract();
        //get the data from the form

    } catch(err) {
        console.error(err);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <TransactionContext.Provider value={{ connectWallet, connectedAccount, formData, setFormData, handleChange, sendTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
