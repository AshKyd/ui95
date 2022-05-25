export const menuItems = [
  {
    text: "File",
    items: [
      { text: "Create Shortcut" },
      { text: "Delete" },
      { text: "Rename" },
      { text: "Properties" },
      "divider",
      { text: "My Computer" },
      { text: "Work Offline" },
      { text: "Closer" }
    ]
  },
  {
    text: "Edit",
    items: [
      { text: "Undo", disabled: "true" },
      "divider",
      { text: "Cut" },
      { text: "Copy" },
      { text: "Paste" },
      { text: "Paste Shortcut" },
      { text: "Select All" },
      { text: "Invert Selection" }
    ]
  },
  {
    text: "View",
    items: [
      {
        text: "Toolbars",
        items: [
          { text: "Standard Buttons" },
          { text: "Address Bar" },
          { text: "Links" },
          { text: "Radio" },
          "divider",
          { text: "Text Labels" }
        ]
      },
      { text: "Status Bar" },
      {
        text: "Explorer Bar",
        items: [
          { text: "Search" },
          { text: "Favourites" },
          { text: "History" },
          { text: "Folders" },
          "divider",
          { text: "Tip of the Day" }
        ]
      },
      { text: "as Web Page" },
      { text: "Large Icons" },
      { text: "Small Icons" },
      { text: "List" },
      { text: "Details" },
      {
        text: "Arrange Icons",
        items: [
          { text: "by Drive Letter" },
          { text: "by Type" },
          { text: "by Size" },
          { text: "by Free Space" },
          "divider",
          { text: "Auto-Arrange" }
        ]
      },
      { text: "Line Up Icons" },
      { text: "Refresh" },
      { text: "Folder Options" }
    ]
  },
  {
    text: "Go",
    items: [
      { text: "Back" },
      { text: "Forward" },
      { text: "Up One Level" },
      "divider",
      { text: "Home Page" },
      { text: "Channel Guide" },
      { text: "Search the Web" },
      { text: "Mail" },
      { text: "News" },
      { text: "My Computer" },
      { text: "Address Book" },
      { text: "Internet Call" }
    ]
  }
];

const legacy = {
  Go: {
    Back: {},
    Forward: {},
    "Up One Level": {},
    divider: "divider",
    "Home Page": {},
    "Channel Guide": {},
    "Search the Web": {},
    Mail: {},
    News: {},
    "My Computer": {},
    "Address Book": {},
    "Internet Call": {}
  }
};

export default menuItems;
