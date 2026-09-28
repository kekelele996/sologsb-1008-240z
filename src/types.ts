export type ReviewStatus = "draft" | "pending" | "confirmed" | "changes";

export interface Reply {
  id: string;
  author: string;
  body: string;
  createdAt: string;
}

export interface ReviewComment {
  id: string;
  author: string;
  body: string;
  createdAt: string;
  resolved: boolean;
  replies: Reply[];
}

export interface TermBinding {
  id: string;
  source: string;
  target: string;
  required: boolean;
  confirmed: boolean;
}

export interface VersionSnapshot {
  id: string;
  label: string;
  createdAt: string;
  frozenBy: string;
  note: string;
  /** 冻结时的完整标识信息，后续修改原文或移除术语都不会影响快照 */
  code: string;
  sourceText: string;
  targetText: string;
  targetLanguage: string;
  scenario: string;
  regulation: string;
  status: ReviewStatus;
  terms: TermBinding[];
  comments: ReviewComment[];
}

export interface SignItem {
  id: string;
  code: string;
  sourceText: string;
  targetLanguage: string;
  targetText: string;
  scenario: string;
  regulation: string;
  status: ReviewStatus;
  terms: TermBinding[];
  comments: ReviewComment[];
  versions: VersionSnapshot[];
  emergencyRevision: boolean;
  updatedAt: string;
}

export interface SignProject {
  id: string;
  title: string;
  location: string;
  activeSignId: string;
  signs: SignItem[];
  updatedAt: string;
}

export interface PersistedProject {
  schema: 1;
  project: SignProject;
}

export interface DiffToken {
  type: "same" | "add" | "remove";
  value: string;
}
