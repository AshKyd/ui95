import { h } from "preact";
import FileThumbnail from ".";

export default {
  title: "Components/Desktop/FileThumbnail",
};

export const CDrive = () => (
  <FileThumbnail size="16" icon="default" label=" (C:)" />
);

export const CDriveSelected = () => (
  <FileThumbnail size="16" icon="default" selected={true} label=" (C:)" />
);

CDriveSelected.story = {
  name: "C Drive selected",
};

export const LongFileName = () => (
  <FileThumbnail
    size="16"
    icon="default"
    label="Maritime Museum of Denmark + catching a boat to Sweden"
  />
);

LongFileName.story = {
  name: "Long file name",
};

export const WithImage = () => (
  <FileThumbnail
    size="16"
    icon="default"
    image={require("./kitten.jpg")}
    imageAlt="A kitten"
    label="Maritime Museum of Denmark + catching a boat to Sweden"
  />
);

WithImage.story = {
  name: "With image",
};

export const With4X3Image = () => (
  <FileThumbnail
    size="16"
    icon="default"
    image={require("./kitten-4x3.jpg")}
    imageAlt="A kitten"
    label="Maritime Museum of Denmark + catching a boat to Sweden"
  />
);

With4X3Image.story = {
  name: "With 4X3 image",
};
