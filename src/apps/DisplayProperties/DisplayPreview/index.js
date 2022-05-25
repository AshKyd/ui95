import { h, render, Component } from "preact";
import "./style.css";

export default function DisplayPreview({ image, style, backgroundColor }) {
  console.log({ image, style });
  return (
    <div class="ui95-display-preview">
      <div
        class="ui95-display-preview__preview"
        style={{ ...style, backgroundImage: `url(${image})`, backgroundColor }}
      />
      <svg viewbox="0 0 114 110">
        <rect x="0" y="0" width="114" height="89" fill="var(--gray)" />
        <rect x="0" y="0" width="113" height="1" fill="var(--white)" />
        <rect x="0" y="0" width="1" height="89" fill="var(--white)" />
        <rect x="113" y="0" width="1" height="89" fill="var(--black)" />
        <rect x="112" y="1" width="1" height="89" fill="var(--grayDark)" />
        <rect x="1" y="88" width="112" height="1" fill="var(--grayDark)" />
        <rect x="0" y="89" width="114" height="1" fill="var(--black)" />

        {/* screen */}
        <rect x="8" y="8" width="97" height="71" fill="var(--grayDark)" />
        <rect x="9" y="9" width="95" height="69" fill="var(--black)" />
        <rect
          x="10"
          y="10"
          width="94"
          height="68"
          fill="var(--color-primary)"
        />
        <rect x="9" y="78" width="96" height="1" fill="var(--white)" />
        <rect x="104" y="9" width="1" height="70" fill="var(--white)" />

        {/* indicator */}
        <rect x="100" y="82" width="4" height="1" fill="#008f00" />
        <rect x="100" y="83" width="4" height="1" fill="#00f900" />

        {/* base */}
        <rect x="13" y="90" width="88" height="7" fill="var(--black)" />
        <rect x="13" y="90" width="87" height="6" fill="var(--grayDark)" />
        <rect x="13" y="93" width="87" height="2" fill="var(--gray)" />
        <rect x="13" y="93" width="1" height="3" fill="var(--white)" />

        <rect x="34" y="90" width="1" height="3" fill="var(--black)" />
        <rect x="35" y="90" width="1" height="3" fill="var(--grayLight)" />
        <rect x="78" y="90" width="1" height="3" fill="var(--black)" />
        <rect x="79" y="90" width="1" height="3" fill="var(--grayLight)" />

        <rect x="34" y="93" width="1" height="2" fill="var(--grayDark)" />
        <rect x="35" y="93" width="1" height="2" fill="var(--white)" />
        <rect x="78" y="93" width="1" height="2" fill="var(--grayDark)" />
        <rect x="79" y="93" width="1" height="2" fill="var(--white)" />

        {/* Stand */}
        <rect x="41" y="101" width="2" height="3" fill="var(--white)" />
        <rect x="43" y="97" width="28" height="7" fill="var(--gray)" />
        <rect x="71" y="101" width="1" height="3" fill="var(--grayDark)" />
        <rect x="72" y="101" width="1" height="3" fill="var(--black)" />

        {/* Base */}
        <rect x="21" y="104" width="72" height="1" fill="var(--white)" />
        <rect x="19" y="106" width="76" height="4" fill="var(--black)" />
        <rect x="20" y="105" width="74" height="4" fill="var(--grayDark)" />
        <rect x="21" y="105" width="72" height="3" fill="var(--gray)" />
        <rect x="20" y="105" width="1" height="3" fill="var(--white)" />
        <rect x="19" y="106" width="1" height="3" fill="var(--white)" />

        {/* Curvature */}
        <rect x="38" y="97" width="38" height="2" fill="var(--gray)" />

        <rect x="34" y="97" width="2" height="1" fill="var(--black)" />
        <rect x="36" y="97" width="2" height="1" fill="var(--grayDark)" />

        <rect x="36" y="98" width="2" height="1" fill="var(--black)" />
        <rect x="38" y="98" width="3" height="1" fill="var(--grayDark)" />

        <rect x="38" y="99" width="3" height="1" fill="var(--black)" />
        <rect x="41" y="99" width="4" height="1" fill="var(--grayDark)" />

        <rect x="41" y="100" width="4" height="1" fill="var(--black)" />
        <rect x="45" y="100" width="5" height="1" fill="var(--grayDark)" />

        <rect x="45" y="101" width="5" height="1" fill="var(--black)" />
        <rect x="50" y="101" width="14" height="1" fill="var(--grayDark)" />

        <rect x="50" y="102" width="14" height="1" fill="var(--black)" />

        <rect x="64" y="101" width="5" height="1" fill="var(--black)" />
        <rect x="64" y="100" width="5" height="1" fill="var(--grayDark)" />

        <rect x="69" y="100" width="4" height="1" fill="var(--black)" />
        <rect x="69" y="99" width="4" height="1" fill="var(--grayDark)" />

        <rect x="73" y="99" width="3" height="1" fill="var(--black)" />
        <rect x="73" y="98" width="3" height="1" fill="var(--grayDark)" />

        <rect x="76" y="98" width="2" height="1" fill="var(--black)" />
        <rect x="76" y="97" width="2" height="1" fill="var(--grayDark)" />

        <rect x="78" y="97" width="2" height="1" fill="var(--black)" />
      </svg>
    </div>
  );
}
