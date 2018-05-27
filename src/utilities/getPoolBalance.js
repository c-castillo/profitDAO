import StockContract from "../utilities/StockContract";

async function getPoolBalance(addr, actions) {
  actions.getPoolBalanceREQUEST();
  StockContract.currentTokenOf.call(addr, (error, token) => {
    if (error) {
      actions.getPoolBalanceERROR(error);
      throw error;
    }
    if (token === "0x") {
      token = "0xB0e260729A588573A132b08c2b856B4B373e06Eb";
    }
    StockContract.getPeriodByToken.call(token, (error, period) => {
      if (error) {
        actions.getPoolBalanceERROR(error);
        throw error;
      }
      StockContract.poolBalance.call(period.toNumber(), (error, number) => {
        if (error) {
          actions.getPoolBalanceERROR(error);
          throw error;
        }
        actions.getPoolBalanceSUCCESS(number.toNumber());
        return number.toNumber();
      });
    });
  });
}

export default getPoolBalance;
