import React from "react";
import { connect } from "react-redux";
import ArchitectureAppStore from "../redux/interfaces/ArchitectureAppStore";
var jwtDecode = require('jwt-decode');

class ProfileContainer extends React.PureComponent<any, any> {

  decode(){
    if(this.props.token && !this.props.token.startsWith('This')){
      console.log(this.props.token)
      var decoded = jwtDecode(this.props.token);
      console.log(decoded);
      return decoded.user;
    }
  
  }
  render() {
    const user = this.decode();
    return (
      <div>
        <p>Logged in user:</p>
        <div>{this.props.token ? this.props.token : "Not logged in"}</div>
        
        <button onClick={()=>{this.decode()}}>Decode Token</button>

        {user ? (<div>
            <p>{user.username}</p>
            <div>{user.roles}</div>
        </div> ): ''}
      </div>
    );
  }
}

const mapStateToProps = (state: ArchitectureAppStore) => ({
  token: state.token,
});

export default connect(mapStateToProps)(ProfileContainer);
