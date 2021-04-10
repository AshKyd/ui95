import { h, render, Component } from "preact";
import loadYoutubeApi from "./loadYoutubeApi";
import "./style.css";

const playStates = {
  "-1": "unstarted",
  0: "ended",
  1: "playing",
  2: "paused",
  3: "buffering",
  5: "video cued"
};

class Player extends Component {
  constructor({ videoId, playlistId, playState }) {
    super();
    this.state = {
      playlistId,
      playState,
      videoId: playlistId ? undefined : videoId,
      title: ""
    };
  }
  componentShouldUpdate() {
    return false;
  }
  play() {
    this.player && this.player.playVideo();
  }
  pause() {
    this.player && this.player.pauseVideo();
  }
  load() {
    const { videoId, playlistId } = this.state;

    const events = {
      onReady: event => {
        if (this.playlistId) this.player.loadPlaylist(this.playlistId);
      },
      onStateChange: () => this.updateState(),
      onError: () => e => this.playerError(e)
    };
    const playlistOpts = {
      events,
      playerVars: { autoplay: true, listType: "playlist", list: playlistId }
    };
    const videoOpts = {
      videoId,
      events,
      playerVars: { autoplay: true }
    };

    this.player = new this.YT.Player(
      this.rootElement,
      playlistId ? playlistOpts : videoOpts
    );
  }
  updateState() {
    if (!this.player || !this.player.getCurrentTime) return;
    const seconds = this.player.getCurrentTime();
    const title = this.player.getVideoData().title;
    const playState = playStates[this.player.getPlayerState()];
    this.props.onChange({ seconds, title, playState });
  }
  playerError(e) {
    console.log("playerError", e);
  }
  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }
  componentDidMount() {
    loadYoutubeApi().then(YT => {
      this.YT = YT;
      this.load();
    });
    this.timer = setInterval(() => {
      this.updateState();
    }, 500);
  }
  render() {
    return (
      <div class="ui95-player">
        <div key={this.videoId} ref={ref => (this.rootElement = ref)} />
      </div>
    );
  }
}

export default Player;
