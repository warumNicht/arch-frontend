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
  }

  handleChange(event: any) {
    this.setState({
        [event.target.name]:  event.target.value,
    });
  }

  handleSubmit(event: any) {
    event.preventDefault();

    // let config = {
    //     headers: {
    //       Origin: 'http://localhost:3000/'
    //     }
    //   }
    axios.get(`http://192.168.0.104:8080/fetch/categories/all`)

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
