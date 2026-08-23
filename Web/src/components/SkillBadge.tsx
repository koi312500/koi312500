import { Braces } from "lucide-react";
import type { SkillBadgeData } from "../types";

export function SkillBadge({ label, level }: SkillBadgeData) {
  return (
    <span className={`skill-badge skill-badge--${level}`}>
      <Braces aria-hidden="true" size={15} strokeWidth={2.5} />
      {label}
    </span>
  );
}
