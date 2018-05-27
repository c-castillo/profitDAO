let initialState = {
  sharesInput: 0 // Stupid FB warning about controlled inputs
};

export default (state = initialState, payload) => {
  switch (payload.type) {
    case "CONNECT_UPORT":
      return { ...state, uport: payload.data, signTransactionPage: true };

    case "GET_CURRENT_PERIOD_REQUEST":
      return { ...state, gettingCurrentPeriod: true };
    case "GET_USER_PERIOD_SUCCESS":
      return {
        ...state,
        gettingCurrentPeriod: false,
        periodUser: payload.data
      };
    case "GET_TOKEN_BALANCE_ERROR":
      return { ...state, gettingTokenBalance: false, error: payload.data };
    case "GET_TOKEN_BALANCE_REQUEST":
      return { ...state, gettingTokenBalance: true };
    case "GET_TOKEN_BALANCE_SUCCESS":
      return {
        ...state,
        gettingTokenBalance: false,
        tokenQty: payload.data
      };
    case "GET_CURRENT_PERIOD_ERROR":
      return { ...state, gettingCurrentPeriod: false, error: payload.data };
    case "GET_POOL_BALANCE_REQUEST":
      return { ...state, gettingPoolBalance: true };
    case "GET_POOL_BALANCE_SUCCESS":
      return {
        ...state,
        gettingPoolBalance: false,
        poolBalance: payload.data
      };
    case "GET_POOL_BALANCE_ERROR":
      return { ...state, gettingPoolBalance: false, error: payload.data };
    case "UPDATE_SHARES_INPUT":
      return { ...state, sharesInput: payload.data };

    case "BUY_SHARES_REQUEST":
      return { ...state, confirmingInProgress: true };
    case "BUY_SHARES_PENDING":
      return { ...state, buyingInProgress: true, confirmingInProgress: false };
    case "BUY_SHARES_SUCCESS":
      return {
        ...state,
        txHash: payload.tx,
        buyingInProgress: false,
        periodUser: payload.data
      };
    case "BUY_SHARES_ERROR":
      return { ...state, buyingInProgress: false, periodUser: payload.data };

    case "BUY_SHARES_DEMO_COMPLETE":
      return { ...state, collectCredentialsPage: true };

    case "CREDENTIALS_DEMO_COMPLETE":
      return { ...state, registerYourAppPage: false };
    case "LOGOUT":
      return { ...state, uport: null, logOutPage: true };
    default:
      return state;
  }
};
