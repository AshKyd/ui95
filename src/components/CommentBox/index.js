import { h, render, Component } from "preact";
import { getClasses } from "../../util";
import Input from "../forms/input";
import Icon from "../icon";
import Text from "../text";
import "./style.css";

function CommentBox(props) {
  return (
    <form className="comment-box">
      <div className="comment-box__input">
        <div className="comment-box__input-icon">
          <Icon size="16" name="address-book" />
        </div>
        <div className="comment-box__input-text">
          <Text>Name:</Text>
        </div>
        <div className="comment-box__input-input">
          <Input width="100%" height="100%" required autocomplete="name" />
        </div>
      </div>

      <div className="comment-box__input">
        <div className="comment-box__input-icon">
          <Icon size="16" name="address-book" />
        </div>
        <div className="comment-box__input-text">
          <Text>Email:</Text>
        </div>
        <div className="comment-box__input-input">
          <Input
            width="100%"
            height="100%"
            type="email"
            required
            autocomplete="email"
          />
        </div>
      </div>

      <div className="comment-box__comment">
        <Input width="100%" type="email" required multiline />
      </div>
    </form>
  );
}

export default CommentBox;
