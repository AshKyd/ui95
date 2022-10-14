import { h, render, Component } from "preact";
import { useMemo, useRef } from "preact/hooks";
import "./style.css";
import Window from "../../components/Window/";
import PhotoSphere from "../../components/PhotoSphere/";
import Toolbar from "../../components/Toolbar/";
import icon16 from "./photosphere-16.gif";

import iconBack from "./explorer-back.gif";
import iconForward from "./explorer-forward.gif";
import iconUp from "./explorer-up.gif";
import iconDown from "./explorer-down.gif";
import iconZoom from "./magnifier.gif";

function getTitle(src) {
  return `PhotoSphere Viewer - ${src.split("/").pop().replace(/\?.*/, "")}`;
}

function goTo({ viewer, longitude = 0, latitude = 0, zoom = false }) {
  const currentPosition = viewer.getPosition();
  let zoomLevel = viewer.getZoomLevel();

  if (zoom) {
    if (zoomLevel === 0) {
      zoomLevel = 50;
    } else if (zoomLevel === 100) {
      zoomLevel = 0;
    } else {
      zoomLevel = 100;
    }
  }

  viewer.animate({
    longitude: currentPosition.longitude + longitude,
    latitude: currentPosition.latitude + latitude,
    speed: "13rpm",
    zoom: zoomLevel,
  });
}

export default function PhotoSphereViewer({ src, wmProps }) {
  const photosphereViewerRef = useRef();
  const menuItems = useMemo(
    () => [
      {
        text: "File",
        items: [{ text: "Save as" }, "divider"],
      },
      {
        text: "View",
        items: [{ text: "3D PhotoSphere" }, { text: "2D Photo" }],
      },
      {
        text: "Help",
        items: [{ text: "About" }],
      },
    ],
    src
  );

  return (
    <Window
      title={getTitle(src)}
      classNames="webview"
      width={800}
      height={600}
      icon={icon16}
      {...wmProps}
    >
      <div class="photo-sphere-viewer-app">
        {/*<Toolbar variant="text" items={menuItems} />*/}
        <Toolbar
          variant="stacked"
          items={[
            {
              text: "Go left",
              icon: iconBack,
              onClick: () =>
                goTo({ viewer: photosphereViewerRef.current, longitude: -0.5 }),
            },
            {
              text: "Go Right",
              icon: iconForward,
              onClick: () =>
                goTo({ viewer: photosphereViewerRef.current, longitude: 0.5 }),
            },
            {
              text: "Go up",
              icon: iconUp,
              onClick: () =>
                goTo({ viewer: photosphereViewerRef.current, latitude: 1 }),
            },
            {
              text: "Go down",
              icon: iconDown,
              onClick: () =>
                goTo({ viewer: photosphereViewerRef.current, latitude: -1 }),
            },
            {
              text: "Zoom",
              icon: iconZoom,
              onClick: () =>
                goTo({ viewer: photosphereViewerRef.current, zoom: true }),
            },
            // {
            //   text: "Fish",
            //   icon: iconZoom,
            //   onClick: () =>
            //     photosphereViewerRef.current.setOption("fisheye", true),
            // },
          ]}
        />
        <div className="photo-sphere-viewer-app__container">
          <PhotoSphere
            src={src}
            width="100%"
            height="100%"
            viewerRef={photosphereViewerRef}
            photosphereOptions={{ navbar: false }}
          />
        </div>
      </div>
    </Window>
  );
}
