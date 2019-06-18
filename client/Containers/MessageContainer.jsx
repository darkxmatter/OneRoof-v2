import React, {Component} from 'react';
import Chat from './../Components/Chat.jsx';
import UserList from './../Components/UserList.jsx';

class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Harcoding 1 because this is our manager in the DB and residents can only message the manager
      // If the manager wants to message someone else, they can choose that from the user list which will only render for them
      currentlyMessaging: 29,
      currentlyMessagingName: 'Brian',
      messages: []
    }
    this.changeMessageReceiver = this.changeMessageReceiver.bind(this);
  }

// can we run a component did mount with a set time out on the get request?
// or will this set an infinit loop?
  componentDidMount() {
    this.interval = setInterval(() => {
      fetch('/messages', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          sender_id: this.props.userId,
          receiver_id: this.state.currentlyMessaging
        }
      })
      .then(res => res.json())
      .then(res => this.setState({
        messages: res
      }))
      .catch(err => console.log(err));
    },1500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeMessageReceiver(user, name) {
    this.setState({
      currentlyMessaging: user,
      currentlyMessagingName: name
    });
  }

  render() {
    return (
      <div className="container">
        <Chat userId={this.props.userId} receiver={this.state.currentlyMessaging} receiverName={this.state.currentlyMessagingName} messages={this.state.messages}/>
        {
          this.props.role === 'Manager' &&
          <UserList handleChange={this.changeMessageReceiver} userList={this.props.userList}/>
        }
      </div>
    );
  }
}

export default MessageContainer;
