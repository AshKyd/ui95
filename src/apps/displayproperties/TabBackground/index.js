import { h, render, Component } from "preact";
import "./style.less";
import Text from "../../../components/text";
import Button from "../../../components/button";
import Select from "../../../components/forms/select";
import ScrollableContainer from "../../../components/scrollablecontainer";
import DetailsView from "../../../components/desktop/DetailsView";
import DisplayPreview from "../DisplayPreview";
import wallpapers from "./wallpapers";
const icons = Object.keys(wallpapers).map(label => ({ label, icon: "paint" }));
icons.unshift({ label: "None", icon: "none" });

export default function DisplayProperties({ styles, value, onChange }) {
  console.log({ value });
  return (
    <div class="ui95-tab-background">
      <DisplayPreview image={value.wallpaper} style={styles[value.style]} />
      <div class="ui95-tab-background__tools">
        <div class="ui95-tab-background__tools-left">
          <ScrollableContainer style={{ height: 110 }}>
            <DetailsView
              items={icons}
              header={false}
              onClick={({ label }) =>
                onChange({ ...value, wallpaper: wallpapers[label] })
              }
            />
          </ScrollableContainer>
        </div>
        <div class="ui95-tab-background__tools-right">
          <Button style={{ width: 75, height: 22 }}>Browse</Button>
          <br />
          <label
            for="picture-style"
            style={{ display: "block", marginBottom: 4 }}
          >
            <Text>Picture display:</Text>
          </label>
          <Select
            name="picture-style"
            width="75"
            onChange={e => onChange({ ...value, style: e.target.value })}
            value={value.style}
            options={Object.keys(styles)}
          />
        </div>
      </div>
    </div>
  );
}
