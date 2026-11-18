import Image from "next/image";
import Link from "next/link";
import type { VideoThumbnail } from "@/app/lib/interfaces";
import SplitTitle, { toLines } from "@/app/components/SplitTitle";
import Footer from "@/app/components/Footer";

const pad = (n: number) => String(n).padStart(2, "0");

export default function FilmDetailContent({
  video,
  nextFilm,
}: {
  video: VideoThumbnail;
  nextFilm: VideoThumbnail;
}) {
  const chapters = video.images.filter((img) => img.path);

  return (
    <>
      <article>
        <header className="f-hero">
          <div className="bg">
            <Image src={video.cover} alt={`Still from ${video.alt}`} fill sizes="100vw" priority />
          </div>
          <div className="wrap">
            {video.laurel && (
              <Image
                className="f-laurel"
                src={video.laurel}
                alt={video.festivals?.find((f) => f.award === "Winner")?.name ?? "Festival laurel"}
                width={1122}
                height={508}
              />
            )}
            <span className="mono" style={{ color: "var(--sun)" }}>{video.genre}</span>
            <SplitTitle lines={toLines(video.alt)} />
            <div className="f-meta">
              <dl className="mono">
                <div><dt>Released</dt><dd>{video.dateTaken}</dd></div>
                <div><dt>Location</dt><dd>{video.place}</dd></div>
                <div><dt>Director</dt><dd>Lorenz Naegele</dd></div>
                {video.externalLink && (
                  <div>
                    <dt>Featuring</dt>
                    <dd>
                      <a href={video.externalLink.url} target="_blank" rel="noopener noreferrer">
                        {video.externalLink.label} ↗
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
              {video.ytLink && (
                <a className="cta" href={video.ytLink} target="_blank" rel="noopener noreferrer">
                  <span className="rec" aria-hidden="true" />
                  Watch on YouTube
                  <span className="arr" aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </header>

        <section className="f-intro wrap">
          <p className="rv">{video.description}</p>
          {video.festivals && video.festivals.length > 0 && (
            <div className="fests rv">
              <span className="mono">Festivals</span>
              <ul>
                {video.festivals.map((f) => (
                  <li key={f.name}>
                    <span className="mono">{f.award}</span>
                    {f.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {chapters.length > 0 && (
          <section className="chapters wrap" aria-label="Behind the scenes">
            {chapters.map((img, k) => (
              <div className="ch" key={img.path}>
                <figure className="rv">
                  <Image
                    src={img.path!}
                    alt={`Behind the scenes of ${video.alt}, part ${k + 1}`}
                    width={1600}
                    height={900}
                    sizes="(max-width: 860px) 100vw, 60vw"
                  />
                </figure>
                {img.description && (
                  <div className="txt rv">
                    <span className="n mono">Behind the scenes · {pad(k + 1)} / {pad(chapters.length)}</span>
                    <p>{img.description}</p>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        <Link className="next" href={`/video/${nextFilm.link}`} data-cursor="Next">
          <div className="wrap">
            <span className="mono">Next film</span>
            <h2>{nextFilm.alt} →</h2>
          </div>
        </Link>
      </article>
      <Footer />
    </>
  );
}
