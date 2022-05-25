import { h } from "preact";
import DetailsView from ".";
import FileThumbnail from "../FileThumbnail";

let i = 0;

export default {
  title: "Components/Desktop/DetailsView",
};

export const Icons = () => {
  const icons = ["(C:)", "My Documents", "Program Files", "Windows"].map(
    (label) => ({
      label,
      size: i++ + "mb",
      date: new Date(Date.now() - Math.random() * 1e10),
    })
  );
  return (
    <DetailsView
      items={icons}
      columns={["size", "date"]}
      onClick={(e) => console.log(e)}
    />
  );
};

Icons.story = {
  name: "icons",
};

export const IconsSelected = () => {
  const icons = ["(C:)", "My Documents", "Program Files", "Windows"].map(
    (label) => ({
      label,
      selected: true,
      size: i++ + "mb",
      date: new Date(Date.now() - Math.random() * 1e10),
    })
  );
  return (
    <DetailsView
      items={icons}
      columns={["size", "date"]}
      onClick={(e) => console.log(e)}
    />
  );
};

IconsSelected.story = {
  name: "icons selected",
};

export const CustomIcons = () => {
  const icons = ["(C:)", "My Documents", "Program Files", "Windows"].map(
    (label) => ({
      label,
      size: i++ + "mb",
      date: new Date(Date.now() - Math.random() * 1e10),
    })
  );
  return (
    <DetailsView
      items={icons}
      columns={["size", "date"]}
      onClick={(e) => console.log(e)}
    />
  );
};

CustomIcons.story = {
  name: "Custom icons",
};
