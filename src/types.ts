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
  /** 留档人，冻结保存时记录 */
  frozenBy: string;
  /** 冻结时点的完整标识信息 */
  code: string;
  sourceText: string;
  targetLanguage: string;
  targetText: string;
  scenario: string;
  regulation: string;
  status: ReviewStatus;
  /** 术语及其当时的确认情况 */
  terms: TermBinding[];
  /** 审校意见、回复与解决状态的完整留档 */
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
