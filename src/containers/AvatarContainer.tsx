import React from "react";
import { connect } from "react-redux";
import ArchitectureAppStore, { User, Category } from "../redux/interfaces/ArchitectureAppStore";
import { Link } from "react-router-dom";
import "./AvatarContainer.css";
import { csrfHeaderName } from '../constants/appConstants';
import api from '../util/api';
import { withTranslation } from 'react-i18next';
import getPathWithoutLangPrefix, { getLangPrefix } from '../util/LangPrefixUtil';
import { setCurrentUser, loadCategories } from "../redux/actions/actions";
import UserService from '../services/UserService';
import SlidingDropdown from "../shared/SlidingDropdown/SlidingDropdown";
import { languagesArray } from '../constants/appConstants';
import { createCookieOptions } from '../util/LangPrefixUtil';

var jwtDecode = require('jwt-decode');

const mapCategory = (category: Category) => {
  return (
    <div className={'option-wrapper'}>
      <div>{category.id}</div>
      <div>{category.name}</div>
    </div>
  )
}

const mapLang = (lang: string) => {
  return (
    <div className={'option-wrapper'}>
      <div>{lang}</div>
      <img className={'lang-icon'} src={`/images/icons/flag-${lang}.svg`} alt="flag"></img>
    </div>
  )
}

class AvatarContainer extends React.PureComponent<any, any> {

  componentDidMount() {
    console.log(this.props)
    this.loadCategories();
    this.changeLanguage = this.changeLanguage.bind(this)
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
    this.props.cookies.set('lang', lang, createCookieOptions());
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
    localStorage.removeItem('token');
    api.post(`/users/custom-logout`, null, config)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.props.setReduxUser(null);
        this.props.history.push(`/${getLangPrefix(this.props.location.pathname)}/`);
      })
      .catch((e: any) => {
        console.log(e)
      });

  }

  render() {
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

          <SlidingDropdown selectedOption={{ id: 555, name: 'all' }} data={this.props.categories} mapData={mapCategory} />

          <SlidingDropdown
            selectedOption={this.props.cookies.get('lang') || 'en'}
            data={languagesArray} mapData={mapLang}
            comparator={(currentLang: string, selectedLang: string) => {
              return currentLang === selectedLang;
            }}
            callback={this.changeLanguage} />

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
