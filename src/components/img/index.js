import { h, render, Component } from "preact";

function Image(props) {
  return (
    <img
      src={props.src}
      className={props.className}
      style="image-rendering: optimizeSpeed;"
    />
  );
}

export default Image;
