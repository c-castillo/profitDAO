import { Connect, SimpleSigner } from "uport-connect";

const uport = new Connect("ethbahack", {
  clientId: "2of8WzgL7ZTgPHotQjmyAcMoQLuiDiQ69bq",
  network: "kovan",
  signer: SimpleSigner(
    "48933cf92c395881b0456298d6478934a82d29b6b7c82de16fa613492e0e1a13"
  )
});

const web3 = uport.getWeb3();
export { web3, uport };
