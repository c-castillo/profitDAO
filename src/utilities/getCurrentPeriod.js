import StockContract from "../utilities/StockContract";

async function getCurrentPeriod(addr, actions) {
  actions.getCurrentPeriodREQUEST();
  let periodNumber;
  let period = await StockContract.getCurrentPeriod.call(addr);
  if (period.toNumber() === 0) {
    periodNumber = 0;
  } else {
    periodNumber = await StockContract.getPeriodNumber.call(period.toNumber());
    periodNumber = periodNumber.toNumber();
  }
  return periodNumber;
}

export default getCurrentPeriod;
