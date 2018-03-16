import * as React from "react";
import { Small } from "rebass";
import ChatBubbleProps from "./interface";
import styles from "./styles";
import moment = require("moment");

const defaultBubbleStyles = {
  userBubble: {},
  chatbubble: {},
  text: {}
};

export default class ChatBubble extends React.Component {
  props;

  constructor(props: ChatBubbleProps) {
    super(props);
  }

  public render() {
    const { bubblesCentered } = this.props;
    let { bubbleStyles } = this.props;
    bubbleStyles = bubbleStyles || defaultBubbleStyles;
    const { userBubble, chatbubble, text } = bubbleStyles;

    // message.id 0 is reserved for blue
    const chatBubbleStyles =
      this.props.message.id === 0
        ? {
            ...styles.chatbubble,
            ...(bubblesCentered ? {} : styles.chatbubbleOrientationNormal),
            ...chatbubble,
            ...userBubble
          }
        : {
            ...styles.chatbubble,
            ...styles.recipientChatbubble,
            ...(bubblesCentered
              ? {}
              : styles.recipientChatbubbleOrientationNormal),
            ...chatbubble,
            ...userBubble
          };

    return (
      <div
        style={{
          ...styles.chatbubbleWrapper
        }}
      >
        <div style={chatBubbleStyles}>
          <p style={{ ...styles.p, ...text }}>{this.props.message.message}</p>
        </div>
        {this.props.message.timestamp ? (
          <Small>{moment(this.props.message.timestamp).fromNow()}</Small>
        ) : null}
      </div>
    );
  }
}

export { ChatBubbleProps };
