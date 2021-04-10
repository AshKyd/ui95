import { h, render, Component } from "preact";
import "./style.css";

function WindowArea(props) {
  function contextMenu(e) {
    if (!e.target.className.includes("ui95-windowarea")) return;
    e.preventDefault();
    props.shell.openContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { text: "Arrange icons", disabled: true },
        { text: "Line up icons", disabled: true },
        { text: "Refresh", disabled: true },
        "divider",
        { text: "Paste", disabled: true },
        { text: "New shortcut", disabled: true },
        "divider",
        {
          text: "New",
          items: [
            { text: "Folder", disabled: true },
            { text: "Shortcut", disabled: true },
            "divider",
            { text: "Text document", disabled: true, icon: "wordpad" },
            { text: "Bitmap image", disabled: true, icon: "paint" }
          ]
        },
        { text: "Properties", appProps: { app: "DisplayProperties" } }
      ]
    });
  }

  return (
    <div className="ui95-windowarea" onContextMenu={contextMenu}>
      {props.children}
    </div>
  );
}

export default WindowArea;
