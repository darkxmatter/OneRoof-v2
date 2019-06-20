import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as userActions from '../Actions/userActions';

const mapStateToProps = store => ({
  username: store.user.username,
  password: store.user.password,
  role: store.user.role,
  apt: store.user.apt,
  userId: store.user.userId,
  aptId: store.user.aptId,
  login: false,
  aptList: ['1', '2', '3', '4', '5']
});

const mapDispatchToProps = dispatch => ({
  updateUsername: (name) => dispatch(userActions.updateUsername(name)),
  updatePassword: (pass) => dispatch(userActions.updatePassword(pass)),
  updateApt: (apt) => dispatch(userActions.updateApt(apt)),
  updateRole: (role) => dispatch(userActions.updateRole(role)),
  signIn: () => dispatch(userActions.signIn()),
  updateId: id => dispatch(userActions.updateId(id))
})

class AuthenticatedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }
  
  componentDidMount() {
    fetch('/verifyToken')
    .then(res => res.json())
    .then(jwt => {
      if (jwt.hasOwnProperty('username') && jwt.hasOwnProperty('iat')) {
        fetch('/getUserInfo', {
          headers: {
            'Content-Type': 'application/json',
            name: jwt.username
          }
        })
        .then(res => res.json())
        .then(res => {
          console.log('RESPONSE', res);
          this.props.updateUsername(res.name);
          this.props.updateApt(res.apt_id);
          this.props.updateRole(res.role);
          this.props.updateId(res._id);
        });
      } else {
        this.setState({redirect: true});
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to='/login' />
      );
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);