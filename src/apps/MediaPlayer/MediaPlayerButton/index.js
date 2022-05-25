import { h, render } from "preact";
import Text from "../../../components/Text/";
function MediaPlayerButton(props) {
  return (
    <a
      class={[
        "ui95-mediaplayer__sidebar-button",
        `ui95-mediaplayer__sidebar-button--${
          props.active ? "active" : "inactive"
        }`,
      ].join(" ")}
      href="#"
      onClick={props.onClick}
    >
      <span
        class={`ui95-mediaplayer__sidebar-img ui95-mediaplayer__sidebar-img--${props.i}`}
      />
      <Text>
        <span class="ui95-mediaplayer__sidebar-text">{props.title}</span>
      </Text>
    </a>
  );
}

export default MediaPlayerButton;
