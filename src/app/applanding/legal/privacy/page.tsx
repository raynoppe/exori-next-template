import { LegalContent } from "@/components/blocks/content/legal-content";
import { privacySections } from "@/lib/content/posts";

export default function PrivacyPage() {
  return (
    <LegalContent
      title="Privacy Policy"
      updatedAt="June 29, 2026"
      sections={privacySections}
    />
  );
}
