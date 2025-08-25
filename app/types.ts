export type Artifact = {
  hook: string;
  scenario: string;
  demand: string[]; // attacker wants
  detection: string[]; // how to spot it
  actions: string[]; // what users might do (risk)
  measures: string[]; // what to do instead
  area_tag: string; // e.g., "everyone", "accounting"
  badges: string[]; // e.g., ["email", "web", "phone"]
  language: string; // e.g., "de-CH"
};

export type Topic = {
  id: string; // e.g., "phishing"
  name: string; // e.g., "Phishing"
  items: Artifact[]; // one or more versions for this topic
};

