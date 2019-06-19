import React, {Component} from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageToSend: '',
     
      msgList: []
      
    }
    this.socket = io();
    this.updateMessage = this.updateMessage.bind(this);
    // this.postMessage = this.postMessage.bind(this);
    this.socketPostMessage = this.socketPostMessage.bind(this);
    this.listeningSocket = this.listeningSocket.bind(this);
  }

  listeningSocket() {
       // this.setState({socket: io() });
   const msgList = this.state.msgList;
   console.log('logging props msgs:', this.state)
   console.log('CHECKING MSG LIST', msgList)
   this.socket.on('chat', messages => {
     console.log('this is the socket on inside chat.jsx')
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
      receiver_id: this.props.receiver,
      timestamp: null
    });
  }
  componentDidMount(){
    fetch('/messages', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        sender_id: this.props.userId,
        receiver_id: this.props.receiver
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

  // postMessage(e) {
  //   e.preventDefault();
  //   if (this.state.messageToSend !== '') {
  //     fetch('/messages', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         text: this.state.messageToSend,
  //         sender_id: this.props.userId,
  //         receiver_id: this.props.receiver,
  //         timestamp: null
  //       })
  //     })
  //     .catch(err => console.log(err));
  //   }
  // }

  render() {
    //const msgList = this.props.messages.slice();
    /*--------------Listener-----------------*/
 
 //this.setState({msgList: msgList});
    return (
      <div>
        <h4>Currently messaging: {this.props.receiverName}</h4>
        <div>
          {this.state.msgList.map(message => {
            return (<div>
              <h4>{message.sender_id === this.props.userId ? 'You' : this.props.receiverName}</h4>
              <p>{message.text}</p>
            </div>);
          })}
        </div>
        <textarea onChange={this.updateMessage}></textarea>
        <button onClick={this.socketPostMessage}>Send Message</button>
      </div>
    );
  }
}

export default Chat;