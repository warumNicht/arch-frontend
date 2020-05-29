import React from "react";
import { connect } from "react-redux";
import ArchitectureAppStore, { User, Category } from "../redux/interfaces/ArchitectureAppStore";
import { Link } from "react-router-dom";
import "./AvatarContainer.css";
import { csrfHeaderName } from '../constants/appConstants';
import api from '../util/api';
import { withTranslation, Trans } from 'react-i18next';
import getPathWithoutLangPrefix, { getLangPrefix } from '../util/LangPrefixUtil';
import { setCurrentUser, loadCategories } from "../redux/actions/actions";
import UserService from '../services/UserService';
import categories from "../redux/reducers/categories";
import SlidingDropdown from "../shared/SlidingDropdown/SlidingDropdown";

var jwtDecode = require('jwt-decode');

const renderCategories = (categories: Category[]) => {
  return (
    categories.map((cat: Category) => {
      return <li>
        <div>{cat.id}</div>
        <div>{cat.name}</div>
      </li>
    })
  )
}

class AvatarContainer extends React.PureComponent<any, any> {

  componentDidMount() {
    console.log(this.props)
    this.props.i18n.changeLanguage(this.props.cookies.get('lang') || 'en');
    this.loadCategories();
  }

  loadCategories() {
    api.get('/fetch/categories/all').then(res => {
      console.log(res.data)
      this.props.loadCategories(res.data)
    }).catch(error => {
      console.log(error);
    });

  }

  decode() {
    if (this.props.token && !this.props.token.startsWith('This')) {
      console.log(this.props.token)
      var decoded = jwtDecode(this.props.token);
      console.log(decoded);
      return decoded.user;
    }
  }

  changeLanguage(lang: string) {
    this.props.cookies.set('lang', lang, { path: '/' });
    this.props.i18n.changeLanguage(lang);
    console.log(this.props.location)
    this.props.history.push(`/${lang}${getPathWithoutLangPrefix(this.props.location.pathname)}`);
  }

  logout() {
    const token = localStorage.getItem('token');
    if (!token) {
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
        localStorage.removeItem('token')
        this.props.setReduxUser(null);
        this.props.history.push(`/${getLangPrefix(this.props.location.pathname)}/`);
      })
      .catch((e: any) => {
        console.log(e)
      });

  }

  render() {
    const user = this.decode();
    console.log('Avatar -> ', this.props.match.path)
    const isLoggedIn: boolean = UserService.isAuthenticated();

    return (
      <div>
        <div className="nav-link-wrapper">

          <div>
            <button type="button" onClick={() => this.changeLanguage('en')}>
              {this.props.t('navbar:lang.en', 'English')}
            </button>

            <button type="button" onClick={() => this.changeLanguage('de')}>
              {this.props.t('navbar:lang.de', 'German')}
            </button>
          </div>

          <div>
            <Link to={`${this.props.match.path}/`}>Home</Link>
          </div>
          <div>
            <Link to={`${this.props.match.path}/dashboard`}>Dashboard</Link>
          </div>

          <div>
            <Link to={`${this.props.match.path}/users/register`}>{this.props.t('navbar:register', 'Hello there')}</Link>
          </div>

          {isLoggedIn ? '' :
            (<div>
              <Link to={`${this.props.match.path}/users/login`}>{this.props.t('login', 'Hello there')}</Link>
            </div>
            )}

          <div><SlidingDropdown data={this.props.categories} mapData={renderCategories} />
          </div>

          <div>
            <Link to={`${this.props.match.path}/admin`}>Admin</Link>
          </div>

          {isLoggedIn ? <button onClick={() => { this.logout() }}>Logout</button> : ''}

        </div>

        <p>Logged in user:</p>
        <div>{this.props.token ? this.props.token : "Not logged in"}</div>

        <button onClick={() => { this.decode() }}>Decode Token</button>

        {this.props.user ? (<div>
          <p>{this.props.user.username}</p>
          <div>{this.props.user.roles}</div>
        </div>) : ''}
      </div>
    );
  }
}

const mapStateToProps = (state: ArchitectureAppStore) => ({
  token: state.token,
  user: state.user,
  categories: state.categories
});

const mapDispatchToProps = (dispatch: any) => ({
  setReduxUser: (user: User) => dispatch(setCurrentUser(user)),
  loadCategories: (categories: Category[]) => dispatch(loadCategories(categories))
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['translation', 'navbar'])(AvatarContainer));
