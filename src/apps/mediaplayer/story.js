import { h } from "preact";
import { storiesOf } from "@storybook/react";
import playlists from './example.json';
import MediaPlayer from "./index.js";

storiesOf("App/Media Player", module).add("No configuration", () => (
  <MediaPlayer playlists={playlists} onFocus={() => {}} onClose={() => {}} />
));
