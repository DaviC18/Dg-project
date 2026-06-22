/** biome-ignore-all assist/source/organizeImports: <> */
import { Home, Library, BrainCircuit } from "lucide-react";

const navLinksDesktop = [
  {
    id: "home",
    title: "Home",
    link: "/",
  },
  {
    id: "about",
    title: "About",
    link: "/about",
  },
  {
    id: "ia",
    title: "IA",
    link: "/ia",
  },
  {
    id: "list",
    title: "List",
    link: "/list"
  }
];

const navLinksMobile = [
  {
    id: "home",
    title: "Home",
    link: "/",
    icon: Home,
  },
  {
    id: "about",
    title: "About",
    link: "/about",
    icon: Library,
  },
  {
    id: "ia",
    title: "IA",
    link: "/ia",
    icon: BrainCircuit,
  },
];

const steps = [
  {
    title: "1. Patient intake",
    text: "The patient fills out the symptom form with history, duration, and context.",
  },
  {
    title: "2. Secure storage",
    text: "The backend validates the data and stores the form with the authenticated user.",
  },
  {
    title: "3. AI analysis",
    text: "Gemini reads the form and produces a structured pre-diagnosis in JSON.",
  },
  {
    title: "4. Clinical review",
    text: "The result is used only as support. The doctor keeps the final decision.",
  },
];

const cards = [
  {
    title: "Input",
    text: "The patient form is sent to the backend after authentication and consent validation.",
  },
  {
    title: "Processing",
    text: "The backend looks up the form, sends the clinical data to Gemini, and waits for a structured response.",
  },
  {
    title: "Output",
    text: "The IA returns summary, alerts, suggested exams, clinical suggestions, and observations.",
  },
];

const details = [
  {
    title: "Structured data",
    text: "Forms arrive clean and ready for analysis.",
  },
  {
    title: "AI support",
    text: "Gemini generates a consistent pre-diagnosis.",
  },
  {
    title: "Doctor-first",
    text: "The final decision always stays with the physician.",
  },
]
export { navLinksDesktop,navLinksMobile, steps, cards, details };
