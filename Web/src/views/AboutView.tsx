import {
  ExternalLink,
  GraduationCap,
  House,
  Mail,
  MapPin,
  PartyPopper,
} from "lucide-react";
import { details, featuredSkills, intro } from "../data/content";
import type { Language } from "../lib/navigation";
import type { DetailItem } from "../types";
import { SkillBadge } from "../components/SkillBadge";
import profileImage from "../../kyungsol_KOI3125_Paint23.png";

const iconMap = {
  location: MapPin,
  birthday: PartyPopper,
  email: Mail,
  education: GraduationCap,
  website: House,
} satisfies Record<Exclude<DetailItem["icon"], "github">, typeof MapPin>;

function DetailIcon({ icon }: { icon: DetailItem["icon"] }) {
  if (icon === "github") {
    return <i className="detail-github-mark" aria-hidden="true" />;
  }

  const Icon = iconMap[icon];
  return <Icon aria-hidden="true" />;
}

export function AboutView({ language }: { language: Language }) {
  return (
    <section className="about-view" aria-labelledby="about-title">
      <div className="identity-row">
        <div className="avatar-wrap">
          <img src={profileImage} alt="Illustrated avatar of Geonwoo Kim" />
        </div>
        <div className="identity-copy">
          <div className="name-line">
            <h1 id="about-title">KIM GEON WOO</h1>
            <span lang="ko">{intro.koreanName}</span>
          </div>
          <p className="role-line">{intro.role[language]}</p>
        </div>
      </div>

      <div className="featured-skills" aria-label="Featured skills">
        {featuredSkills.map((skill) => (
          <SkillBadge {...skill} key={skill.label} />
        ))}
        <a
          className="skill-badge featured-skills__more"
          href="#skills"
          aria-label={language === "en" ? "View all skills" : "전체 기술 보기"}
        >
          ...
        </a>
      </div>

      <div className="detail-grid">
        {details.map((item) => {
          const body = (
            <>
              <DetailIcon icon={item.icon} />
              <span>{item.label[language]}</span>
              {item.href && item.icon !== "email" ? (
                <ExternalLink className="external-mark" aria-hidden="true" />
              ) : null}
            </>
          );

          return item.href ? (
            <a
              className="detail-item"
              href={item.href}
              target={
                item.href.startsWith("http") ? "_blank" : undefined
              }
              rel="noreferrer"
              key={item.icon}
            >
              {body}
            </a>
          ) : (
            <div className="detail-item" key={item.icon}>
              {body}
            </div>
          );
        })}
      </div>
    </section>
  );
}
