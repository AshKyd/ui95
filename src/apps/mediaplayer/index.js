import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";
import ScrollableContainer from "../../components/scrollablecontainer/index.js";
import Text from "../../components/text/index.js";
import Guide from "./guide/index.js";

function Button(props) {
  return (
    <a
      class={[
        "ui95-mediaplayer__sidebar-button",
        `ui95-mediaplayer__sidebar-button--${
          props.active ? "active" : "inactive"
        }`
      ].join(" ")}
      href="#"
      onClick={props.onClick}
    >
      <span
        class={`ui95-mediaplayer__sidebar-img ui95-mediaplayer__sidebar-img--${
          props.i
        }`}
      />
      <Text>
        <span class="ui95-mediaplayer__sidebar-text">{props.title}</span>
      </Text>
    </a>
  );
}

class MediaPlayer extends Component {
  constructor(props) {
    super();

    this.state = {
      mode: "renderViewPlaylist",
      zIndex: props.zIndex,
      playlist: props.playlists[0],
      title: props.playlists[0].title,
      position: 0
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState(() => ({
      zIndex: nextProps.zIndex
    }));
  }
  playItems(files, playlistId) {
    this.setState({
      title: files[0].title,
      playlistId,
      mode: "renderCurrentlyPlaying",
      playlist: files,
      position: 0
    });
    return true;
  }
  openPlaylist(playlist) {
    this.setState({
      title: playlist.title,
      mode: "renderViewPlaylist",
      playlist
    });
  }
  renderViewPlaylist() {
    return (
      <Guide
        playlist={this.state.playlist}
        playItems={this.playItems.bind(this)}
      />
    );
  }
  renderCurrentlyPlaying() {
    return (
      <div>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube-nocookie.com/embed/${
            this.state.playlist[this.state.position].id
          }?list=${this.state.playlistId}&autoplay=1`}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    );
  }
  render(props) {
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
        </div>
      </Window>
    );
  }
}

export default MediaPlayer;
