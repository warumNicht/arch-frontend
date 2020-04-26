import React from "react";
import { connect } from "react-redux";
import ArchitectureAppStore from "../redux/interfaces/ArchitectureAppStore";

class ProfileContainer extends React.PureComponent<any, any> {
  render() {
    return (
      <div>
        <p>Logged in user:</p>
        <div>{this.props.token ? this.props.token : "Not logged in"}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: ArchitectureAppStore) => ({
  token: state.token,
});

export default connect(mapStateToProps)(ProfileContainer);
