import { h } from "preact";
import { storiesOf } from "@storybook/react";
import TabDialog from ".";

storiesOf("App/Contact", module).add("Main", () => (
  <TabDialog
    bio={`
      <p>Australian in Europe. Webdev, sometimes speaker, gamedev, vlogger.</p>
      <p>I'm a full stack JS developer, originally from Brisbane, Australia but recently moved to Amsterdam to enjoy the famed Dutch weather. </p>
      <p>I enjoy speaking and volunteering my time in the dev community, producing the occasional video blog, and I'm more often than not coding in my spare time.</p>
    `}
    contact={{
      name: "Ash Kyd",
      image:
        "https://www.gravatar.com/avatar/24073d0e70921eda1a2ae25e2cceb057?s=64",
      items: [
        {
          text: "Email",
          link: "mailto:ash@kyd.com.au",
          value: "ash@kyd.com.au"
        },
        {
          text: "Twitter",
          link: "https://twitter.com/ashkyd",
          value: "@ashkyd"
        },
        {
          text: "Linkedin",
          link: "https://www.linkedin.com/in/ashkyd/",
          value: "www.linkedin.com/in/ashkyd/"
        },
        {
          text: "Facebook",
          link: "https://www.facebook.com/ashkydkthx",
          value: "ashkydkthx"
        },
        {
          text: "Last.fm",
          link: "https://www.last.fm/user/2_",
          value: "www.last.fm/user/2_"
        },
        {
          text: "Github",
          link: "https://github.com/ashkyd",
          value: "ashkyd"
        }
      ]
    }}
  />
));
