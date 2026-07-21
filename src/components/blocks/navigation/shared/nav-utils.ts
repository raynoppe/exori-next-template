import type { NavLink } from "../types";

export function hasNavChildren(
  link: NavLink,
): link is NavLink & { children: NonNullable<NavLink["children"]> } {
  return !!link.children?.length;
}

export function navLinkKey(link: NavLink) {
  return link.href ?? link.label;
}
