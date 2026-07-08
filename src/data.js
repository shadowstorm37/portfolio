// ─────────────────────────────────────────────────────────────
// Add new projects by copying a block and editing the fields.
// `featured: true` gives a project the large tile in the grid.
// ─────────────────────────────────────────────────────────────

export const projects = [
  {
    title: "playlist-builder",
    tagline: "Plain-English vibes → Spotify playlists",
    description:
      "A Python/Streamlit tool that turns a plain-English vibe description into a curated Spotify playlist, using the Gemini API as a taste model to replace Spotify's deprecated recommendation endpoints.",
    stack: ["Python", "Streamlit", "Gemini API", "Spotify API"],
    link: "https://github.com/shadowstorm37",
    year: "2026",
    featured: true,
  },
  // ── copy the block below to add a project ──
  // {
  //   title: "",
  //   tagline: "",
  //   description: "",
  //   stack: [],
  //   link: "",
  //   year: "",
  //   featured: false,
  // },
];

export const currentlyBuilding = {
  name: "Sequax",
  tagline: "Top-down survival horror, built in Unity",
  description:
    "A sound-and-light asymmetry game — manage noise, manage light, stay hidden from something that's hunting by ear.",
  stack: ["Unity", "C#"],
  deadline: "2026-07-30",
};

export const stack = [
  "TypeScript",
  "React",
  "Python",
  "Unity / C#",
  "Node.js",
  "PostgreSQL",
];

export const social = {
  github: "https://github.com/shadowstorm37",
  linkedin: "https://www.linkedin.com/in/james-barnett-4b0506224/",
  email: "jcbarnett37@gmail.com",
};