import { h, Component } from "preact";
import { storiesOf } from "@storybook/react";
import Menu from ".";

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
              onClose={app => {
                console.log({ app });
                this.setState({ open: false });
              }}
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
  .add("AttachTo horizontal", () => {
    const Story = makeStory({
      items: items,
      attachDirection: "horizontal"
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
  })
  .add("Start Menu", () => {
    const items = [
      { text: "Windows Update", icon: "default" },
      "divider",
      {
        text: "Programs",
        icon: "default",
        items: Array.from({ length: 10 }).map((no, i) => ({
          text: "Test " + i,
          items: Array.from({ length: 10 }).map((no, i) => ({
            text: "Test " + i
          }))
        }))
      },
      { text: "Documents", icon: "default" },
      { text: "Settings", icon: "default" },
      { text: "Search", icon: "default" },
      { text: "Help", icon: "default" },
      { text: "Run", icon: "default" },
      "divider",
      { text: "Log Off", icon: "default" },
      { text: "Shut Down", icon: "default" }
    ];
    const Story = makeStory({
      className: "large",
      iconSize: 24,
      attachDirection: "bottom",
      branding: { text1: "Windows", text2: "ME" },
      items
    });
    return (
      <div>
        <style>{`button{position:absolute;left:0;bottom:0;}`}</style>
        <Story />
      </div>
    );
  });
