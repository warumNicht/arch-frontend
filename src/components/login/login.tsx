import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export class Login extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event: any) {
    this.setState({
        [event.target.name]:  event.target.value,
    });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    console.log(this.state.username)
    const axiosConfig = {
      headers: {
      'content-Type': 'application/json',
      "Accept": "/",
      "Cache-Control": "no-cache",
      "Cookie": document.cookie
      },
      credentials: "same-origin"
      };
    let config = {
        headers: {
          authorization: 'Basic  lang=en; JSESSIONID=6B7F43004D6EC705DFB3F3978809FEF6'
        },
        withCredentials: true,
      }
    axios.post(`http://192.168.0.104:8080/users/authentication2`, this.state.username)
    // axios.get(`http://192.168.0.104:8080/fetch/categories/all`)

    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }

  render() {
    return (
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
    );
  }
}

export default Login;
