// ─────────────────────────────────────────────────────────────
// Add new projects by copying a block and editing the fields.
// `featured: true` gives a project the large tile in the grid.
// ─────────────────────────────────────────────────────────────

export const projects = [
  {
    title: "playlist-builder",
    tagline: "Turning vibes into Spotify playlists",
    description:
      "A Python/Streamlit tool that turns a written vibe description into a curated Spotify playlist, using the Gemini API as a taste model to replace Spotify's deprecated recommendation endpoints.",
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

export const buildingProjects = [
  {
    name: "Sequax",
    tagline: "Top-down survival horror, built in Unity",
    description:
      "A Darkwood style, top-down horror game where you manage noise, manage light, stay hidden from something that's hunting by ear.",
    stack: ["Unity", "C#"],
    deadline: "2026-07-30",
  },
    
   {
     name: "template",
     tagline: "making sure carousel works",
     description: "carousel please work",
     stack: ["JavaScript"],
     deadline: "2026-07-10",
   },
  // ── copy the block below to add another in-progress project ──
  // {
  //   name: "",
  //   tagline: "",
  //   description: "",
  //   stack: [],
  //   deadline: "YYYY-MM-DD",
  // },
];

export const stack = [
  "Python",
  "React",
  "JavaScript",
  "C#",
  "Node.js",
  "SQL",
];

export const social = {
  github: "https://github.com/shadowstorm37",
  linkedin: "https://www.linkedin.com/in/james-barnett-4b0506224/",
  email: "jcbarnett37@gmail.com",
};