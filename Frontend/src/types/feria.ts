export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "true-false" | "situational";
  question: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
}

export interface Topic {
  id: string;
  name: string;
  description?: string;
  introType: "video" | "interactive";
  videoSrc?: string;
  sourceDocs: string[];
  introHtml?: string;
  activityType: string;
  badge: Badge;
  quiz: QuizQuestion[];
}

export interface Area {
  id: string;
  name: string;
  description: string;
  descriptionProvisional?: string;
  color: string;
  icon: string;
  isPlaceholder?: boolean;
  topics?: Topic[];
}

export interface FairData {
  areas: Area[];
}

export interface QuizResult {
  topicId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  approved: boolean;
  answers: Record<string, string | boolean>;
  completedAt: string;
}

export type TopicProgressStatus =
  | "pending"
  | "in_progress"
  | "completed";

export interface UserSession {
  cedula: string;
  area: string;
  fechaEjecucion: string;

  progreso: Record<
    string,
    TopicProgressStatus
  >;

  actividadesCompletadas: string[];

  insignias: string[];

  evaluaciones: Record<
    string,
    QuizResult
  >;

  fechaInicio: string;

  fechaFinalizacion: string | null;

  score: number;
}