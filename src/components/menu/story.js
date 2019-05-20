import { h, Component } from "preact";
import { storiesOf } from "@storybook/react";
import Menu from "./index.js";

const items = [
  { text: "Open" },
  { text: "Explore", disabled: true },
  { text: "Search...", disabled: true },
  { text: "Add to archive..." },
  "divider",
  {
    text: "Send To",
    items: [
      { text: "3 1/4 Floppy (A:)", icon: "default" },
      { text: "Desktop (Create Shortcut)", icon: "default" },
      {
        text: "Mail recipient",
        icon: "default",
        items: [
          { text: "3 1/4 Floppy (A:)", icon: "default" },
          { text: "Desktop (Create Shortcut)", icon: "default" },
          { text: "Mail recipient", icon: "default" },
          { text: "My Documents", icon: "default" }
        ]
      },
      { text: "My Documents", icon: "default" }
    ]
  },
  "divider",
  { text: "Cut" },
  { text: "Copy" },
  "divider",
  { text: "Create Shortcut" },
  { text: "Delete" },
  { text: "Rename" },
  "divider",
  { text: "Properties" }
];

function makeStory(props) {
  return class Story extends Component {
    constructor() {
      super();
      this.state = { open: false };
    }
    render() {
      return (
        <div>
          <button
            ref={el => (this.el = el)}
            onClick={() => this.setState({ open: true })}
          >
            Click me
          </button>
          {this.state.open && (
            <Menu
              onClose={() => this.setState({ open: false })}
              attachTo={this.el}
              {...props}
            />
          )}
        </div>
      );
    }
  };
}

storiesOf("Components/Menu", module)
  .add("attachTo top", () => {
    const Story = makeStory({
      items: items,
      attachDirection: "top"
    });
    return <Story />;
  })
  .add("AttachTo left", () => {
    const Story = makeStory({
      items: items,
      attachDirection: "left"
    });
    return <Story />;
  })
  .add("attachTo bottom", () => {
    const Story = makeStory({
      items: items,
      attachDirection: "bottom"
    });
    return (
      <div>
        <style>{`button{position:absolute;left:0;bottom:0;}`}</style>
        <Story />
      </div>
    );
  });
