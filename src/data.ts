import type { ReviewStatus, SignItem, SignProject, TermBinding, VersionSnapshot } from "./types";

export const uid = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export const CURRENT_USER = "当前审校员";

export const STATUS_LABELS: Record<ReviewStatus, string> = {
  draft: "草稿",
  pending: "待确认",
  confirmed: "已确认",
  changes: "需修改",
};

const term = (source: string, target: string, confirmed = false, required = true): TermBinding => ({
  id: uid("term"),
  source,
  target,
  required,
  confirmed,
});

/** TR-01 送外审前的冻结版本：原文、法规、术语与审校意见均为当时存档内容 */
const frozenPlatformVersion = (sign: SignItem): VersionSnapshot => ({
  id: "version-frozen-tr01",
  label: "冻结版本 V1",
  createdAt: "2026-09-15T03:05:00.000Z",
  frozenBy: "审校员 王黎",
  note: "送外审前冻结存档",
  code: sign.code,
  sourceText: "候车区。请在黄色安全线外排队，照看好老人和儿童。",
  targetText: "Waiting Area\nPlease line up behind the yellow line and take care of the elderly and children.",
  targetLanguage: sign.targetLanguage,
  scenario: sign.scenario,
  regulation: "GB/T 10001.1-2006 标志用公共信息图形符号",
  status: "confirmed",
  terms: [
    { id: "term-frozen-waiting", source: "候车区", target: "Waiting Area", required: true, confirmed: true },
    { id: "term-frozen-elderly", source: "老人和儿童", target: "the elderly and children", required: true, confirmed: true },
  ],
  comments: [
    {
      id: "comment-frozen-1",
      author: "审校员 王黎",
      body: "“line up”为 GB/T 10001.1 推荐译法，术语已逐条核对确认，同意冻结送外审。",
      createdAt: "2026-09-15T02:48:00.000Z",
      resolved: true,
      replies: [
        {
          id: "reply-frozen-1",
          author: "翻译组 林舟",
          body: "收到，本版按推荐译法定稿。",
          createdAt: "2026-09-15T02:55:00.000Z",
        },
      ],
    },
    {
      id: "comment-frozen-2",
      author: "外部单位 地铁运营",
      body: "站台实际广播使用 queue，后续如改稿请同步评估。",
      createdAt: "2026-09-15T03:02:00.000Z",
      resolved: false,
      replies: [],
    },
  ],
});

export const createSeedProject = (): SignProject => {
  const platformSign: SignItem = {
    id: "sign-platform",
    code: "TR-01",
    sourceText: "候车区。请在黄线内排队，照看好随身物品。",
    targetLanguage: "English",
    targetText: "Waiting Area\nPlease queue behind the yellow line and keep your belongings with you.",
    scenario: "轨道交通站台",
    regulation: "GB/T 10001.1-2023 公共信息图形符号",
    status: "pending",
    terms: [term("候车区", "Waiting Area"), term("黄线", "yellow line")],
    comments: [],
    versions: [],
    emergencyRevision: false,
    updatedAt: "2026-09-21T09:20:00.000Z",
  };
  platformSign.versions = [frozenPlatformVersion(platformSign)];

  const signs: SignItem[] = [
    platformSign,
    {
      id: "sign-platform",
      code: "TR-01",
      sourceText: "候车区。请在黄线内排队，照看好随身物品。",
      targetLanguage: "English",
      targetText: "Waiting Area\nPlease queue behind the yellow line and keep your belongings with you.",
      scenario: "轨道交通站台",
      regulation: "GB/T 10001.1-2023 公共信息图形符号",
      status: "pending",
      terms: [term("候车区", "Waiting Area"), term("黄线", "yellow line")],
      comments: [],
      versions: [],
      emergencyRevision: false,
      updatedAt: "2026-09-21T09:20:00.000Z",
    },
    {
      id: "sign-exit",
      code: "EM-02",
      sourceText: "紧急出口。发生紧急情况时，请按指示方向迅速撤离，不要乘坐电梯。",
      targetLanguage: "English",
      targetText: "EMERGENCY EXIT\nIn an emergency, leave quickly in the direction shown. Do not use the elevator.",
      scenario: "商场疏散通道",
      regulation: "GB 13495.1-2015 消防安全标志",
      status: "confirmed",
      terms: [term("紧急出口", "EMERGENCY EXIT", true), term("电梯", "elevator", true)],
      comments: [],
      versions: [],
      emergencyRevision: false,
      updatedAt: "2026-09-18T06:10:00.000Z",
    },
    {
      id: "sign-water",
      code: "SV-03",
      sourceText: "直饮水。请勿将茶叶、果皮等杂物丢入水槽。",
      targetLanguage: "日本語",
      targetText: "飲料水\n茶殻や果物の皮などを流さないでください。",
      scenario: "公园服务亭",
      regulation: "城市公共设施双语标识译写规范",
      status: "changes",
      terms: [term("直饮水", "飲料水"), term("水槽", "排水口")],
      comments: [],
      versions: [],
      emergencyRevision: false,
      updatedAt: "2026-09-23T02:40:00.000Z",
    },
    {
      id: "sign-smoking",
      code: "PR-07",
      sourceText: "禁止吸烟。包括电子烟。",
      targetLanguage: "Français",
      targetText: "INTERDICTION DE FUMER\nCigarettes électroniques incluses.",
      scenario: "医院入口",
      regulation: "公共场所卫生管理条例实施细则",
      status: "draft",
      terms: [term("禁止吸烟", "INTERDICTION DE FUMER"), term("电子烟", "Cigarettes électroniques")],
      comments: [],
      versions: [],
      emergencyRevision: false,
      updatedAt: "2026-09-24T04:15:00.000Z",
    },
  ];

  return {
    id: "public-sign-review-1008",
    title: "城市公共标识多语言校对",
    location: "滨海交通枢纽一期",
    activeSignId: signs[0].id,
    signs,
    updatedAt: new Date().toISOString(),
  };
};
