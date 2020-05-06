
import React from 'react';
import { Link } from 'react-router-dom';

class Signup extends React.PureComponent<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
      avatar: "",
      bio: ""
    }
    this.handleChange = this.handleChange.bind(this);
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
        <h1>Sign Up For An Account</h1>

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

        <label>Avatar</label>
          <input
            name='avatar'
            placeholder='Avatar (URL)'
            value={this.state.avatar}
            onChange={this.handleChange}
            /><br/>

          <label>Bio</label>
          <textarea
            name='bio'
            placeholder='Bio'
            value={this.state.bio}
            onChange={this.handleChange}
            /><br/>

        <input type='submit'/>
        <Link to={'/login'}>Login</Link>
      </form>
    )
  }
}

export default Signup;