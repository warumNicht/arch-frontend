import React from 'react';
import { connect } from 'react-redux';

class ProfileContainer extends React.PureComponent<any, any> {

  render() {
    return (
     <div>
        {this.props.token ? this.props.token : 'Not logged in'}
     </div>
    )
  }
}

export default ProfileContainer;