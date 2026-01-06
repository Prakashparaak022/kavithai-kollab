const API_VERSION = "/api/v1";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BRAND = process.env.NEXT_PUBLIC_BRAND;

export const API_URLS = {
  API_VERSION,
  BASE_URL,
  BRAND,
  MAIN_GATEWAY: `${BASE_URL}/main-api-gateway`,
  GAME_MANAGEMENT: `${BASE_URL}/game-management-gateway/game-management`,
  CASINO_GAMES: `/main-api-gateway/game-management-gateway/game-management/api/v1/vworld-casino/getGameList`,
  PROGRAMMATIC: `/main-api-gateway/game-management-gateway/game-management/api/v1/pragmatic/getGameList`,
  CAPTCHA: `${BASE_URL}/main-api-gateway/player-management-gateway/player-management/api/v1/player-login/captcha`,
  LOGIN: `${BASE_URL}/main-api-gateway/player-management-gateway/player-management/api/v1/player-login/validate-user-credentials-retrieve-user-profile`,
  ISD_CODE: `${BASE_URL}/main-api-gateway/commons-apis-gateway/common-apis/api/v1/country-isdcode-details/retrieveAll`,
  COUNTRY_DETAILS: `${BASE_URL}/main-api-gateway/commons-apis-gateway/common-apis/api/v1/country-details/retrieveAll`,
  CURRENCY_DETAILS:
    `${BASE_URL}/main-api-gateway/user-management-gateway/user-management/api/v1/user-profiles/getCurrencyDetailsByBrandName/` +
    BRAND,
  REGISTER: `${BASE_URL}/main-api-gateway/player-management-gateway/player-management/api/v1/player-profiles/createPlayerProfile`,
  WALLET_BALANCE_URL: `${BASE_URL}/main-api-gateway/player-management-gateway/player-management/api/v1/player-multiwallet-transactions/current-wallet-balance/retrieveByPlayerId/`,

  //depositUrls
  DEPOSIT_MONEY: `${BASE_URL}/main-api-gateway/player-wallet-gateway/player-wallet/api/v1/player-multiwallet-transactions/playerDepositMoney`,
  ALL_CAMPAIGN: `${BASE_URL}/main-api-gateway/campaign-management-gateway/campaign-management/api/v1/campaign/list?pageNo=0&count=10&campaignType=1&playerId=`,
  RECEIVER_BANK_DETAILS: `${BASE_URL}/main-api-gateway/offline-deposit-gateway/offline-deposit/api/v1/bank-creation/list?pageNo=0&count=5&userId=`,
  RECEIVER_UPI_DETAILS: `${BASE_URL}/main-api-gateway/offline-deposit-gateway/offline-deposit/api/v1/upi-creation/list?pageNo=0&count=5&userId=`,
  RECEIVER_QR_DETAILS: `${BASE_URL}/main-api-gateway/offline-deposit-gateway/offline-deposit/api/v1/qr-creation/list?pageNo=0&count=5&userId=`,

  //PROFILE URL
  UPDATE_PLAYER_PROFILE: `${BASE_URL}/main-api-gateway/player-management-gateway/player-management/api/v1/player-profiles/updatePlayerProfile/`,

  // Casino
  SN_GAMEDETAILS: `${BASE_URL}/main-api-gateway/game-management-gateway/game-management/api/v1/SportsBook/getGameDetails`,

  //Transaction URL
  ALL_TRANSACTION: `${BASE_URL}/main-api-gateway/player-wallet-gateway/player-wallet/api/v1/player-multiwallet-transactions/search`,
  DEPOSIT_SUMMARY_URL: `${BASE_URL}/main-api-gateway/player-wallet-gateway/player-wallet/api/v1/player-multiwallet-transactions/transaction-details/retrieveDepositTransactionsForPlayerWithDateRange/`,
  WITHDRAW_SUMMARY_URL: `${BASE_URL}/main-api-gateway/player-wallet-gateway/player-wallet/api/v1/player-multiwallet-transactions/transaction-details/retrieveWithdrawlTransactionsForPlayerWithDateRange/`,
  GAME_HISTORY: `${BASE_URL}/main-api-gateway/player-wallet-gateway/player-wallet/api/v1/player-multiwallet-transactions/searchGameTransactions`,

  //Bank Details
  BANK_DETAILS_BY_PLAYER_ID: `${BASE_URL}/main-api-gateway/player-wallet-gateway/player-wallet/api/v1/player-bank-details/findByPlayerId/`,
  ADD_NEW_BANK_ACCOUNT: `${BASE_URL}/main-api-gateway/player-wallet-gateway/player-wallet/api/v1/player-bank-details/create`,
  UPDATE_BANK_DETAIL: `${BASE_URL}/main-api-gateway/player-wallet-gateway/player-wallet/api/v1/player-bank-details/update`,

  //settings
  UPDATE_PLAYER_SETTING: `${BASE_URL}/main-api-gateway/player-management-gateway/player-management/api/v1/player-setting`,
  GET_PLAYER_SETTING: `${BASE_URL}/main-api-gateway/player-management-gateway/player-management/api/v1/player-setting/playerId/`,
  CONTACT_PREFERENCE: `${BASE_URL}/main-api-gateway/player-management-gateway/player-management/api/v1/channel-master/list?pageNo=0&count=5&search=&activeStatus=1&userId=`,
  ALL_TIME_PERIOD: `${BASE_URL}/main-api-gateway/player-management-gateway/player-management/api/v1/time-period/list?pageNo=0&count=5&search=&activeStatus=1&userId=`,
  CHANGE_PASSWORD: `${BASE_URL}/main-api-gateway/player-management-gateway/player-management/api/v1/user-password/change-password`,

  //hiistory
  EXCHANGE_HISTORY: `${BASE_URL}/main-api-gateway/game-management-gateway/game-management//api/v1/sport-game/list/exchange`,
  CASINO_HISTORY: `${BASE_URL}/main-api-gateway/game-management-gateway/game-management//api/v1/sport-game/list/vkCasino`,
  PRAGMATIC_HISTORY: `${BASE_URL}/main-api-gateway/game-management-gateway/game-management/api/v1/sport-game/list/pragmaticPlay`,
  SPORTS_HISTORY: `${BASE_URL}/main-api-gateway/game-management-gateway/game-management//api/v1/sport-game/list/gameTransactions`,

  //withdrwal
  WITHDRAWL: `${BASE_URL}/main-api-gateway/player-wallet-gateway/player-wallet/api/v1/player-wallet-transaction/withdrawal`,

  //retrieve games provider
  RETRIEVE_GAME_VERTICAL: `${BASE_URL}/main-api-gateway/game-management-gateway/game-management/api/v1/lobby-management/list?pageNo=0&count=50`,

  //retrieve games
  RETRIEVE_GAMELIST: `${BASE_URL}/main-api-gateway/game-management-gateway/game-management/api/v1/lobby-management/getGamesByLobby`,

  //ProviderList
  SEARCH_PROVIDERLIST: `${BASE_URL}/main-api-gateway/game-management-gateway/game-management/api/v1/game-provider/getProviderBasedOnLobbyId/`,

  //Search games
  SEARCH_GAMELIST: `${BASE_URL}/main-api-gateway/game-management-gateway/game-management/api/v1/lobby-management/v2/getGamesByLobby?activeStatus=1`,

  //Trending Games
  GAMES: `${BASE_URL}/main-api-gateway/game-management-gateway/game-management/api/v1/lobby-management/dashboardGames/list`,

  //KYC Document Types KYC
  KYC_DOCUMENT_TYPE: `${BASE_URL}/main-api-gateway/player-management-gateway/player-management/api/v1/kyc-master/list`,

  //Add KYC
  ADD_KYC_DETAILS: `${BASE_URL}/main-api-gateway/player-management-gateway/player-management/api/v1/player-kyc-details`,

  //Get KYC
  GET_KYC_DETAILS: `${BASE_URL}/main-api-gateway/player-management-gateway/player-management/api/v1/player-kyc-details/list?pageNo=0&count=1`,

  // Campaign
  CAMPAIGN_USAGE: `${BASE_URL}/main-api-gateway/campaign-management-gateway/campaign-management/api/v1/campaign/listCampaignUsage`,

  CAMPAIGN_EXPIRE: `${BASE_URL}/main-api-gateway/campaign-management-gateway/campaign-management/api/v1/process/expireCampaign`,

  //GAME_VERTICAL_TYPES :
  GAME_VERTICAL_TYPE: `${BASE_URL}/main-api-gateway/commons-apis-gateway/common-apis/api/v1/player-multiwallet/game-vertical/retrieveAll`,

  //Device Details
  BRAND_COUNTRY: `${BASE_URL}/main-api-gateway/commons-apis-gateway/common-apis/api/v1/brand-country/list?pageNo=0&count=20&activeStatus=1`,
  IP: "https://ipapi.co/json/",

  //CMS
  CMS: `${BASE_URL}/main-api-gateway/commons-apis-gateway/common-apis/api/cms/`,

  //MENU LIST
  MENU_LIST: `${BASE_URL}/main-api-gateway/user-management-gateway/user-management/api/v1/menu/playermenu`,
};
