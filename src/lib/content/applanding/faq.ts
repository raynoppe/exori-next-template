export type FaqItem = { question: string; answer: string };

export const applandingFaqItems: FaqItem[] = [
  {
    question: "What platforms does the app support?",
    answer:
      "Nimbus App is available on iOS, Android, and the web. Your subscription syncs across every device automatically.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Every paid plan includes a 14-day free trial with full access to core features — no credit card required to start.",
  },
  {
    question: "How do token costs work?",
    answer:
      "AI-powered actions consume tokens based on complexity. Subscription plans include a monthly token allowance; additional tokens can be purchased on the pricing page.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "You can cancel your subscription from the app settings or portal. Access continues until the end of your billing period.",
  },
  {
    question: "How do I get support?",
    answer:
      "Create a free portal account and open a support ticket. Our team typically responds within one business day.",
  },
  {
    question: "Do you offer team plans?",
    answer:
      "Yes. Professional and Enterprise plans include shared workspaces, role-based access, and consolidated billing.",
  },
  {
    question: "Is my data secure?",
    answer:
      "All data is encrypted in transit and at rest. We are SOC 2 Type II certified and never sell your data to third parties.",
  },
  {
    question: "Can I import data from other tools?",
    answer:
      "We support CSV import and direct integrations with Notion, Slack, and Google Workspace on Professional plans and above.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, Apple Pay, and Google Pay. Enterprise customers can pay by invoice.",
  },
  {
    question: "How do I upgrade or downgrade my plan?",
    answer:
      "Visit the pricing page or open the subscription section in your portal account. Changes take effect on your next billing cycle.",
  },
];
