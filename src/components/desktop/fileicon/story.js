import { h } from "preact";
import FileIcon from ".";

export default {
  title: "Components/Desktop/FileIcon",
};

export const CDrive = () => <FileIcon size="16" icon="default" label=" (C:)" />;

export const CDriveSelected = () => (
  <FileIcon size="16" icon="default" selected={true} label=" (C:)" />
);

CDriveSelected.story = {
  name: "C Drive selected",
};

export const LongFileName = () => (
  <FileIcon size="16" icon="default" label="A long file name" />
);

LongFileName.story = {
  name: "Long file name",
};
