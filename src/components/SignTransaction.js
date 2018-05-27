// Frameworks
import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AppActions from "../actions/AppActions";

import waitForMined from "../utilities/waitForMined";
import checkAddressMNID from "../utilities/checkAddressMNID";
import getUserPeriod from "../utilities/getUserPeriod";
import getPoolBalance from "../utilities/getPoolBalance";
import getTokenBalance from "../utilities/getTokenBalance";
//import claimRevenue from "../utilities/claimRevenue";

import styled from "styled-components";
import StockContract from "../utilities/StockContract";

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
const FormClaimDividends = styled.form``;
const FormRow = styled.div``;
const BtnClaimDividends = styled.button``;
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
    this.displayTokenQuantity = this.displayTokenQuantity.bind(this);
    this.claimDividends = this.claimDividends.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  displayCurrentPeriod() {
    const addr = checkAddressMNID(this.props.uport.address);
    const actions = this.props.actions;
    getUserPeriod(addr, actions);
  }

  displayPoolBalance() {
    const addr = checkAddressMNID(this.props.uport.address);
    const actions = this.props.actions;
    getPoolBalance(addr, actions);
  }

  displayTokenQuantity() {
    const addr = checkAddressMNID(this.props.uport.address);
    const actions = this.props.actions;
    getTokenBalance(addr, actions);
  }

  claimDividends(e) {
    e.preventDefault();

    console.log("claiming Dividends");

    let amount = this.props.tokenQty / this.props.poolBalance;
    const addr = checkAddressMNID(this.props.uport.address);
    const actions = this.props.actions;

    console.log({ amount, addr, actions });

    this.props.actions.claimDividendsREQUEST(amount);

    //claimRevenue(addr, amount, actions);
    StockContract.currentToken.call(addr, (error, token) => {
      if (error) {
        this.props.actions.claimDividendsERROR(error);
        throw error;
      }
      StockContract.claimRevenue.call(addr, amount, token, (error, txHash) => {
        if (error) {
          throw error;
        }
        waitForMined(
          addr,
          txHash,
          { blockNumber: null },
          actions,
          () => {
            this.props.actions.claimDividendsPENDING();
          },
          total => {
            console.log("waitForMined complete");
            this.props.actions.claimDividendsSUCCESS(txHash, total);
          }
        );
      });
    });
  }

  handleInputChange(event) {
    this.props.actions.updatesharesInput(event.target.value);
  }

  componentDidMount() {
    this.displayCurrentPeriod();
    this.displayPoolBalance();
    this.displayTokenQuantity();
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

          {this.props.claimingInProgress ? (
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
            <FormClaimDividends>
              <FormRow>
                <label>Dividends to withdraw: </label>
                <span>{this.props.tokenQty / this.props.poolBalance}</span>
              </FormRow>
              <FormRow>
                <br />
                <BtnClaimDividends onClick={this.claimDividends}>
                  Claim dividends
                </BtnClaimDividends>
              </FormRow>
              <FormRow>
                <br />
                {this.props.claimingInProgress ? (
                  <div>Please wait for transaction card on phone</div>
                ) : null}
              </FormRow>
            </FormClaimDividends>
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
    tokenQty: state.App.tokenQty,
    claimingInProgress: state.App.claimingInProgress,
    tx: state.App.tx,
    error: state.App.error
  };
};
const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(AppActions, dispatch) };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignTransaction);
