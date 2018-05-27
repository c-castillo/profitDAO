// //////////////////////////////////////////////
// Connect uPort
// //////////////////////////////////////////////

export const connectUport = data => {
  return {
    type: "CONNECT_UPORT",
    data
  };
};

// //////////////////////////////////////////////
// Get Current Shares
// //////////////////////////////////////////////

export const getCurrentSharesREQUEST = () => {
  return {
    type: "GET_CURRENT_SHARES_REQUEST"
  };
};
export const getCurrentSharesSUCCESS = data => {
  return {
    type: "GET_CURRENT_SHARES_SUCCESS",
    data
  };
};
export const getCurrentSharesERROR = data => {
  return {
    type: "GET_CURRENT_SHARES_ERROR",
    data
  };
};

export const updatesharesInput = data => {
  return {
    type: "UPDATE_SHARES_INPUT",
    data
  };
};

// //////////////////////////////////////////////
// Get Current Period
// //////////////////////////////////////////////

export const getCurrentPeriodREQUEST = () => {
  return {
    type: "GET_CURRENT_PERIOD_REQUEST"
  };
};
export const getCurrentPeriodSUCCESS = data => {
  return {
    type: "GET_CURRENT_PERIOD_SUCCESS",
    data
  };
};
export const getCurrentPeriodERROR = data => {
  return {
    type: "GET_CURRENT_PERIOD_ERROR",
    data
  };
};

// //////////////////////////////////////////////
// Get Current Token
// //////////////////////////////////////////////

export const getTokenBalanceREQUEST = () => {
  return {
    type: "GET_TOKEN_BALANCE_REQUEST"
  };
};
export const getTokenBalanceSUCCESS = data => {
  return {
    type: "GET_TOKEN_BALANCE_SUCCESS",
    data
  };
};
export const getTokenBalanceERROR = data => {
  return {
    type: "GET_TOKEN_BALANCE_ERROR",
    data
  };
};

// //////////////////////////////////////////////
// Get User Period
// //////////////////////////////////////////////

export const getUserPeriodREQUEST = () => {
  return {
    type: "GET_USER_PERIOD_REQUEST"
  };
};
export const getUserPeriodSUCCESS = data => {
  return {
    type: "GET_USER_PERIOD_SUCCESS",
    data
  };
};
export const getUserPeriodERROR = data => {
  return {
    type: "GET_USER_PERIOD_ERROR",
    data
  };
};

// //////////////////////////////////////////////
// Get Pool Balance
// //////////////////////////////////////////////

export const getPoolBalanceREQUEST = () => {
  return {
    type: "GET_POOL_BALANCE_REQUEST"
  };
};
export const getPoolBalanceSUCCESS = data => {
  return {
    type: "GET_POOL_BALANCE_SUCCESS",
    data
  };
};
export const getPoolBalanceERROR = data => {
  return {
    type: "GET_POOL_BALANCE_ERROR",
    data
  };
};

// // //////////////////////////////////////////////
// // Claim Dividends
// // //////////////////////////////////////////////

export const claimDividendsREQUEST = (tx, amount) => {
  return {
    type: "CLAIM_DIVIDENDS_REQUEST",
    amount: amount,
    claimingInProgress: true
  };
};
export const claimDividendsPENDING = () => {
  return {
    type: "CLAIM_DIVIDENDS_PENDING"
  };
};
export const claimDividendsSUCCESS = (tx, data) => {
  return {
    type: "CLAIM_DIVIDENDS_SUCCESS",
    tx: tx,
    data
  };
};
export const claimDividendsERROR = data => {
  return {
    type: "CLAIM_DIVIDENDS_ERROR",
    data
  };
};

//////////////////////////////////////////////
// Complete Buy Shares Demo
//////////////////////////////////////////////

export const buySharesDemoComplete = data => {
  return {
    type: "BUY_SHARES_DEMO_COMPLETE"
  };
};

//////////////////////////////////////////////
// Complete Credentials Demo
//////////////////////////////////////////////

export const credentialsDemoComplete = data => {
  return {
    type: "CREDENTIALS_DEMO_COMPLETE"
  };
};

// //////////////////////////////////////////////
// Register App Area Complete
// //////////////////////////////////////////////

export const registerAppAreaComplete = data => {
  return {
    type: "LOGOUT"
  };
};
