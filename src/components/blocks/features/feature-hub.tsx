import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type FeatureHubItem = {
  title: string;
  description: string;
  href: string;
  tags?: string[];
};

export type FeatureHubProps = {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  features?: FeatureHubItem[];
  className?: string;
};

export function FeatureHub({
  eyebrow = "Features",
  headline = "Explore what Nimbus can do",
  subhead = "Dive deeper into the capabilities that power your workflow.",
  features,
  className,
}: FeatureHubProps) {
  if (!features?.length) return null;

  return (
    <section className={cn("nimbus-section bg-muted/20", className)}>
      <div className="nimbus-container space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {headline}
          </h2>
          <p className="text-muted-foreground">{subhead}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <Link key={feature.href} href={feature.href}>
              <Card className="h-full transition-colors hover:bg-muted/40">
                <CardHeader>
                  <p className="text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                  {feature.tags?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {feature.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
