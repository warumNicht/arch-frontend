import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
    let config = {
      headers: {
        "X-CSRF-Token": "78b12161-c20b-46d1-a04f-4c0f687652a4",
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
    let config = {
      credentials: 'include',
      headers: {
        // "X-CSRF-Token": "78b12161-c20b-46d1-a04f-4c0f687652a4",
      },
    };
    axios
      .post(`${backendHost}/users/rest-authentication`, this.state, { withCredentials: true })
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
      headers: {
        'Content-Type': 'application/json',
        "X-CSRF-Token": this.state.token,
      },
      withCredentials: true
    };

    console.log(this.state.token)
    axios
      .post(`http://192.168.0.104:8080/admin/category/create/rest`, JSON.stringify({pp: 'eee'}), config)
      .then((res) => {
        console.log(res);
        console.log(res.headers);
        this.setState({
          token: res.data,
        });
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
