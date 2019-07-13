import { h, render, Component } from "preact";
import "./style.css";
import Text from "../../../components/text";

function Guide({ playlist, playItems, width }) {
  return (
    <div
      class={`ui95-mpguide ui95-mpguide--${width < 400 ? "narrow" : "wide"}`}
    >
      <Text size="13">
        <div class="ui95-mediaplayer__guide-playlist">
          <h2>{playlist.title}</h2>
          <p>{playlist.description}</p>
          <div>
            <a
              href={`https://www.youtube.com/playlist?list=${playlist.id}`}
              onClick={e =>
                playItems("playlistId", playlist.id) && e.preventDefault()
              }
            >
              <span class="ui95-mpguide__bullet" /> Play all
            </a>
          </div>
          <div>
            <a href={`https://www.youtube.com/playlist?list=${playlist.id}`}>
              <span class="ui95-mpguide__bullet" /> Open on Youtube
            </a>
          </div>
          <ul>
            {playlist.videos.map(video => (
              <li>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}&list=${playlist.id}`}
                  onClick={e =>
                    playItems("videoId", video.id) && e.preventDefault()
                  }
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt=""
                  />
                  {video.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Text>
    </div>
  );
}

export default Guide;
