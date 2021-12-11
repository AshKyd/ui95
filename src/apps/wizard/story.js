import { h } from "preact";
import { useState } from 'preact/hooks';
import { storiesOf } from "@storybook/react";
import Wizard from ".";

function generateStep() {
  return {
    mode: "update",
    content: "Hello again, this is a content update.",
    wizardOptions: {},
    buttonText: "Finish"
  };
}

const wizardOptions = {
  "I would like to find out more about the thing": generateStep(),
  "I would like to play a game": generateStep(),
  "No thanks, I will explore by myself": generateStep()
};

storiesOf("App/Wizard", module).add("Wizard style", () => (
  <Wizard
    title="Wizard post"
    image="http://placekitten.com/100/300"
    wizardOptions={wizardOptions}
    content={"Hello world, what's going on today?<br><br>"}
  >
    Test
  </Wizard>
)).add("with localstorage to only show it once", () => {
  const [status, setStatus] = useState('shown');

  if(status !== 'shown'){
    return 'status: ' + status;
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
      onClose: () => setStatus('hidden')
    }}
  >
    Test
  </Wizard>);

});
