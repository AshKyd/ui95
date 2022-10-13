import { h } from "preact";
import AboutDialog from ".";
import world from "./world.gif";
import ScrollableContainer from "../../components/ScrollableContainer/";

export default {
  title: "App/AboutDialog",
};

export const Main = () => (
  <AboutDialog
    title="About thing"
    name="My app"
    subtext="Copyright (c) 2022 Ash Kyd"
    image={world}
    imageAlt="The world in pixel art"
  >
    <ScrollableContainer style={{ height: "100%", minHeight: "100px" }}>
      The MIT License (MIT)
      <br />
      <br />
      Copyright (c) 2015 Jérémy Heleine
      <br />
      Copyright (c) 2016-2020 Damien Sorel
      <br />
      <br />
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the "Software"),
      to deal in the Software without restriction, including without limitation
      the rights to use, copy, modify, merge, publish, distribute, sublicense,
      and/or sell copies of the Software, and to permit persons to whom the
      Software is furnished to do so, subject to the following conditions:
      <br />
      <br />
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
      <br />
      <br />
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
      THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
      DEALINGS IN THE SOFTWARE.
    </ScrollableContainer>
  </AboutDialog>
);
