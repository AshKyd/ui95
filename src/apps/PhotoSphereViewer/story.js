import { h } from "preact";
import PhotoSphereViewer from ".";
import macleayUrl from "../../components/PhotoSphere/examples/macleay.jpg";

export default {
  title: "App/PhotoSphereViewer",
};

export const Main = () => <PhotoSphereViewer src={macleayUrl} />;
