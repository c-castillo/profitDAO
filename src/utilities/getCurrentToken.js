import StockContract from "../utilities/StockContract";

async function getCurrentToken(addr, actions) {
  actions.getCurrentTokenREQUEST();
  StockContract.currentToken.call(addr, (error, token) => {
    if (error) {
      actions.getCurrentTokenERROR(error);
      throw error;
    }
    actions.getCurrentTokenSUCCESS(token);
    return token;
  });
}

export default getCurrentToken;
