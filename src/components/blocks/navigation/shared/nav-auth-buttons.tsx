import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavAuthButtonsProps = {
  show?: boolean;
  ctaLabel: string;
  ctaHref: string;
  className?: string;
  signInClassName?: string;
  registerClassName?: string;
};

export function NavAuthButtons({
  show = true,
  ctaLabel,
  ctaHref,
  className,
  signInClassName,
  registerClassName,
}: NavAuthButtonsProps) {
  if (!show) return null;

  return (
    <>
      <ButtonLink
        variant="outline"
        className={cn("hidden sm:inline-flex", signInClassName, className)}
        href="/login"
      >
        Sign in
      </ButtonLink>
      <ButtonLink
        className={cn("hidden sm:inline-flex", registerClassName, className)}
        href={ctaHref}
      >
        {ctaLabel}
      </ButtonLink>
    </>
  );
}
