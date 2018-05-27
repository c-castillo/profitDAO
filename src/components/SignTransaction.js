// Frameworks
import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AppActions from "../actions/AppActions";

import SharesContract from "../utilities/SharesContract";
import waitForMined from "../utilities/waitForMined";
import checkAddressMNID from "../utilities/checkAddressMNID";
import getUserPeriod from "../utilities/getUserPeriod";
import getPoolBalance from "../utilities/getPoolBalance";

import styled from "styled-components";

const SharesWrap = styled.section`
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    position: inherit;
  }
`;
const SharesArea = styled.div``;
const CurrentPeriodArea = styled.div`
  margin-bottom: 20px;
`;
const CurrentSharesNumber = styled.span`
  color: white;
`;
const FormBuyshares = styled.form``;
const FormRow = styled.div``;
const BtnBuyShares = styled.button``;
const NextButton = styled.button`
  margin-top: 20px;
`;
const SubText = styled.p`
  margin: 0 auto 3em auto;
  font-size: 18px;
`;

class SignTransaction extends Component {
  constructor(props) {
    super(props);
    this.displayCurrentPeriod = this.displayCurrentPeriod.bind(this);
    this.displayPoolBalance = this.displayPoolBalance.bind(this);
    this.buyShares = this.buyShares.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  displayCurrentPeriod() {
    // TODO: Dump this check once MNID is default behavior
    const addr = checkAddressMNID(this.props.uport.address);
    const actions = this.props.actions;
    getUserPeriod(addr, actions);
  }

  displayPoolBalance() {
    // TODO: Dump this check once MNID is default behavior
    const addr = checkAddressMNID(this.props.uport.address);
    const actions = this.props.actions;
    getPoolBalance(addr, actions);
  }

  buyShares(e) {
    e.preventDefault();

    console.log("buyShares");

    let sharesNumber = this.props.sharesInput;
    const addr = checkAddressMNID(this.props.uport.address);
    const actions = this.props.actions;

    console.log({ sharesNumber, addr, actions });

    this.props.actions.buySharesREQUEST(sharesNumber);

    SharesContract.updateShares(sharesNumber, (error, txHash) => {
      console.log("updateShares");
      if (error) {
        this.props.actions.buySharesERROR(error);
      }
      waitForMined(
        addr,
        txHash,
        { blockNumber: null },
        actions,
        () => {
          this.props.actions.buySharesPENDING();
        },
        total => {
          console.log("waitForMined complete");
          this.props.actions.buySharesSUCCESS(txHash, total);
        }
      );
    });
  }

  handleInputChange(event) {
    this.props.actions.updatesharesInput(event.target.value);
  }

  componentDidMount() {
    // Populate existing shares
    this.displayCurrentPeriod();
    this.displayPoolBalance();
  }

  render() {
    return (
      <SharesWrap>
        <h4>Claim your dividends</h4>
        <SubText>
          In this dapp you can verify if you're eligible to claim your DAO
          profits
        </SubText>

        <SharesArea>
          <CurrentPeriodArea>
            <span>Your current period </span>
            <br />
            <CurrentSharesNumber>{this.props.periodUser}</CurrentSharesNumber>
          </CurrentPeriodArea>
          <CurrentPeriodArea>
            <span>Pool period balance </span>
            <br />
            <CurrentSharesNumber>{this.props.poolBalance}</CurrentSharesNumber>
          </CurrentPeriodArea>

          {this.props.buyingInProgress ? (
            <div>
              <br />
              <div className="spinner center">
                {[...Array(12)].map((x, i) => (
                  <div className="spinner-blade" key={i} />
                ))}
              </div>
              <br />
            </div>
          ) : (
            <FormBuyshares>
              <FormRow>
                <label>DAI to withdraw: </label>
                <input
                  id="sharesInput"
                  type="number"
                  style={{ paddingLeft: ".5em", "font-size": "16px" }}
                  onChange={this.handleInputChange}
                  value={this.props.sharesInput}
                />
              </FormRow>
              <FormRow>
                <br />
                <BtnBuyShares onClick={this.buyShares}>Claim DAI</BtnBuyShares>
              </FormRow>
              <FormRow>
                <br />
                {this.props.buyingInProgress ? (
                  <div>Please wait for transaction card on phone</div>
                ) : null}
              </FormRow>
            </FormBuyshares>
          )}
        </SharesArea>
        {this.props.confirmingInProgress ? (
          <div>Please confirm the transaction card on your phone</div>
        ) : null}

        <NextButton onClick={this.props.actions.buySharesDemoComplete}>
          Next
        </NextButton>
      </SharesWrap>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    uport: state.App.uport,
    sharesInput: state.App.sharesInput,
    gettingCurrentPeriod: state.App.gettingCurrentPeriod,
    confirmingInProgress: state.App.confirmingInProgress,
    periodUser: state.App.periodUser,
    poolBalance: state.App.poolBalance,
    buyingInProgress: state.App.buyingInProgress,
    tx: state.App.tx,
    error: state.App.error
  };
};
const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(AppActions, dispatch) };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignTransaction);
