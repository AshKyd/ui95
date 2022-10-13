import { h, render, Component } from "preact";
import { useMemo } from "preact/hooks";
import "./style.css";
import Window from "../../components/Window/";
import PhotoSphere from "../../components/PhotoSphere/";
import Toolbar from "../../components/Toolbar/";
import icon16 from "./photosphere-16.gif";

function getTitle(src) {
  return `PhotoSphere Viewer - ${src.split("/").pop().replace(/\?.*/, "")}`;
}

export default function PhotoSphereViewer({ src, wmProps }) {
  // const menuItems = useMemo(
  //   () => [
  //     {
  //       text: "File",
  //       items: [{ text: "Save as" }, "divider"],
  //     },
  //     {
  //       text: "View",
  //       items: [{ text: "3D PhotoSphere" }, { text: "2D Photo" }],
  //     },
  //     {
  //       text: "Help",
  //       items: [{ text: "About" }],
  //     },
  //   ],
  //   src
  // );

  return (
    <Window
      title={getTitle(src)}
      classNames="webview"
      width={800}
      height={600}
      iconUrl={icon16}
      {...wmProps}
    >
      <div class="photo-sphere-viewer-app">
        {/*}<Toolbar variant="text" items={menuItems} />{" "}*/}
        <PhotoSphere src={src} width="100%" height="100%" />
      </div>
    </Window>
  );
}
