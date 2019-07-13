import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window";
import ScrollableContainer from "../../components/scrollablecontainer";
import Text from "../../components/text";
import Guide from "./guide";
import StatusBar from "./statusbar";
import Button from "./button";
import Player from "./player";

function initCap(string) {
  const a = string.split("");
  a[0] = a[0].toUpperCase();
  return a.join("");
}

class MediaPlayer extends Component {
  constructor({ zIndex, playlists = [], videoId, mode }) {
    super();

    this.state = {
      mode: mode || "renderViewPlaylist",
      zIndex: zIndex,
      playlists,
      playlist: playlists[0],
      title: playlists.length ? playlists[0].title : "",
      position: 0,
      seconds: 0,
      playingTitle: null,
      playState: 1,
      videoId
    };
  }
  componentWillReceiveProps({ zIndex, videoId, playlists }, nextContext) {
    this.setState(() => ({
      videoId,
      playlists,
      playlist: playlists && playlists[0]
    }));
  }
  playItems(itemType, itemId) {
    this.setState({
      [itemType]: itemId,
      mode: "renderCurrentlyPlaying",
      position: 0
    });
    return true;
  }
  openPlaylist(playlist) {
    this.setState({
      title: playlist.title,
      mode: "renderViewPlaylist",
      playlist,
      playingTitle: null,
      playlistId: undefined,
      videoId: undefined
    });
  }
  renderViewPlaylist() {
    if (!this.state.playlist) return undefined;
    return (
      <Guide
        playlist={this.state.playlist}
        playItems={this.playItems.bind(this)}
      />
    );
  }
  renderCurrentlyPlaying() {
    const { playlistId, videoId, playState } = this.state;
    return (
      <Player
        playlistId={playlistId}
        videoId={videoId}
        playState={playState}
        ref={ref => (this.player = ref)}
        onChange={({ seconds, title: playingTitle, playState }) => {
          // If the video has ended, return to the playlist.
          if (playState === "ended")
            return this.setState({ mode: "renderViewPlaylist" });
          this.setState({ seconds, playingTitle, playState });
        }}
      />
    );
  }
  render(props) {
    const { title, mode, playingTitle, seconds, playState } = this.state;
    return (
      <Window
        title={title + " - Media Player"}
        classNames="mediaplayer"
        minWidth={320}
        minHeight={480}
        {...props.wmProps}
      >
        <div class="ui95-mediaplayer__container">
          <ul class="ui95-mediaplayer__sidebar">
            {this.state.playlists.map((playlist, i) => (
              <li>
                {Button({
                  i,
                  title: playlist.title,
                  active:
                    this.state.playlist &&
                    playlist.id === this.state.playlist.id,
                  onClick: e => {
                    this.openPlaylist(playlist);
                    e.preventDefault();
                  }
                })}
              </li>
            ))}
          </ul>
          <ScrollableContainer
            style={{
              position: "absolute",
              left: "98px",
              right: "19px",
              top: "42px",
              bottom: "83px"
            }}
          >
            {this[mode]()}
          </ScrollableContainer>
          <StatusBar
            title={
              playingTitle && [initCap(playState), playingTitle].join(": ")
            }
            seconds={seconds}
          />
          <button
            onClick={() =>
              this.player &&
              (playState === "play" ? this.player.play() : this.player.pause())
            }
            class="ui95-mediaplayer__play"
          >
            <img src={require("./assets/play.png")} alt="Play/Pause" />
          </button>
          <button
            onClick={() => this.setState({ mode: "renderViewPlaylist" })}
            class="ui95-mediaplayer__stop"
          >
            <img src={require("./assets/stop.png")} alt="Stop" />
          </button>
        </div>
      </Window>
    );
  }
}

export default MediaPlayer;
