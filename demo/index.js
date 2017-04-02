import React from 'react'
import { render } from 'react-dom'
import { ChatFeed, Message } from '../lib'

const styles = {
  button: {
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderRadius: 20,
    borderWidth: 2,
    fontSize: 18,
    fontWeight: '300',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  selected: {
    color: '#fff',
    backgroundColor: '#0084FF',
    borderColor: '#0084FF',
  }
}

class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      messages : [
        (new Message(1, "Hey guys!")),
        (new Message(1, "It's me, Mark.")),
        (new Message(2, "Hey! Evan here. react-chat-ui is pretty dooope."))
      ],
      curr_user: 0
    }
  }

  _onPress(user) {
    this.setState({curr_user: user});
  }

  _pushMessage(recipient, message) {
    var prevState = this.state
    prevState.messages.push(new Message(recipient, message))
    this.setState(this.state)
  }

  _onMessageSubmit(e) {
    var input = this.refs.message;
    e.preventDefault();
    console.log("submit!");
    if (!input.value) {return false;}
    this._pushMessage(this.state.curr_user, input.value)
    input.value = '';
  }

  render() {
    return(
      <div>
        <ChatFeed
          messages={this.state.messages} // Boolean: list of message objects
          isTyping={this.state.is_typing} // Boolean: is the recipient typing
          hasInputField={false} // Boolean: use our input, or use your own
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          bubbleStyles={{ // JSON: Custom bubble styles
            text: {
              fontSize: 18
            },
            chatbubble: {
              maxWidth: 600
            },
            userBubble: {
              backgroundColor: '#0084FF'
            }
          }}
        />

        <form onSubmit={this._onMessageSubmit.bind(this)}>
          <input ref="message" placeholder="Type a message..." className="message-input" />
        </form>

        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <button style={{...styles.button, ...((this.state.curr_user === 0) ? styles.selected : {})}} onClick={this._onPress.bind(this, 0)}>You</button>
          <button style={{...styles.button, ...((this.state.curr_user === 1) ? styles.selected : {})}} onClick={this._onPress.bind(this, 1)}>Mark</button>
          <button style={{...styles.button, ...((this.state.curr_user === 2) ? styles.selected : {})}} onClick={this._onPress.bind(this, 2)}>Evan</button>
        </div>
      </div>
    )
  }
}

render(
  (<Chat/>)
  ,
  document.getElementById('chat-ui')
)
