import { h } from "preact";
import BootSequenceWin2k from ".";

export default {
  title: "Components/BootSequence/Win2k",
};

export const Normal = () => (
  <BootSequenceWin2k
    branding="Ash Kyd"
    copyright="Copyright © 2019 Ash Kyd some rights reserved"
  />
);
