import { h, render, Component } from "preact";
import { useMemo, useRef, useState, useEffect } from "preact/hooks";
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

import iconCheck from "./check.gif";

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
  const [mode, setMode] = useState("photosphere");
  const [isAbout, setIsAbout] = useState(false);

  const isPhotosphere = mode !== "image";
  const menuItems = useMemo(
    () => [
      [
        {
          text: "File",
          items: [{ text: "Save as", link: src }],
        },
        {
          text: "View",
          items: [
            {
              text: "3D PhotoSphere",
              icon: mode === "photosphere" ? iconCheck : undefined,
              onClick: () => setMode("photosphere"),
            },
            {
              text: "2D Photo",
              icon: mode === "image" ? iconCheck : undefined,
              onClick: () => setMode("image"),
            },
            {
              text: "Fisheye",
              icon: mode === "fisheye" ? iconCheck : undefined,
              onClick: () => setMode("fisheye"),
            },
          ],
        },
        // {
        //   text: "Help",
        //   items: [{ text: "About", onClick: () => setIsAbout(true) }],
        // },
      ],
      [
        {
          text: "Go left",
          icon: iconBack,
          disabled: !isPhotosphere,
          onClick: () =>
            goTo({ viewer: photosphereViewerRef.current, longitude: -0.5 }),
        },
        {
          text: "Go Right",
          icon: iconForward,
          disabled: !isPhotosphere,
          onClick: () =>
            goTo({ viewer: photosphereViewerRef.current, longitude: 0.5 }),
        },
        {
          text: "Go up",
          icon: iconUp,
          disabled: !isPhotosphere,
          onClick: () =>
            goTo({ viewer: photosphereViewerRef.current, latitude: 1 }),
        },
        {
          text: "Go down",
          icon: iconDown,
          disabled: !isPhotosphere,
          onClick: () =>
            goTo({ viewer: photosphereViewerRef.current, latitude: -1 }),
        },
        {
          text: "Zoom",
          icon: iconZoom,
          disabled: !isPhotosphere,
          onClick: () =>
            goTo({ viewer: photosphereViewerRef.current, zoom: true }),
        },
      ],
    ],
    [src, mode, setMode]
  );

  useEffect(() => {
    if (mode === "image") {
      photosphereViewerRef.current = null;
    }
  }, [mode]);

  useEffect(() => {
    const viewer = photosphereViewerRef.current;
    if (!viewer) {
      return;
    }

    if (mode === "fisheye") {
      viewer.once("ready", () => {
        console.log("wahahaha");
        viewer.setOption("fisheye", true);
        viewer.zoom(0);

        viewer.animate({
          longitude: viewer.getPosition().longitude,
          latitude: viewer.getPosition().latitude - 0.25,
          speed: "13rpm",
        });
      });
    }

    if (mode === "photosphere") {
      viewer.setOption("fisheye", false);
    }
  }, [photosphereViewerRef.current]);

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
        <Toolbar variant="text" items={menuItems[0]} />
        <Toolbar variant="stacked" items={menuItems[1]} />
        <div
          className="photo-sphere-viewer-app__container"
          style={
            !isPhotosphere && {
              backgroundImage: `url(${src})`,
            }
          }
        >
          {isPhotosphere && (
            <PhotoSphere
              key={mode}
              src={src}
              width="100%"
              height="100%"
              viewerRef={photosphereViewerRef}
              photosphereOptions={{ navbar: false }}
            />
          )}
        </div>
      </div>
    </Window>
  );
}
