import { h } from "preact";
import Window from ".";

export default {
  title: "App/Webview",
};

export const WindowStyle = () => <Window src="http://example.org/" />;

WindowStyle.story = {
  name: "Window style",
};

export const JsPaintApp = () => <Window src="https://jspaint.app/" />;

JsPaintApp.story = {
  name: "JSPaint app",
};
