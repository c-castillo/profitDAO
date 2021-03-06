// Frameworks
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AppActions from "../actions/AppActions";
import styled from "styled-components";
import { uport } from "../utilities/uportSetup";

const WelcomeWrap = styled.section``;
const ConnectUport = styled.button``;
const SubText = styled.p`
  margin: 0 auto 3em auto;
  font-size: 18px;
`;

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.connectUport = this.connectUport.bind(this);
  }

  connectUport() {
    uport
      .requestCredentials({
        requested: ["name", "phone", "country", "avatar"],
        notifications: true
      })
      .then(credentials => {
        console.log({ credentials });
        this.props.actions.connectUport(credentials);
      });
  }

  render() {
    return (
      <WelcomeWrap>
        <h4>Claim your revenue</h4>
        <SubText>
          If you're a member of the profitDAO and want to claim your revenue,
          log in to withdraw
        </SubText>
        <ConnectUport onClick={this.connectUport}>
          Connect with uPort
        </ConnectUport>
      </WelcomeWrap>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    uport: state.App.uport
  };
};
const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(AppActions, dispatch) };
};
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
