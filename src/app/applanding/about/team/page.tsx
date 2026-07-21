import { CtaBand, TeamGrid } from "@/components/blocks";

export default function AboutTeamPage() {
  return (
    <>
      <section className="nimbus-section-sm">
        <div className="nimbus-container max-w-3xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Team
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            The people behind Nimbus
          </h1>
          <p className="text-lg text-muted-foreground">
            We&apos;re a small team of designers, engineers, and support specialists
            building tools that help you ship faster.
          </p>
        </div>
      </section>
      <TeamGrid />
      <CtaBand />
    </>
  );
}
