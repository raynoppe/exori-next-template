import Link from "next/link";

import type { FooterColumn } from "@/lib/content/footer/schema";
import { cn } from "@/lib/utils";

export type FooterLinkColumnsProps = {
  columns: FooterColumn[];
  className?: string;
};

/**
 * Renders footer link columns from JSON config (`_settings/footer.json`).
 */
export function FooterLinkColumns({ columns, className }: FooterLinkColumnsProps) {
  return (
    <div
      className={cn(
        "grid gap-8 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {columns.map((column) => (
        <div key={column.title} className="space-y-3">
          <p className="text-sm font-semibold">{column.title}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {column.links.map((link) => (
              <li key={`${column.title}-${link.href}-${link.label}`}>
                <Link href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
