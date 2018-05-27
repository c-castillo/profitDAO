import StockContract from "../utilities/StockContract";

async function getUserPeriod(addr, actions) {
  actions.getUserPeriodREQUEST();
  StockContract.currentToken.call(addr, (error, period) => {
    if (error) {
      actions.getUserPeriodERROR(error);
      throw error;
    }
    let periodNumber = period.toNumber();
    actions.getUserPeriodSUCCESS(periodNumber);
    return periodNumber;
  });
}

export default getUserPeriod;
