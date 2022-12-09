const constants = {
  searchFilters: false,
  searchLinks: true,
  LOGGED_OUT: "logged_out",
  LOGGED_IN: "logged_in",
  LOGGING_IN: "logging_in",
  LOADING_SESSION: "loading_session",
  RESETING_PASSWORD: "reseting_password",
  SIGNING_UP: "signing_up",
  APP_DESCRIPTION: "A mechanism built for maintaining order through the broader crypto space, BlackHole finds its purpose in upholding the sanitation of digital asset ecosystems by serving as an economic engine through which holders can utilize their share of HOLE tokens to vote on the destruction of other digital assets, HOLE, assets, and debt if the community so chooses.",
  APP_NAME: "BlackHole",
  APP_URL: "https://www.blackholeonjuno.com/",
  APP_DOMAIN: "blackholeonjuno.com",
  API_URL: "https://blackhole-staging.herokuapp.com",
  // API_URL: 'https://staging-api.omniflix.studio',
}
export default constants;

const testnet = false;
export const config = {
  RPC_URL: testnet ? 'https://rpc.flixnet-4.omniflix.network' : 'https://rpc-juno.itastakers.com',
  REST_URL: testnet ? 'https://rest.flixnet-4.omniflix.network' : 'https://rest.omniflix.network',
  DATA_LAYER: testnet ? 'https://data-layer-f4.omniflix.studio' : 'https://data-api.omniflix.studio',
  FAUCET_URL: 'https://api.testnet-faucet.omniflix.network',
  CHAIN_ID: testnet ? 'flixnet-4' : 'omniflixhub-1',
  CHAIN_NAME: testnet ? 'OmniFlix FlixNet-4' : 'OmniFlix Hub',
  COIN_DENOM: 'FLIX',
  COIN_MINIMAL_DENOM: 'uflix',
  COIN_DECIMALS: 6,
  PREFIX: 'omniflix',
  AVG_GAS_STEP: 0.005,
  COIN_HOLE: 'HOLE',
  COIN_MINIMAL_HOLE: 'hole',
  AIRDROP_CLAIM_URL: "https://blackholedrops.app/",
  CW20_ADDRESS: "juno1rdw3gumdz7zyjn2pev9ugxs765xlv6vtv6g3jt2lqw580zrchvjs66daca",
  ACE_DENOMID: "onftdenom7f964e33289a417bbffe65afbd60f121",
  ADMIN_ADDRESS: "omniflix1sp0x0tajf3xzz3xnt0l4zav8uudjwt0qn3zhta",
  CALIM_ADDRESS: "omniflix13q4cjkr59m0wuuuwkhc5ve4xcw5ccnm69ahs6w"
}

export const staking_chain = {
  STAKING_CONTRACT: "juno1g7v2vrx95uxpwhpdyj6r0qgrlt3kqjqygwp6wy6ayktrklz4v04s06apfn",
  STAKING_TOKEN_ADDRESS: "juno17pevjnfrg36h80refmsdgqn4puxmp9d6lqtkhh6xn45r2q3flp2qsmmzep",
  CHAIN_ID: "uni-5",
  CHAIN_NAME: "Juno Testnet - Uni",
  CHAIN_BECH32_PREFIX: "juno",
  CHAIN_RPC_ENDPOINT: "https://rpc.juno.giansalex.dev",
  CHAIN_REST_ENDPOINT: "https://lcd.juno.giansalex.dev",
  STAKING_DENOM: "ujunox"
}

export const chainConfig = {
  chainId: config.CHAIN_ID,
  chainName: config.CHAIN_NAME,
  rpc: config.RPC_URL,
  rest: config.REST_URL,
  stakeCurrency: {
    coinDenom: config.COIN_DENOM,
    coinMinimalDenom: config.COIN_MINIMAL_DENOM,
    coinDecimals: config.COIN_DECIMALS,
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: `${config.PREFIX}`,
    bech32PrefixAccPub: `${config.PREFIX}pub`,
    bech32PrefixValAddr: `${config.PREFIX}valoper`,
    bech32PrefixValPub: `${config.PREFIX}valoperpub`,
    bech32PrefixConsAddr: `${config.PREFIX}valcons`,
    bech32PrefixConsPub: `${config.PREFIX}valconspub`,
  },
  currencies: [{
    coinDenom: config.COIN_DENOM,
    coinMinimalDenom: config.COIN_MINIMAL_DENOM,
    coinDecimals: config.COIN_DECIMALS,
  }, ],
  feeCurrencies: [{
    coinDenom: config.COIN_DENOM,
    coinMinimalDenom: config.COIN_MINIMAL_DENOM,
    coinDecimals: config.COIN_DECIMALS,
    gasPriceStep: {
      low: 0.001,
      average: 0.0025,
      high: 0.025,
    },
  }, ],
  coinType: 118,
  features: ['ibc-transfer'],
};

export const DEFAULT_SKIP = 0;
export const DEFAULT_LIMIT = 10;
export const IBC_TOKENS_LIST_URL = `${config.DATA_LAYER}/tokens`;
export const COIN_DECIMAL = 6;
export const LIST_NFT_URL = `${config.REST_URL}/marketplace/list-nft`;
export const urlTransferNFT = (denomID, onftId) => `${config.REST_URL}/onft/onfts/${denomID}/${onftId}/transfer`;
export const urlFetchAllowances = (address) => `${config.REST_URL}/cosmos/feegrant/v1beta1/allowances/${address}`;
export const urlFetchIBCAccount = (REST_URL, address) => `${REST_URL}/cosmos/auth/v1beta1/accounts/${address}`;
export const urlBuyNFT = (id) => `${config.REST_URL}/marketplace/listings/${id}/buy-nft`;
export const urlDeList = (ID) => `${config.REST_URL}/marketplace/listings/${ID}/de-list-nft`;

export const tokensList = [{
  network: config,
  value: 'uflix',
  label: 'FLIX',
}];