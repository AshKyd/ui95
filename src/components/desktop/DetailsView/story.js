import { h } from "preact";
import { storiesOf } from "@storybook/react";
import DetailsView from ".";
import FileThumbnail from "../filethumbnail";
let i = 0;
storiesOf("Components/Desktop/DetailsView", module)
  .add("icons", () => {
    const icons = ["(C:)", "My Documents", "Program Files", "Windows"].map(
      label => ({
        label,
        size: i++ + "mb",
        date: Date.now()
      })
    );
    return (
      <DetailsView
        items={icons}
        columns={["size", "date"]}
        onClick={e => console.log(e)}
      />
    );
  })
  .add("icons selected", () => {
    const icons = ["(C:)", "My Documents", "Program Files", "Windows"].map(
      label => ({
        label,
        selected: true,
        size: i++ + "mb",
        date: Date.now()
      })
    );
    return (
      <DetailsView
        items={icons}
        columns={["size", "date"]}
        onClick={e => console.log(e)}
      />
    );
  })
  .add("Custom icons", () => {
    const icons = ["(C:)", "My Documents", "Program Files", "Windows"].map(
      label => ({ label, size: i++ + "mb", date: Date.now() })
    );
    return (
      <DetailsView
        items={icons}
        columns={["size", "date"]}
        onClick={e => console.log(e)}
      />
    );
  });
