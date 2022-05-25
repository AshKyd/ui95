import { h } from "preact";
import FormBuilderWindow from ".";

export default {
  title: "App/FormBuilderWindow",
};

export const Main = () => (
  <FormBuilderWindow
    form={{
      target: "_blank",
      action: "https://ash.us4.list-manage.com/subscribe/post",
      method: "POST",
      fields: [
        {
          id: "intro",
          component: "Text",
          type: "div",
          html: `<p>Sign up to my newsletter for:</p>
          <p>
            <div>📀 new videos! 🪶 blog posts you might like! </div>
            <div>💌 the occasional little update from me!</div>
          </p>
          <input type="hidden" name="u" value="d105d8b8b9b62ea519e7e6f97">
          <input type="hidden" name="id" value="61867ab181">
          <!-- people should not fill these in and expect good things -->
          <div style="display:none" class="field-shift" aria-label="Please leave the following three fields empty" aria-hidden="true">
        <label for="b_name">Name: </label>
        <input type="text" name="b_name" tabindex="-1" value="" placeholder="Freddie" id="b_name">

        <label for="b_email">Email: </label>
        <input type="email" name="b_email" tabindex="-1" value="" placeholder="youremail@gmail.com" id="b_email">

        <label for="b_comment">Comment: </label>
        <textarea name="b_comment" tabindex="-1" placeholder="Please comment" id="b_comment"></textarea>
        <input type="hidden" name="ht" value="fd23df3e45be8c608032c3822b52fc4cc4aa779c:MTY1MDk1OTkyOC42Mjc3">
        <input type="hidden" name="mc_signupsource" value="hosted">
    </div>
          `,
        },
        { id: "divider", component: "Divider", classNames: "horizontal" },
        {
          component: "Input",
          fieldTitle: "Your email address:",
          type: "email",
          name: "MERGE0",
          id: "MERGE0",
        },
        { id: "divider", component: "Divider", classNames: "horizontal" },
        [
          {
            id: "privacy",
            component: "Text",
            type: "span",
            children: "powered by mailkimp",
            fieldStyle: {
              flex: 1,
              color: "var(--grayDark)",
              textShadow: "0 1px 0 var(--white)",
            },
          },
          {
            id: "submit",
            component: "Button",
            children: "Sign up!",
            value: "Subscribe",
            style: "height:20px;width:80px;display:block;margin:0 0 0 auto;",
          },
        ],
      ],
    }}
  />
);
