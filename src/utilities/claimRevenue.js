import StockContract from "../utilities/StockContract";

async function claimRevenue(addr, amount, actions) {
  actions.claimDividendsREQUEST();
  StockContract.currentToken.call(addr, (error, token) => {
    if (error) {
      actions.claimDividendsERROR(error);
      throw error;
    }
    StockContract.claimRevenue.call(addr, amount, token, error => {
      if (error) {
        throw error;
      }
      actions.claimDividendsSUCCESS();
    });
  });
}

export default claimRevenue;
