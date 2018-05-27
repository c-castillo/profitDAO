import StockTokenContract from "../utilities/StockTokenContract";
import StockContract from "../utilities/StockContract";

async function getTokenBalance(addr, actions) {
  actions.getTokenBalanceREQUEST();
  StockContract.currentTokenOf.call(addr, (error, token) => {
    if(error){
      actions.getTokenBalanceERROR(error)
      throw(error)
    }
    if (token === "0x") {
      token = "0xB0e260729A588573A132b08c2b856B4B373e06Eb";
    }
    const tokenContract = StockTokenContract(token);
    tokenContract.balanceOf.call(token, (error, balance) => {
      if(error){
        actions.getTokenBalanceERROR(error)
        throw(error)
      }
      actions.getTokenBalanceSUCCESS(balance.toNumber());
      return balance.toNumber();
    })
  }) 
}

export default getTokenBalance;