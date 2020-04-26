import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from '../../util/api';
import backendHost, { csrfHeaderName } from "../../constants/appConstants";

axios.defaults.withCredentials = true;

export class Login extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "Keiser",
      password: "A12wert",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.createCategory = this.createCategory.bind(this);
  }

  handleChange(event: any) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    console.log("Post");
    this.props.login(this.state.username);
    let config = {
      headers: {
        "X-CSRF-Token": this.state.token,
      },
      withCredentials: true,
    };
    axios
      .post(`${backendHost}/fetch/categories/post`, null, config)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }

  get() {
    console.log("GET");
    console.log(csrfHeaderName);
    axios
      .get(`${backendHost}/fetch/session`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }

  login() {
    api
      .post(`/users/rest-authentication`, this.state)
      .then((res) => {
        console.log(res);
        console.log(res.headers);
        this.setState({
          token: res.data,
        });
        console.log(res.data);
      });
  }

  createCategory() {
    let config = {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        "X-CSRF-Token": this.state.token,
      }
    };

    api
      .post(`/admin/category/create/rest`, JSON.stringify({pp: 'eee'}), config)
      .then((res) => {
        console.log(res.data);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>

          <label>Username</label>
          <input
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <br />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />

          <input type="submit" />
          <Link to={"/"}>Home</Link>
        </form>
        <button onClick={() => this.get()}>Get session</button>
        <br />
        <button onClick={() => this.login()}>REST login</button>

        <br />
        <button onClick={() => this.createCategory()}>Create category</button>
      </div>
    );
  }
}

export default Login;
