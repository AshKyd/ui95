import { h, render, Component } from "preact";
import Bezel from "../../bezel";
import Icon from "../../icon";
import Text from "../../text";
import "./index.css";

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const hours12 = hours % 12;
  const minutes = date.getMinutes();

  return `${hours12}:${String(minutes).padStart(2, "0")} ${
    hours === hours12 ? "AM" : "PM"
  }`;
}

export default class Tray extends Component {
  constructor() {
    super();
    this.state = {
      time: formatDate(Date.now())
    };

    this.tick = () => this.setState({ time: formatDate(Date.now()) });
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render({ items = [] }) {
    const { time } = this.state;
    const allItems = [...items, { icon: "sound", text: "volume" }];
    return (
      <Bezel
        classNames="in-tab ui95-tray"
        style={{ background: "transparent" }}
      >
        {allItems.map(({ icon, text }) => (
          <Icon size={16} name={icon} title={text} />
        ))}
        <div className="ui95-tray__time">
          <Text>{time}</Text>
        </div>
      </Bezel>
    );
  }
}
