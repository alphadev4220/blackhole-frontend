import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { config } from '../src/constants';

export const getBalance = async (address) => {
    const client = await CosmWasmClient.connect(config.RPC_ADDRESS)
    const response = await client.queryContractSmart(config.CW20_ADDRESS, {
      balance: {
        address: address
      }
    });
    return response.balance
    // console.log('response', response)
  }
  
  export async function getKeplr() {
    if (window.keplr) {
        return window.keplr;
    }
    
    if (document.readyState === "complete") {
        return window.keplr;
    }
    
    return new Promise((resolve) => {
        const documentStateChange = (event) => {
            if (
                event.target &&
                (event.target).readyState === "complete"
            ) {
                resolve(window.keplr);
                document.removeEventListener("readystatechange", documentStateChange);
            }
        };
        
        document.addEventListener("readystatechange", documentStateChange);
    });
  }