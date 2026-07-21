export type FeaturePageContent = {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  splitHeadline: string;
  splitSubhead: string;
  checklistHeadline: string;
  checklistItems: { title: string; description: string }[];
};

export const featureHubItems = [
  {
    title: "For teams",
    description:
      "Shared workspaces, real-time collaboration, and role-based permissions built for growing product teams.",
    href: "/applanding/features/feature1",
    tags: ["Teams", "Collaboration"],
  },
  {
    title: "For creators",
    description:
      "Publish faster with AI-assisted workflows, asset libraries, and one-click export to every platform.",
    href: "/applanding/features/feature2",
    tags: ["Creators", "Publishing"],
  },
];

export const featurePages: Record<string, FeaturePageContent> = {
  feature1: {
    slug: "feature1",
    title: "For teams",
    eyebrow: "Feature",
    headline: "Built for teams that ship together",
    subhead:
      "Keep everyone aligned with shared projects, live updates, and permissions that scale as you grow.",
    splitHeadline: "Collaboration without the chaos",
    splitSubhead:
      "Assign tasks, comment in context, and see progress at a glance. No more hunting through Slack threads for decisions.",
    checklistHeadline: "Everything your team needs",
    checklistItems: [
      {
        title: "Shared workspaces",
        description: "Organize projects by team, client, or product line.",
      },
      {
        title: "Role-based access",
        description: "Control who can view, edit, or publish with granular roles.",
      },
      {
        title: "Activity timeline",
        description: "See every change with a searchable audit trail.",
      },
      {
        title: "Integrations",
        description: "Connect Slack, GitHub, and Jira in minutes.",
      },
    ],
  },
  feature2: {
    slug: "feature2",
    title: "For creators",
    eyebrow: "Feature",
    headline: "Create once, publish everywhere",
    subhead:
      "From draft to published in minutes — with AI that understands your voice and brand guidelines.",
    splitHeadline: "Your creative workflow, supercharged",
    splitSubhead:
      "Generate variants, resize assets, and schedule posts without leaving the app. Focus on ideas, not busywork.",
    checklistHeadline: "Creator-first tools",
    checklistItems: [
      {
        title: "AI writing assistant",
        description: "Draft captions, scripts, and blog posts in your tone.",
      },
      {
        title: "Asset library",
        description: "Store, tag, and search images, video, and templates.",
      },
      {
        title: "Multi-platform export",
        description: "One click to Instagram, TikTok, YouTube, and your site.",
      },
      {
        title: "Analytics dashboard",
        description: "Track engagement across channels in one view.",
      },
    ],
  },
};

export const tokenCostRows = [
  { action: "AI text generation", cost: "2 tokens", note: "Per 1,000 words" },
  { action: "Image generation", cost: "10 tokens", note: "Per image" },
  { action: "Document export", cost: "1 token", note: "Per export" },
  { action: "API call", cost: "0.5 tokens", note: "Per request" },
  { action: "Video transcription", cost: "5 tokens", note: "Per minute" },
];

export const supportSteps = [
  {
    step: "01",
    title: "Create a portal account",
    description: "Register for free at the customer portal using your app email.",
  },
  {
    step: "02",
    title: "Open a support ticket",
    description: "Describe your issue and attach screenshots if helpful.",
  },
  {
    step: "03",
    title: "Get a response",
    description: "Our team replies in the portal — usually within one business day.",
  },
  {
    step: "04",
    title: "Mark as resolved",
    description: "Close the ticket when your issue is fixed, or reopen if needed.",
  },
];
