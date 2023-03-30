import React, { useState, useEffect } from 'react';
import * as ethers from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';
import toast from 'react-hot-toast';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  console.log(ethers);
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;

  //   console.log({
  //     provider,
  //     signer,
  //     transactionContract,
  //   });
};

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState('');
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: 0,
    keyword: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount')
  );

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');
      const transactionContract = getEthereumContract();

      const availableTransactions =
        await transactionContract.getAllTransactions();
        console.log(availableTransactions);
    } catch (err) {
      console.error(err);
    }
  };

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

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();

      window.localStorage.setItem('transactionCount', transactionCount);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectWallet = async () => {
    setConnectedAccount('');
    console.log('DISCONNECTED');
    window.location.reload();
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');

      // Display loading toast
      const loadingToast = toast.loading('Connecting...');

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setConnectedAccount(accounts[0]);
      console.log('CONNECTED', connectedAccount);

      // Dismiss loading toast and show a success toast
      toast.dismiss(loadingToast);
      toast.success('Connected successfully');
    } catch (err) {
      console.error(err);
      // Dismiss loading toast and show an error toast
      toast.dismiss(loadingToast);
      toast.error('Error connecting to wallet');
      throw new Error('No ethereum object.');
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: '0x5208', //21000 gwei
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // checkIfWalletIsConnected();
    checkIfTransactionsExist();
    console.log('PRINT WHEN LOAD', connectedAccount);
  }, [connectedAccount]);
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        disconnectWallet,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
