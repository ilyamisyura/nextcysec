export type Detail = {
  title: string;
  description: string;
};

export type Artifact = {
  hook: string;
  scenario: string;
  demand: Detail[]; // attacker wants
  detection: Detail[]; // how to spot it
  actions: Detail[]; // what users might do (risk)
  measures: Detail[]; // what to do instead
  area_tag: string; // e.g., "everyone", "accounting"
  badges: string[]; // e.g., ["email", "web", "phone"]
  language: string; // e.g., "de-CH"
};

export type Topic = {
  id: string; // e.g., "phishing"
  name: string; // e.g., "Phishing"
  items: Artifact[]; // one or more versions for this topic
};
