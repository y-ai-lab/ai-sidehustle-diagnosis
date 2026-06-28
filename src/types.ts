export type ResultType = 'writing' | 'creative' | 'tool' | 'research';

export type Scores = Record<ResultType, number>;

export type Option = {
  label: string;
  description?: string;
  scores: Partial<Scores>;
};

export type Question = {
  id: string;
  title: string;
  subtitle?: string;
  options: Option[];
};

export type ResultContent = {
  type: ResultType;
  title: string;
  tagline: string;
  strengths: string[];
  weaknesses: string[];
  suited: string[];
  unsuited: string[];
  firstSteps: string[];
  monetizationRoute: string[];
  firstProductIdeas: string[];
  roadmap7Days: string[];
  goalAfter30Days: string;
  goalAfter30DaysNote: string;
  cautions: string[];
  aiTools: string[];
  toolGuidance: string[];
};

export type CtaContent = {
  title: string;
  description: string;
  buttonLabel: string;
  pendingLabel: string;
  pendingMessage: string;
  notePrompt: string;
  xPrompt: string;
  url?: string;
};

export type RoadmapPhase = {
  period: string;
  title: string;
  actions: string[];
};

export type RoadmapContent = {
  type: ResultType;
  goal: string;
  phases: RoadmapPhase[];
};

export type ShareContent = {
  siteName: string;
  messageTemplate: string;
  hashtags: string[];
  siteUrl?: string;
};
