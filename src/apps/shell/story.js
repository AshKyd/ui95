import { h } from "preact";
import Shell from ".";

export default {
  title: "App/Shell",
};

export const NoConfiguration = () => <Shell />;

NoConfiguration.story = {
  name: "No configuration",
};

export const MockedStart = () => (
  <Shell
    startMenu={Array.from({ length: 10 }).map((no, i) => ({
      text: "Test " + i,
      items:
        i % 3 === 0 &&
        Array.from({ length: 10 }).map((no, i) => ({
          text: "Test " + i,
        })),
    }))}
  />
);

MockedStart.story = {
  name: "Mocked start",
};
