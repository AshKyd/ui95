import { h } from "preact";
import Bezel from ".";

export default {
  title: "Components/Bezel",
};

export const Recessed = () => <Bezel classNames="in">A recessed area</Bezel>;
export const PopOut = () => <Bezel classNames="out">A popped out area</Bezel>;

PopOut.story = {
  name: "Pop out",
};
