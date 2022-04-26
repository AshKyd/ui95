import { h } from "preact";
import { storiesOf } from "@storybook/react";
import FormBuilder from ".";

storiesOf("Components/FormBuilder", module).add("Main", () => (
  <FormBuilder
    form={{
      target: "_blank",
      fields: [
        {
          id: "intro",
          component: "Text",
          children: (
            <p>
              Hi, this is a standard text block! You can put{" "}
              <strong>JSX</strong> in here if you like.
            </p>
          ),
        },
        {
          id: "color",
          component: "ColorPicker",
          fieldTitle: "Favourite colour",
        },
        {
          id: "genre",
          component: "Radio",
          fieldTitle: "Favourite genre",
          values: {
            Metal: {},
            Pop: {},
            Jazz: {},
          },
        },
        {
          id: "email",
          component: "Input",
          fieldTitle: "Email",
        },
        [
          { id: "privacy", component: "Text", children: "powered by mailkimp" },
          {
            id: "submit",
            component: "Button",
            children: "Sign up!",
          },
        ],
      ],
    }}
  />
));
