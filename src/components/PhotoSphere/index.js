import { h, render, Component } from "preact";
import { useEffect, useRef } from "preact/hooks";
import "./style.css";
import "./lib/photo-sphere-viewer.css";
import { Viewer } from "./lib/photo-sphere-viewer.js";

/**
 * Display an interactive photosphere using photo-sphere-viewer
 * @param {Object} props
 * @param {string} props.url The URL of the image to load
 * @param {Object} props.photosphereOptions Any other options to pass to photo-sphere-viewer
 */
export default function PhotoSphere({
  src,
  photosphereOptions,
  width,
  height,
  ratio,
}) {
  const container = useRef();
  const inner = useRef();
  const viewer = useRef();
  const resizeObserver = useRef();

  useEffect(() => {
    if (!src || !container.current || !inner.current) return;
    viewer.current = new Viewer({
      panorama: src,
      ...photosphereOptions,
      container: inner.current,
      size: {
        width: 320,
        height: 240,
      },
    });

    resizeObserver.current = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentBoxSize) {
          // Firefox implements `contentBoxSize` as a single content rect, rather than an array
          const contentBoxSize = Array.isArray(entry.contentBoxSize)
            ? entry.contentBoxSize[0]
            : entry.contentBoxSize;

          console.log("updating size");

          viewer.current.setOption("size", {
            width: Math.ceil(entry.contentRect.width),
            height: Math.ceil(entry.contentRect.height),
          });
        }
      }
    });

    resizeObserver.current.observe(container.current);

    console.log(resizeObserver);
  }, [container.current, container.inner]);

  const style = ratio
    ? {
        "aspect-ratio": String(ratio),
      }
    : { width, height };

  return (
    <div class="photo-sphere" ref={container} style={style}>
      <div class="photo-sphere__inner" ref={inner}></div>
    </div>
  );
}
