import React from "react";
import api from '../../util/api';

export class Login extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "Keiser",
      password: "A12wert",
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(event: any) {
    this.setState({
      [event.target.name]: event.target.value,
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
        localStorage.setItem('token', res.data);
        this.props.login(res.data);
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        this.props.history.push(from);
      })
      .catch((e: any) => {
        console.log(e)
      });
  }


  render() {
    return (
      <div>
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
        <button onClick={this.login}>REST login</button>
      </div>
    );
  }
}

export default Login;
