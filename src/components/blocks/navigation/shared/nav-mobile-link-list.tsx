"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { NavLink } from "../types";
import { hasNavChildren, navLinkKey } from "./nav-utils";

type NavMobileLinkListProps = {
  links: NavLink[];
  onNavigate?: () => void;
};

export function NavMobileLinkList({ links, onNavigate }: NavMobileLinkListProps) {
  return (
    <ul className="flex flex-col gap-1">
      {links.map((link) => (
        <NavMobileLinkItem
          key={navLinkKey(link)}
          link={link}
          onNavigate={onNavigate}
        />
      ))}
    </ul>
  );
}

function NavMobileLinkItem({
  link,
  onNavigate,
}: {
  link: NavLink;
  onNavigate?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  if (hasNavChildren(link)) {
    return (
      <li>
        <div className="flex items-center gap-1">
          {link.href ? (
            <Link
              href={link.href}
              className="flex-1 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={onNavigate}
            >
              {link.label}
            </Link>
          ) : (
            <span className="flex-1 px-3 py-2.5 text-sm font-medium text-foreground">
              {link.label}
            </span>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="shrink-0"
            aria-expanded={expanded}
            aria-label={`${expanded ? "Collapse" : "Expand"} ${link.label} submenu`}
            onClick={() => setExpanded((current) => !current)}
          >
            <ChevronDown
              className={cn(
                "size-4 transition-transform",
                expanded && "rotate-180",
              )}
            />
          </Button>
        </div>

        {expanded ? (
          <ul className="ml-3 mt-1 flex flex-col gap-1 border-l border-border/60 pl-3">
            {link.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={onNavigate}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={link.href ?? "/"}
        className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        onClick={onNavigate}
      >
        {link.label}
      </Link>
    </li>
  );
}
