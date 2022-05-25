import { h } from "preact";
import { storiesOf } from "@storybook/react";
import ScrollableContainer from ".";

storiesOf("Components/ScrollableContainer", module).add("Pop out", () => (
  <ScrollableContainer
    classNames="hello"
    style={{ width: "300px", height: "200px" }}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis, ex
    vitae finibus consequat, justo diam blandit dui, ac dictum ante elit non
    massa. Mauris neque urna, interdum ut nunc at, tristique viverra ipsum.
    Mauris eget tortor turpis. In egestas lorem felis, eget bibendum nunc
    lacinia vitae. Morbi dapibus neque at arcu fermentum, eu gravida ligula
    vestibulum. Nunc fringilla dignissim mi, ac malesuada tortor. Sed et viverra
    dui. Praesent eget felis at tellus ultricies condimentum. Fusce quis ligula
    vel mi suscipit sodales. Nam suscipit maximus ipsum, eget malesuada lacus
    egestas sit amet. In a pulvinar urna. Duis id turpis et enim porttitor
    suscipit in eu enim. Nulla facilisi. Curabitur efficitur justo quis turpis
    gravida, fringilla blandit dolor vestibulum. Ut viverra mi id molestie
    facilisis. Quisque maximus, mi at feugiat ultrices, mi dolor varius sapien,
    vel fermentum urna diam vitae quam.
  </ScrollableContainer>
));
