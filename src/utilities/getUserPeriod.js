import StockContract from "../utilities/StockContract";

async function getUserPeriod(addr, actions) {
  actions.getUserPeriodREQUEST();
  StockContract.currentTokenOf.call(addr, (error, token) => {
    if(error){
      actions.getUserPeriodERROR(error)
      throw(error)
    }
    if (token === "0x") {
      token = "0xB0e260729A588573A132b08c2b856B4B373e06Eb";
    }
    StockContract.getPeriodByToken.call(token, (error, period) => {
      if(error){
        actions.getUserPeriodERROR(error)
        throw(error)
      }
      StockContract.getPeriodNumber.call(period.toNumber(), (error, number) => {
        if(error){
          actions.getUserPeriodERROR(error)
          throw(error)
        }
        actions.getUserPeriodSUCCESS(number.toNumber());
        return number.toNumber();
      })
    })
  }) 
}

export default getUserPeriod;
