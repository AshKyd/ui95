import { h, render, Component } from "preact";
import shareLinks from "social-share-links";
import Toolbar from "../";

function activate(link) {
  return () => window.open(shareLinks(link));
}

export default function Share({}) {
  return (
    <Toolbar
      variant="stacked"
      items={[
        { text: "Share" },
        { text: "Facebook", icon: "facebook", onClick: activate("Facebook") },
        { text: "Twitter", icon: "tweet", onClick: activate("Twitter") },
        { text: "LinkedIn", icon: "linkedin", onClick: activate("LinkedIn") },
        { text: "Reddit", icon: "reddit", onClick: activate("Reddit") },
        { text: "WhatsApp", icon: "whatsapp", onClick: activate("WhatsApp") },
        { text: "Email", icon: "email", onClick: activate("Email") }
      ]}
    />
  );
}
