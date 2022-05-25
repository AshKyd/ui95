import { h, render } from "preact";
import "./index.css";

export default function Branding({ text1, text2 }) {
  return (
    <div class="ui95-startmenu__branding">
      <div className="ui95-startmenu__branding-rotated">
        <span>{text1 || "Windows"}</span> <span>{text2 || "ME"}</span>
      </div>
    </div>
  );
}
