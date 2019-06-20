import React, {Component} from 'react';
import Chat from './../Components/Chat.jsx';

class MessageContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Chat userId={this.props.userId} userList={this.props.userList} role={this.props.role}  />
      </div>
    );
  }
}

export default MessageContainer;
