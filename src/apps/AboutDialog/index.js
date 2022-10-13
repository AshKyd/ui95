import { h, render, Component } from "preact";
import { useMemo } from "preact/hooks";
import Window from "../../components/Window/";
import Button from "../../components/Button/";
import Divider from "../../components/Divider/";
import Text from "../../components/Text/";
import "./style.css";

export default function AboutDialog({
  title,
  image,
  imageAlt,
  name,
  subtext,
  children,
  wmProps,
}) {
  return (
    <Window
      title={title}
      classNames="webview"
      width={800}
      height={600}
      buttons={["close"]}
      isResizeable={false}
      {...wmProps}
    >
      <div className="about-dialog-app">
        <div className="about-dialog-app__top">
          <div className="about-dialog-app__image">
            <img src={image} alt={imageAlt || ""} />
          </div>
          <div className="about-dialog-app__info">
            <Text>
              <div className="about-dialog-app__name">{name}</div>

              <div className="about-dialog-app__info-subtext">{subtext}</div>
            </Text>
          </div>
        </div>
        <Divider classNames="horizontal" />
        <div className="about-dialog-app__children">
          <Text>{children}</Text>
        </div>
        <Divider classNames="horizontal" />
        <div className="about-dialog-app__buttons">
          <Button className="about-dialog-app__ok" onClick={wmProps?.onClose}>
            Ok
          </Button>
        </div>
      </div>
    </Window>
  );
}
