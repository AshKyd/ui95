import { h } from "preact";
import { storiesOf } from "@storybook/react";
import playlists from "./example.json";
import MediaPlayer from ".";
import Guide from "./guide/index.js";
import StatusBar from "./statusbar/index.js";
import Player from "./player/index.js";

storiesOf("App/Media Player", module)
  .add("Media player", () => <MediaPlayer playlists={playlists} />)
  .add("Guide", () => <Guide playlist={playlists[0]} playItems={console.log} />)
  .add("Status bar", () => (
    <StatusBar item={playlists[0].videos[0]} currentTime={71} />
  ))
  .add("Player (with playlist)", () => (
    <Player playlistId="PLNAiXhy9-wI7PIy3Vmf5ODiFauAAjeDAs" />
  ))
  .add("Player (with video)", () => <Player videoId="Hkp_MC3ISWA" />);
