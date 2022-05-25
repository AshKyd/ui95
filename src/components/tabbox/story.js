import { h } from "preact";
import TabBox from ".";

export default {
  title: "Components/TabBox",
};

export const Recessed = () => (
  <TabBox tabs={{ General: [], "Device Manager": [], Performance: [] }} />
);
