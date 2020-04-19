import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import backendHost from '../../constants/appConstants';

export class Login extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    console.log('Post');
    let config = {
      headers: {
        'X-CSRF-Token': "da5bf55f-0bb6-48b6-a97a-54eae1b47d7f",
      },
      withCredentials: true,
    };
    axios
      .post(
        `${backendHost}/fetch/categories/post`,null, config
      )

      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }

  get() {
    console.log("GET");
    axios
      .get(`${backendHost}/fetch/session`,{withCredentials: true})
      .then((res) => {
        console.log(res);
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
        <button onClick={() => this.get()}>Get items</button>
      </div>
    );
  }
}

export default Login;
