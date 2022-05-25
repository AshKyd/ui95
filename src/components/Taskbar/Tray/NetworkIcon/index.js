import { h, render, Component } from "preact";
import Icon from "../../../Icon";
import Img from "../../../Img";
import "./style.css";

export default function NetworkIcon() {
  return (
    <div className="ui95-network-icon">
      <div className="ui95-network-icon__in" />
      <div className="ui95-network-icon__out" />
      <Img alt="" src={require("./icon.png")} />
    </div>
  );
}
