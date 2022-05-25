import { h } from "preact";
import Shutdown from ".";

export default {
  title: "App/Shutdown",
};

export const Main = () => (
  <Shutdown
    branding="Ash Kyd"
    copyright="Copyright © 2019 Ash Kyd some rights reserved"
    onChange={() => {}}
  />
);
