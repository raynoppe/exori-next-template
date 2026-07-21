import { LegalContent } from "@/components/blocks/content/legal-content";
import { termsSections } from "@/lib/content/posts";

export default function TermsPage() {
  return (
    <LegalContent
      title="Terms of Service"
      updatedAt="June 29, 2026"
      sections={termsSections}
    />
  );
}
