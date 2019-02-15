import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";
import ScrollableContainer from "../../components/scrollablecontainer/index.js";
import Text from "../../components/text/index.js";

class MediaPlayer extends Component {
  constructor(props) {
    super();

    this.state = {
      mode: "renderViewPlaylist",
      zIndex: props.zIndex,
      playlist: props.playlists[0],
      title: props.playlists[0].title,
      position: 0,
      appLoaded: false,
      seconds: 0,
      playingTitle: null
    };

    import("./lazyComponents").then(components => {
      this.components = components;
      setTimeout(() => {
        this.setState({ appLoaded: true });
      }, 1000);
    });
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState(() => ({
      zIndex: nextProps.zIndex
    }));
  }
  playItems(itemType, itemId) {
    console.log({ itemType, itemId });
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
    return (
      <Guide
        playlist={this.state.playlist}
        playItems={this.playItems.bind(this)}
      />
    );
  }
  renderCurrentlyPlaying() {
    const { Player } = this.components;
    const { playlistId, videoId } = this.state;
    return (
      <Player
        playlistId={playlistId}
        videoId={videoId}
        onChange={({ seconds, title: playingTitle }) => {
          this.setState({ seconds, playingTitle });
        }}
      />
    );
  }
  render(props) {
    const { Button, StatusBar } = this.components || {};

    return (
      <Window
        title={this.state.title + " - Media Player"}
        zIndex={this.state.zIndex}
        classNames="mediaplayer"
        minWidth={320}
        minHeight={480}
        onClose={props.onClose}
        onFocus={props.onFocus}
      >
        {this.state.appLoaded && (
          <div class="ui95-mediaplayer__container">
            <ul class="ui95-mediaplayer__sidebar">
              {this.props.playlists.map((playlist, i) =>
                Button({
                  i,
                  title: playlist.title,
                  active: playlist.id === this.state.playlist.id,
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
              {this[this.state.mode]()}
            </ScrollableContainer>
            <StatusBar
              title={this.state.playingTitle}
              seconds={this.state.seconds}
            />
          </div>
        )}
      </Window>
    );
  }
}

export default MediaPlayer;
