import { h, render, Component } from "preact";
import "./style.css";
const icons = {
  custom: {
    chevronBlackRight: require("./icons/custom/chevronBlackRight.gif"),
    chevronWhiteRight: require("./icons/custom/chevronWhiteRight.gif")
  },
  16: {
    folder: require("./icons/16/folder.gif"),
    word: require("./icons/16/word.gif"),
    documentFind: require("./icons/16/documentFind.gif"),
    documentNew: require("./icons/16/documentNew.gif"),
    open: require("./icons/16/open.gif"),
    save: require("./icons/16/save.gif"),
    print: require("./icons/16/print.gif"),
    ash: require("./icons/16/ash.svg")
  },
  32: {
    errorCircle: require("./icons/32/error-circle.gif")
  }
};

class Icon extends Component {
  render(props) {
    return h("img", {
      className: ["ui95-icon", props.name, props.size].join(" ui95-icon--"),
      src: icons[props.size][props.name]
    });
  }
}

export default Icon;
