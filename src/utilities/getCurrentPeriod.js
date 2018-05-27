import StockContract from "../utilities/StockContract";

async function getCurrentPeriod(addr, actions) {
  actions.getCurrentPeriodREQUEST();
  StockContract.getCurrentPeriod.call(addr, (error, periodNumber) => {
    if (error) {
      actions.getCurrentPeriodERROR(error);
      throw error;
    }
    const periodNumberDecoded = periodNumber.toNumber();
    actions.getCurrentPeriodSUCCESS(periodNumberDecoded);
    return periodNumberDecoded;
  });
}

export default getCurrentPeriod;
