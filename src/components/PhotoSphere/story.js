import { h } from "preact";
import PhotoSphere from ".";
import macleayUrl from "./examples/macleay.jpg";

export default {
  title: "Components/PhotoSphere",
};

console.log(macleayUrl);

export const Main = () => <PhotoSphere src={macleayUrl} ratio={2 / 1} />;

export const ExplicitSize = () => (
  <PhotoSphere src={macleayUrl} width="50%" height={240} />
);
