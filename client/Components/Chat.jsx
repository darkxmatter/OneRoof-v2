import React, {Component} from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageToSend: '',
      socket: io(),
      
    }
    this.updateMessage = this.updateMessage.bind(this);
    // this.postMessage = this.postMessage.bind(this);
    this.socketPostMessage = this.socketPostMessage.bind(this);
  }

  updateMessage(e) {
    this.setState({
      messageToSend: e.target.value
    })
  }

  socketPostMessage(e){
    e.preventDefault();
   
    this.state.socket.emit('chat', {
      text: this.state.messageToSend,
      sender_id: this.props.userId,
      receiver_id: this.props.receiver,
      timestamp: null
    });
  }
  componentDidMount(){
    // this.setState({socket: io() });
   
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
    const msgList = this.props.messages.slice();
    /*--------------Listener-----------------*/
 this.state.socket.on('chat', messages => msgList.push(messages));
 //this.setState({msgList: msgList});
    return (
      <div>
        <h4>Currently messaging: {this.props.receiverName}</h4>
        <div>
          {msgList.map(message => {
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