import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import Web3 from 'web3';

interface Web3ContextType {
  web3?: Web3;
  initWeb3?: () => void;
  address?: string;
  gasPrice?: string;
  setGasPrice?: Dispatch<SetStateAction<string | undefined>>;
}

export const formatAddress = (address: string) => `${address.slice(0, 4)}...${address.slice(-5)}`;

export const Web3Context = createContext<Web3ContextType>({
  web3: undefined,
  initWeb3: undefined,
  address: undefined,
});

export const useWeb3 = () => {
  return useContext(Web3Context);
};

const initWeb3 = async (setWeb3: any) => {
  let { web3 } = window;

  // new privacy mode -> request account access if needed
  if (window.ethereum) {
    // @ts-ignore
    web3 = new Web3(ethereum);
    try {
      // @ts-ignore
      await ethereum.enable();
    } catch (error) {
      // if user denies access
      console.error(error);
    }
  } else if (web3) {
    // old way of asking for web3
    web3 = new Web3(web3.currentProvider);
  } else {
    // connect to custom provider, like Infura if there is no wallet detected
    return;
  }

  setWeb3(web3);
};

// To DO, implement autoconnect from LocalStorage!
const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);

  // @ts-ignore
  useEffect(() => {
    if (web3) {
      const requestAccount = setInterval(() => {
        web3.eth.getAccounts().then(async (accounts: string[]) => {
          if (accounts[0] !== address) {
            setAddress(accounts[0]);
          }
        });
      }, 2000);

      return () => clearInterval(requestAccount);
    }
  }, [web3]);

  return (
    <Web3Context.Provider value={{ web3, initWeb3: () => initWeb3(setWeb3), address }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
