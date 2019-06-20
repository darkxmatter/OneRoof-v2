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
    console.log('user selected:', user);
    console.log()
    this.setState({
      currentlyMessaging: user,
      currentlyMessagingName: name
    }, ()=>{this.runFetch()});
    this.socket.emit('join', user);
  }

  listeningSocket() {
       // this.setState({socket: io() });
    /*--------------Listener-----------------*/
    this.socket.on('chat', messages => {
      const msgList = this.state.msgList.slice();
      console.log('message send from manager')
      msgList.push(messages)
      this.setState({msgList: msgList});
      console.log(this.state.msgList);
  });
  }

  updateMessage(e) {
    this.setState({
      messageToSend: e.target.value
    })
  }

  socketPostMessage(e){
    console.log('state: ', this.state);
    e.preventDefault();
   
    let msg = {
      _id: this.state.msgList[this.state.msgList.length -1]._id + 1,
      text: this.state.messageToSend,
      sender_id: this.props.userId,
      receiver_id: this.state.currentlyMessaging,
      timestamp: null
    };

    if(this.props.role === 'Manager') this.socket.emit('chat', msg, this.state.currentlyMessaging);
    else this.socket.emit('chat', msg, this.props.userId);
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
    .then(() => {if(this.props.role !== 'Manager') {
      this.socket.emit('join', this.props.userId)
    }})
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
        <textarea onChange={(e)=>{this.updateMessage(e)}}></textarea>
        <button onClick={(e) => {this.socketPostMessage(e)}}>Send Message</button>
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