import { h, render, Component } from "preact";
import "./style.css";
const builtIn = {
  custom: {
    chevronBlackRight:
      "data:image/gif;base64,R0lGODlhBAAHAIABAAAAAAQz/yH5BAEKAAEALAAAAAAEAAcAAAIIRA4WaeyrVCgAOw==",
    chevronWhiteRight:
      "data:image/gif;base64,R0lGODlhBAAHAIABAP///wQz/yH5BAEKAAEALAAAAAAEAAcAAAIIRA4WaeyrVCgAOw==",
    windowClose:
      "data:image/gif;base64,R0lGODlhDAAKAIABAAAAAAQz/yH5BAEKAAEALAAAAAAMAAoAAAIUjI8IoNy2ElxOhmgvtRgfr2WiWAAAOw==",
    windowMaximize:
      "data:image/gif;base64,R0lGODlhDAAKAIABAAAAAAQz/yH5BAEKAAEALAAAAAAMAAoAAAIWDI4Ym732IngzMmqvthXm3klUo2RmAQA7",
    windowMinimize:
      "data:image/gif;base64,R0lGODlhDAAKAIABAAAAAAQz/yH5BAEKAAEALAAAAAAMAAoAAAINjI+py+0PGZhU0RpNAQA7",
    windowRestore:
      "data:image/gif;base64,R0lGODlhDAAKAIABAAAAAAQz/yH5BAEKAAEALAAAAAAMAAoAAAIWjI8ZwK3tEkDzQLbozVZX83HUKG1HAQA7"
  },
  16: {
    default:
      "data:image/gif;base64,R0lGODlhEAAQAMIFAAAAAAAAv4CAgMDAwP///wQz/wQz/wQz/yH5BAEKAAcALAAAAAAQABAAAAM4eLrcJzDKCYe9+AogRvhg+G2dGBAAipID5XIDIc+0zNY4cef0ztuw38z3I/JIrhdgyWw6AY7oIgEAOw=="
  },
  32: {
    default:
      "data:image/gif;base64,R0lGODlhIAAgAMIFAAAAAAAAv4CAgMDAwP///wQz/wQz/wQz/yH5BAEKAAcALAAAAAAgACAAAAOBeLrc/jDKKKq9OGsLxPhgKI7kIHRDoK5s676n987sB9h2nNI0Ptw/HY8GKBqNupJyaUJtntCmR0CoWq/YLFZq0nq/VS4VTL6Ky2jCOU1es7/utzYu3+rG9Sw9H77z9X5/ZoGCfU6FVnt8inmMdY5yXEyTIjFQl09HmpucnUYToBEJADs="
  }
};

class Icon extends Component {
  getUrl(size, name) {
    if (builtIn[size] && builtIn[size][name]) return builtIn[size][name];
    return `/icons/${size}/${name}.gif`;
  }
  getSize(size) {
    if (size === "custom") return undefined;
    return size;
  }
  render(props) {
    const name = props.name || "default";
    const classNames = [
      "ui95-icon",
      name,
      props.size,
      (props.classNames || "").split(" ")
    ].join(" ui95-icon--");
    return h("img", {
      className: classNames,
      width: this.getSize(props.size),
      height: this.getSize(props.size),
      src: this.getUrl(props.size, name)
    });
  }
}

export default Icon;
