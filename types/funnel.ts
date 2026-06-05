export type PathwayId =
  | "grc"
  | "soc"
  | "cloud"
  | "pentest"
  | "iam"
  | "vuln"
  | "ai"
  | "foundation";

export type ScoreMap = Partial<Record<PathwayId, number>>;

export type QuizOption = {
  id: string;
  label: string;
  scores: ScoreMap;
};

export type QuizQuestion = {
  id: string;
  text: string;
  options: QuizOption[];
};

export type PathwayResult = {
  id: PathwayId;
  name: string;
  bestFor: string;
  why: string;
  certification: string;
  sequence: string;
  roadmap: string[];
  projects: string[];
};

export type LeadInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  currentProfession: string;
  city: string;
  country: string;
  startTimeline: string;
  consent: boolean;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
};

export type QuizAnswerInput = {
  questionId: string;
  selectedAnswer: string;
};

export type FunnelLead = LeadInput & {
  id: string;
  pathwayResult: string;
  pathwayScoreJson: Record<string, number>;
  tag: string;
  createdAt: string;
  updatedAt: string;
};

export type QuizResponseRecord = {
  id: string;
  leadId: string;
  questionId: string;
  questionText: string;
  selectedAnswer: string;
  answerScoreJson: ScoreMap;
  createdAt: string;
};

export type PipelineRecord = {
  id: string;
  leadId: string;
  stage: string;
  status: string;
  notes?: string;
  assignedTo?: string;
  lastContactedAt?: string;
  nextFollowUpAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type MessageLog = {
  id: string;
  leadId: string;
  type: string;
  subject?: string;
  message?: string;
  status: string;
  sentAt?: string;
  openedAt?: string;
  clickedAt?: string;
};
