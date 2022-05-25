import { h } from "preact";
import MenuItem from ".";

export default {
  title: "Components/Menu/MenuItem",
};

export const Divider = () => <MenuItem item="divider" />;

Divider.story = {
  name: "divider",
};

export const AppProps = () => (
  <MenuItem
    item={{
      text: "Launch the app",
      link: "https://example.org/",
      appProps: {
        app: "foo",
      },
    }}
  />
);

AppProps.story = {
  name: "appProps",
};

export const WithAnIcon = () => (
  <MenuItem
    item={{
      icon: "default",
      text: "Launch the app",
      link: "https://example.org/",
      appProps: {
        app: "foo",
      },
    }}
  />
);

WithAnIcon.story = {
  name: "with an icon",
};
