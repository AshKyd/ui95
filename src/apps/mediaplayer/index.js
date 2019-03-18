import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";
import ScrollableContainer from "../../components/scrollablecontainer/index.js";
import Text from "../../components/text/index.js";

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
      appLoaded: false,
      seconds: 0,
      playingTitle: null,
      playState: 1,
      videoId
    };

    import("./lazyComponents").then(components => {
      this.components = components;
      this.setState({ appLoaded: true });
    });
  }
  componentWillReceiveProps({ zIndex, videoId, playlists }, nextContext) {
    this.setState(() => ({
      zIndex,
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
    const { Guide } = this.components;
    if (!this.state.playlist) return undefined;
    return (
      <Guide
        playlist={this.state.playlist}
        playItems={this.playItems.bind(this)}
      />
    );
  }
  renderCurrentlyPlaying() {
    const { Player } = this.components;
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
    const { Button, StatusBar } = this.components || {};

    const {
      appLoaded,
      title,
      zIndex,
      mode,
      playingTitle,
      seconds,
      playState
    } = this.state;
    return (
      <Window
        title={title + " - Media Player"}
        zIndex={zIndex}
        classNames="mediaplayer"
        minWidth={320}
        minHeight={480}
        onClose={props.onClose}
        onFocus={props.onFocus}
      >
        {!appLoaded && <div class="ui95-mediaplayer__container" />}
        {appLoaded && (
          <div class="ui95-mediaplayer__container">
            <ul class="ui95-mediaplayer__sidebar">
              {this.state.playlists.map((playlist, i) =>
                Button({
                  i,
                  title: playlist.title,
                  active:
                    this.state.playlist &&
                    playlist.id === this.state.playlist.id,
                  onClick: e => {
                    this.openPlaylist(playlist);
                    e.preventDefault();
                  }
                })
              )}
            </ul>
            <ScrollableContainer
              style={{
                position: "absolute",
                left: "calc(98 * var(--px))",
                right: "calc(19 * var(--px))",
                top: "calc(42 * var(--px))",
                bottom: "calc(83 * var(--px))"
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
                (playState === "play"
                  ? this.player.play()
                  : this.player.pause())
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
        )}
      </Window>
    );
  }
}

export default MediaPlayer;
