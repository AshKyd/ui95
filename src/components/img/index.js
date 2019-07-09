import { h, render, Component } from "preact";

function Image(props) {
  return (
    <img
      src={props.src}
      class={props.class}
      style="image-rendering: crisp-edges; image-rendering:pixelated;"
    />
  );
}

export default Image;
