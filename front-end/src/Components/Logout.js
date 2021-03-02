import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
  componentDidMount() {
    this.props.logOut();
  }

  render() {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    logOut: (val) => dispatch({ type: "LOG_OUT", payload: val })
  };
};

export default connect(null, mapDispatchToProps)(Logout);
