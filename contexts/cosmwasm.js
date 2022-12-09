import { createContext, useContext } from 'react'
import { useSigningCosmWasmClient } from '../hooks/cosmwasm'

let CosmWasmContext
let { Provider } = (CosmWasmContext = createContext())

export const useSigningClient = () => useContext(CosmWasmContext)

export const SigningCosmWasmProvider = ({ children }) => {
  const value = useSigningCosmWasmClient()
  return <Provider value={value}>{children}</Provider>
}
