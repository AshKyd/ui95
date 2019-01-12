import { h } from "preact";
import { storiesOf } from "@storybook/react";
import Blog from "./index.js";

storiesOf("App/Blog", module).add("Blog style", () => (
  <Blog
    title="Blog post"
    error={new Error("an error")}
    onFocus={() => {}}
    onClose={() => {}}
  >
    <header class="entry-header">
      <h1 class="entry-title">
        <a href="2018-09-22/amsterdam/" rel="permalink">
          Hey, I moved to Europe
        </a>
      </h1>

      <div class="entry-meta">
        <span class="sep">Posted </span>

        <a href="https://ash.ms/2018-09-22/amsterdam/" rel="bookmark">
          <time
            class="entry-date"
            datetime="2018-09-22T00:22:00.000Z"
            itemprop="datePublished"
          >
            2018-09-22
          </time>
        </a>
      </div>
    </header>

    <div class="article-entry entry-content" itemprop="articleBody">
      <p>It happened almost by accident that I moved overseas.</p>
      <p>
        I’ve always had it in the back of my head that I’d like to work
        internationally at some point in my life. Just a year ago I was honoured
        to be invited to speak at a conference in Amsterdam, and It was my first
        time leaving the Asia/Pacific region. It was a total blast and was
        really nice to make new friends around the world, but it kinda set a few
        ideas going in my head.
      </p>
      <p>
        So when I saw an off-hand remark from a school friend about an
        opportunity to work in the Netherlands, I followed it up nonchalantly.
        This started a chain reaction that ended with me selling all my stuff,
        renting out my apartment, and moving to another country with little more
        than a general sense of confidence things would work out.
      </p>
      <p>
        So here I am. I’m in bed at my temporary hotel, having just got home
        from a night of drinking with my surprisingly international (and
        incredibly boozy) coworkers, after my third week at the company. Things
        have generally been pretty good.
      </p>
      <p>
        I’m still working my way through a bunch of issues (currently trying to
        get Suncorp Bank to let me make a damn bank transfer), but after three
        weeks things are generally looking good. I am especially excited to move
        into my new apartment at the start of next month, so it will be nice to
        have a place to call home again.
      </p>
      <p>
        There’s no set plan for what I’m doing, but from here I am looking
        forward to making new friends, getting to know the city, and going even
        further in my free time to explore the rest of Europe.
      </p>
      <div class="videoWrapper">
        <iframe
          src="https://www.youtube-nocookie.com/embed/i65vlKNMmxE"
          allow="autoplay; encrypted-media"
          allowfullscreen=""
          width="560"
          height="315"
          frameborder="0"
        />
      </div>

      <p>
        To make things a little more fun I’ve been trying to keep a video blog.
        You can{" "}
        <a href="https://www.youtube.com/channel/UCw_l1G_aI_-dO3xgUJvXehA">
          keep updated by subscribing on youtube
        </a>{" "}
        if you’re interested in that sort of thing.
      </p>
    </div>
  </Blog>
));
