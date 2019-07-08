import { h, render, Component } from "preact";

function Image(props) {
  return (
    <img
      src={props.src}
      class={props.class}
      style="image-rendering: optimizeSpeed;"
    />
  );
}

export default Image;
