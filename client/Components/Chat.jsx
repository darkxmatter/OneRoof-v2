import React, {Component} from 'react';
import UserList from './UserList.jsx'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageToSend: '',
      msgList: [],
      // state set to talk to manager.
      currentlyMessaging: 51,
      currentlyMessagingName: 'Gilbert',
      messages: [],
    }
    this.socket = io();
    this.updateMessage = this.updateMessage.bind(this);
    this.runFetch = this.runFetch.bind(this);
    this.socketPostMessage = this.socketPostMessage.bind(this);
    this.listeningSocket = this.listeningSocket.bind(this);
    this.changeMessageReceiver = this.changeMessageReceiver.bind(this);
  }

  runFetch(){
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
      msgList: res
    }))
  }
  
  changeMessageReceiver(user, name) {
    this.setState({
      currentlyMessaging: user,
      currentlyMessagingName: name
    }, ()=>{this.runFetch()});
  }

  listeningSocket() {
       // this.setState({socket: io() });
    const msgList = this.state.msgList;
    /*--------------Listener-----------------*/
    this.socket.on('chat', messages => {
      msgList.push(messages)
      this.setState({msgList: msgList});
  });
  }

  updateMessage(e) {
    this.setState({
      messageToSend: e.target.value
    })
  }

  socketPostMessage(e){
    e.preventDefault();
   
    this.socket.emit('chat', {
      text: this.state.messageToSend,
      sender_id: this.props.userId,
      receiver_id: this.state.currentlyMessaging,
      timestamp: null
    });
  }
  componentDidMount(){
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
      msgList: res
    }))
    .then(() => this.listeningSocket())
    .catch(err => console.log(err));
  }

  componentDidUpdate(){
    console.log(this.state);

  }

  render() {
    return (
      <div>
        <h4>Currently messaging: {this.state.currentlyMessagingName}</h4>
        <div>
          {this.state.msgList.map(message => {
            return (<div>
              <h4>{message.sender_id === this.props.userId ? 'You' : this.state.currentlyMessagingName}</h4>
              <p>{message.text}</p>
            </div>);
          })}
        </div>
        <textarea onChange={this.updateMessage}></textarea>
        <button onClick={this.socketPostMessage}>Send Message</button>
        <br />
        {
          this.props.role === 'Manager' &&
          <UserList handleChange={this.changeMessageReceiver} userList={this.props.userList}/>
        }
      </div>
    );
  }
}

export default Chat;