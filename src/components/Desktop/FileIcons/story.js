import { h } from "preact";
import FileIcons from ".";
import FileThumbnail from "../FileThumbnail";

export default {
  title: "Components/Desktop/FileIcons",
};

export const Icons = () => {
  const icons = ["(C:)", "My Documents", "Program Files", "Windows"].map(
    (label) => ({
      label,
    })
  );
  return <FileIcons items={icons} onClick={(e) => console.log(e)} />;
};

Icons.story = {
  name: "icons",
};

export const IconsSelected = () => {
  const icons = ["(C:)", "My Documents", "Program Files", "Windows"].map(
    (label) => ({
      label,
      selected: true,
    })
  );
  return <FileIcons items={icons} onClick={(e) => console.log(e)} />;
};

IconsSelected.story = {
  name: "icons selected",
};

export const CustomIcons = () => {
  const icons = ["(C:)", "My Documents", "Program Files", "Windows"].map(
    (label) => ({ label })
  );
  return (
    <FileIcons
      Icon={FileThumbnail}
      items={icons}
      onClick={(e) => console.log(e)}
    />
  );
};

CustomIcons.story = {
  name: "Custom icons",
};
