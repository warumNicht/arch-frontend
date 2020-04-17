import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.PureComponent {
  state = {
    username: "",
    password: ""
  }

  handleChange ( event:any ){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit ( event:any ){
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>

        <label>Username</label>
        <input
          name='username'
          placeholder='Username'
          value={this.state.username}
          onChange={this.handleChange}
          /><br/>

        <label>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleChange}
          /><br/>

        <input type='submit'/>
        <Link to={'/'}>Home</Link>
      </form>
    )
  }
}

export default Login;