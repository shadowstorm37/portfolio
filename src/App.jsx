import { useState, useEffect, useRef } from "react";
import { projects, stack, social, buildingProjects } from "./data";
import "./App.css";

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });
  const date = now.toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });
  return (
    <div className="clock-inner">
      <span className="clock-label">Local time</span>
      <span className="clock-time">{time}</span>
      <span className="clock-date">{date}</span>
    </div>
  );
}

// ── Synthesized hover tick (no audio file, generated in-browser) ──
let audioCtx;
let soundEnabled = true;
function getAudioCtx() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    audioCtx = new Ctx();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playTick(pitch = 1) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioCtx();
    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(720 * pitch, t0);
    osc.frequency.exponentialRampToValueAtTime(420 * pitch, t0 + 0.05);
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(0.05, t0 + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.09);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.1);
  } catch {
    // audio unsupported or blocked — fail silently
  }
}

function useSpotlight(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, [ref]);
}

function Tile({ className = "", children, spotlight = false, sound = true, pitch = 1 }) {
  const ref = useRef(null);
  useSpotlight(spotlight ? ref : { current: null });
  return (
    <div
      ref={ref}
      className={`tile ${spotlight ? "tile--spot" : ""} ${className}`}
      onMouseEnter={sound ? () => playTick(pitch) : undefined}
    >
      {children}
    </div>
  );
}

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7 0-.7 0-.7 1.2 0 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M20.4 3H3.6C3 3 2.5 3.5 2.5 4.1v15.8c0 .6.5 1.1 1.1 1.1h16.8c.6 0 1.1-.5 1.1-1.1V4.1C21.5 3.5 21 3 20.4 3zM8.3 18.3H5.6V9.5h2.7v8.8zM6.9 8.3a1.6 1.6 0 110-3.2 1.6 1.6 0 010 3.2zm11.4 10h-2.7v-4.3c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.3v4.4h-2.7V9.5h2.6v1.2h.1c.4-.7 1.2-1.4 2.5-1.4 2.7 0 3.2 1.8 3.2 4.1v4.9z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M7 17L17 7M17 7H8M17 7v9" />
  </svg>
);

function SoundToggle() {
  const [on, setOn] = useState(true);
  return (
    <button
      className="sound-toggle"
      onClick={() => {
        soundEnabled = !on;
        setOn(!on);
      }}
      aria-pressed={on}
      aria-label={on ? "Mute hover sounds" : "Unmute hover sounds"}
    >
      {on ? "sound on" : "sound off"}
    </button>
  );
}

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function deadlineLabel(dateStr) {
  if (!dateStr || dateStr.trim().toUpperCase() === "NA") {
    return "Undecided";
  }
  return `${daysUntil(dateStr)}d`;
}

function BuildingCarousel() {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  useSpotlight(ref);
  const total = buildingProjects.length;
  const current = buildingProjects[index];

  const go = (dir) => {
    playTick(dir > 0 ? 1.1 : 0.9);
    setIndex((i) => (i + dir + total) % total);
  };

  return (
    <div ref={ref} className="tile tile--spot cell cell--building">
      <div className="section-head">
        <span className="mini-label">Currently building</span>
        <span className="count">{deadlineLabel(current.deadline)}</span>
      </div>
      <h3 className="building-name">{current.name}</h3>
      <p className="building-tagline">{current.tagline}</p>
      <p className="building-desc">{current.description}</p>
      <div className="project-stack">
        {current.stack.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      {total > 1 && (
        <div className="carousel-nav">
          <button
            className="carousel-arrow"
            onClick={() => go(-1)}
            aria-label="Previous project"
          >
            <ChevronLeft />
          </button>
          <span className="carousel-index">
            {index + 1} / {total}
          </span>
          <button
            className="carousel-arrow"
            onClick={() => go(1)}
            aria-label="Next project"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <main className="page">
      <div className="grain" aria-hidden="true" />
      <div className="grid">
        <Tile className="cell cell--hero" spotlight>
          {/*<span className="eyebrow">James Barnett — Software Engineer</span>*/}
          <h1 className="hero-title">
            James Barnett — <em>Software Engineer</em><br />
          </h1>
          <p className="hero-sub">
            Hello, I'm James Barnett, a software developer who works mostly in Python.
            I'm focused on leveraging AI to solve problems I find interesting to stay up
            to date on today's coding environment.
          </p>
          <div className="hero-tags">
            <span className="status-dot" /> Available for work
          </div>
          <ul className="stack-list">
            {stack.map((s) => (
              <li key={s} onMouseEnter={() => playTick(1.2)}>
                {s}
              </li>
            ))}
          </ul>
        </Tile>

        <Tile className="cell cell--clock" spotlight>
          <Clock />
        </Tile>

        <Tile className="cell cell--loc" spotlight>
          <span className="mini-label">Based in</span>
          <span className="mini-value">Orlando, FL</span>
          <span className="mini-foot">United States · EST</span>
        </Tile>

        <Tile className="cell cell--about" spotlight>
          <span className="mini-label">About me</span>
          <p className="about-text">
            When I'm not coding I like to pass my time by playing bass guitar,
            listening to music, playing games, or doing kendo. I like picking up 
            new things fast, and lately that's been learning to build apps that use
            AI.
          </p>
        </Tile>

        <BuildingCarousel />

        <Tile className="cell cell--projects" spotlight>
          <div className="section-head">
            <span className="mini-label">Selected work</span>
            <span className="count">{String(projects.length).padStart(2, "0")}</span>
          </div>
          <div className="project-list">
            {projects.map((p) => (
              <a
                key={p.title}
                className={`project ${p.featured ? "project--featured" : ""}`}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playTick(1.08)}
              >
                <div className="project-top">
                  <h3>{p.title}</h3>
                  <span className="project-year">{p.year}</span>
                </div>
                <p className="project-tagline">{p.tagline}</p>
                <p className="project-desc">{p.description}</p>
                <div className="project-stack">
                  {p.stack.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <span className="project-arrow">
                  View <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </Tile>

        <a
          className="cell cell--gh tile link-tile"
          href={social.github}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => playTick(0.95)}
        >
          <GithubIcon />
          <span>GitHub</span>
          <ArrowIcon />
        </a>
        <a
          className="cell cell--li tile link-tile"
          href={social.linkedin}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => playTick(1.05)}
        >
          <LinkedinIcon />
          <span>LinkedIn</span>
          <ArrowIcon />
        </a>

        <Tile className="cell cell--contact" spotlight>
          <span className="mini-label">Get in touch</span>
          <a
            className="contact-mail"
            href={`mailto:${social.email}`}
            onMouseEnter={() => playTick(1.15)}
          >
            <MailIcon />
            {social.email}
          </a>
          <p className="contact-note">
            Open to a full-time job, collaborations, and interesting problems.
          </p>
        </Tile>
      </div>

      <footer className="footer">
        <span>© {new Date().getFullYear()} James Barnett</span>
        <SoundToggle />
        <span>Built with React</span>
      </footer>
    </main>
  );
}