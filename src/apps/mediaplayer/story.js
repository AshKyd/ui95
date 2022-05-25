import { h } from "preact";
import playlists from "./example.json";
import MediaPlayer from ".";
import Guide from "./Guide/";
import StatusBar from "./StatusBar/";
import Player from "./Player/";

export default {
  title: "App/Media Player",
};

export const _MediaPlayer = () => <MediaPlayer playlists={playlists} />;

_MediaPlayer.story = {
  name: "Media player",
};

export const _Guide = () => (
  <Guide playlist={playlists[0]} playItems={console.log} />
);

export const _StatusBar = () => (
  <StatusBar item={playlists[0].videos[0]} currentTime={71} />
);

_StatusBar.story = {
  name: "Status bar",
};

export const PlayerWithPlaylist = () => (
  <Player playlistId="PLNAiXhy9-wI7PIy3Vmf5ODiFauAAjeDAs" />
);

PlayerWithPlaylist.story = {
  name: "Player (with playlist)",
};

export const PlayerWithVideo = () => <Player videoId="Hkp_MC3ISWA" />;

PlayerWithVideo.story = {
  name: "Player (with video)",
};
