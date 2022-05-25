import { h } from "preact";
import { useState } from "preact/hooks";
import Wizard from ".";

function generateStep() {
  return {
    mode: "update",
    content: "Hello again, this is a content update.",
    wizardOptions: {},
    buttonText: "Finish",
  };
}

const wizardOptions = {
  "I would like to find out more about the thing": generateStep(),
  "I would like to play a game": generateStep(),
  "No thanks, I will explore by myself": generateStep(),
};

export default {
  title: "App/Wizard",
};

export const WizardStyle = () => (
  <Wizard
    title="Wizard post"
    image="http://placekitten.com/100/300"
    wizardOptions={wizardOptions}
    content={"Hello world, what's going on today?<br><br>"}
  >
    Test
  </Wizard>
);

WizardStyle.story = {
  name: "Wizard style",
};

export const WithLocalstorageToOnlyShowItOnce = () => {
  const [status, setStatus] = useState("shown");

  if (status !== "shown") {
    return "status: " + status;
  }

  return (
    <Wizard
      title="Wizard post"
      image="http://placekitten.com/100/300"
      wizardOptions={wizardOptions}
      content={"Hello world, what's going on today?<br><br>"}
      firstRun={true}
      localStorageKey="myNeyName"
      wmProps={{
        onClose: () => setStatus("hidden"),
      }}
    >
      Test
    </Wizard>
  );
};

WithLocalstorageToOnlyShowItOnce.story = {
  name: "with localstorage to only show it once",
};
