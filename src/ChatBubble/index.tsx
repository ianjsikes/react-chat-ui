import * as React from "react";
import { Tooltip } from "rebass";
import ChatBubbleProps from "./interface";
import styles from "./styles";
import moment from "moment";

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

    if (this.props.message.timestamp) {
      return (
        <Tooltip text={moment(this.props.message.timestamp).fromNow()}>
          <div
            style={{
              ...styles.chatbubbleWrapper
            }}
          >
            <div style={chatBubbleStyles}>
              <p style={{ ...styles.p, ...text }}>
                {this.props.message.message}
              </p>
            </div>
          </div>
        </Tooltip>
      );
    }
    return (
      <div
        style={{
          ...styles.chatbubbleWrapper
        }}
      >
        <div style={chatBubbleStyles}>
          <p style={{ ...styles.p, ...text }}>{this.props.message.message}</p>
        </div>
      </div>
    );
  }
}

export { ChatBubbleProps };
