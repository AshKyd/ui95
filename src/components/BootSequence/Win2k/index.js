import { h, render } from "preact";
import "./style.css";

function BootSequenceWin2k({ branding = "", copyright = "", progress = "28" }) {
  return (
    <div class="ui95-boot-sequence">
      <h1 class="ui95-boot-sequence__branding">{branding}</h1>
      <div class="ui95-boot-sequence__footer">
        <label for="ui95-boot-sequence" class="ui95-boot-sequence__label">
          Starting up&hellip;
        </label>
        <progress
          id="ui95-boot-sequence"
          class="ui95-boot-sequence__loader"
          max="100"
          value={progress}
        />
        <p class="ui95-boot-sequence__copyright">{copyright}</p>
      </div>
    </div>
  );
}

export default BootSequenceWin2k;
