import { h, render, Component } from "preact";
import loadYoutubeApi from "./loadYoutubeApi";
import "./style.css";

class Player extends Component {
  constructor({ videoId, playlistId }) {
    console.log({ videoId, playlistId });
    super();
    this.state = {
      playlistId,
      videoId: playlistId ? undefined : videoId,
      title: ""
    };
  }
  componentShouldUpdate() {
    return false;
  }
  play() {
    const { videoId, playlistId } = this.state;
    this.player = new this.YT.Player(this.rootElement, {
      videoId,
      playlistId,
      autoplay: true,
      events: {
        onReady: event => {
          this.player.loadPlaylist(this.playlistId);
          // this.setState({ title: event.target.getVideoData().title });
        }
      }
    });
  }
  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }
  componentDidMount() {
    loadYoutubeApi().then(YT => {
      this.YT = YT;
      this.play();
    });
    this.timer = setInterval(() => {
      const seconds = this.player.getCurrentTime();
      this.props.onChange({ seconds, title: this.state.title });
    }, 1000);
  }
  render() {
    return (
      <div class="ui95-player">
        <div ref={ref => (this.rootElement = ref)} />
      </div>
    );
  }
}

export default Player;
