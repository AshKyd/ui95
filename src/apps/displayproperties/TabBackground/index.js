import { h, render, Component } from "preact";
import "./style.css";
import Text from "../../../components/text";
import Button from "../../../components/button";
import Select from "../../../components/forms/select";
import ColorPicker from "../../../components/forms/colorpicker";
import ScrollableContainer from "../../../components/scrollablecontainer";
import DetailsView from "../../../components/desktop/DetailsView";
import DisplayPreview from "../DisplayPreview";
import wallpapers from "./wallpapers";
const icons = Object.keys(wallpapers).map(label => ({ label, icon: "paint" }));
icons.unshift({ label: "None", icon: "cancel" });

export default function DisplayProperties({ styles, value, onChange }) {
  return (
    <div class="ui95-tab-background">
      <DisplayPreview
        image={value.wallpaper}
        style={styles[value.style]}
        backgroundColor={value.backgroundColor}
      />
      <div class="ui95-tab-background__tools">
        <div class="ui95-tab-background__tools-left">
          <ScrollableContainer style={{ height: 125 }}>
            <DetailsView
              items={icons}
              header={false}
              shouldSort={false}
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
            style={{ marginBottom: 8 }}
          />
          <label
            for="background-color"
            style={{ display: "block", marginBottom: 4 }}
          >
            <Text>Desktop color:</Text>
          </label>
          <ColorPicker
            value={value.backgroundColor}
            onChange={backgroundColor =>
              onChange({ ...value, backgroundColor })
            }
          />
        </div>
      </div>
    </div>
  );
}
