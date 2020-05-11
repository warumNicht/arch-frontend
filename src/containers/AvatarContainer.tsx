import React from "react";
import { connect } from "react-redux";
import ArchitectureAppStore from "../redux/interfaces/ArchitectureAppStore";
import { Link } from "react-router-dom";
import { withTranslation, Trans } from 'react-i18next';

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

  changeLanguage(lang: string) {
    this.props.i18n.changeLanguage(lang);
  }


  render() {
    const user = this.decode();

    return (
      <div>

        <div>
          <button type="button" onClick={() => this.changeLanguage('en')}>
            {this.props.t('navbar:lang.en', 'English')}
          </button>

          <button type="button" onClick={() => this.changeLanguage('de')}>
            {this.props.t('navbar:lang.de', 'German')}
          </button>
        </div>

        <div>
          <Link to={"/"}>Home</Link>
        </div>
        <div>
          <Link to={"/dashboard"}>Dashboard</Link>
        </div>

        <div>
          <Link to={"/users/register"}>{this.props.t('navbar:register', 'Hello there')}</Link>
        </div>

        <div>
          <Link to={"/users/login"}>{this.props.t('login', 'Hello there')}</Link>
        </div>

        <div>
          <Link to={"/admin"}>Admin</Link>
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

export default connect(mapStateToProps)(withTranslation(['translation', 'navbar'])(AvatarContainer));
