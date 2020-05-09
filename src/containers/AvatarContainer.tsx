import React from "react";
import { connect } from "react-redux";
import ArchitectureAppStore from "../redux/interfaces/ArchitectureAppStore";
import { Link } from "react-router-dom";
import  { csrfHeaderName } from '../constants/appConstants';
import api from '../util/api';
var jwtDecode = require('jwt-decode');

class AvatarContainer extends React.PureComponent<any, any> {

  decode() {
    if (this.props.token && !this.props.token.startsWith('This')) {
      console.log(this.props.token)
      var decoded = jwtDecode(this.props.token);
      console.log(decoded);
      return decoded.user;
    }

  }

  logout() {
    const token = localStorage.getItem('token');
    if(!token){
      return;
    }
    const config = {
      headers: {
        [csrfHeaderName]: token
      }
    };
    api.post(`/users/custom-logout`, null, config)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((e:any)=>{
        console.log(e)
      });
    localStorage.removeItem('token')
  }

  render() {
    const user = this.decode();
    return (
      <div>

        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div>
            <Link to={"/"}>Home</Link>
          </div>
          <div>
            <Link to={"/dashboard"}>Dashboard</Link>
          </div>

          <div>
            <Link to={"/users/register"}>Register</Link>
          </div>

          <div>
            <Link to={"/users/login"}>Login</Link>
          </div>

          <div>
            <Link to={"/admin"}>Admin</Link>
          </div>

          <button onClick={() => { this.logout() }}>Logout</button>
        </div>

        <p>Logged in user:</p>
        <div>{this.props.token ? this.props.token : "Not logged in"}</div>

        <button onClick={() => { this.decode() }}>Decode Token</button>

        {user ? (<div>
          <p>{user.username}</p>
          <div>{user.roles}</div>
        </div>) : ''}
      </div>
    );
  }
}

const mapStateToProps = (state: ArchitectureAppStore) => ({
  token: state.token,
});

export default connect(mapStateToProps)(AvatarContainer);
