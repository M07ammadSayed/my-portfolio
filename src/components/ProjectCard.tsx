"use client";
import TiltCard from "./TiltCard";
import { ExternalLink } from "lucide-react";

type ThemeColor = "cyan" | "purple" | "blue";

interface ProjectCardProps {
        icon: React.ElementType;
        color: ThemeColor;
        title: string;
        desc: string;
        link: string;
        tags: string[];
        "aria-label"?: string;
}

const theme = {
        cyan: {
                text: "text-[#06b6d4]",
                bg: "rgba(6,182,212,0.1)",
                border: "rgba(6,182,212,0.15)",
        },
        purple: {
                text: "text-[#a855f7]",
                bg: "rgba(168,85,247,0.1)",
                border: "rgba(168,85,247,0.15)",
        },
        blue: {
                text: "text-[#a855f7]",
                bg: "rgba(168,85,247,0.08)",
                border: "rgba(168,85,247,0.12)",
        },
};

export default function ProjectCard({
        icon: Icon,
        color,
        title,
        desc,
        link,
        tags,
}: ProjectCardProps) {
        const active = theme[color] || theme.cyan;

        return (
                <TiltCard className="flex flex-col h-full group">
                        <div className="p-7 md:p-8 flex-1 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                        <div
                                                className="p-2.5 rounded-xl"
                                                style={{
                                                        background: active.bg,
                                                        border: `1px solid ${active.border}`,
                                                }}
                                        >
                                                <Icon
                                                        className={`w-5 h-5 ${active.text}`}
                                                        aria-hidden="true"
                                                />
                                        </div>
                                        <a
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#475569] hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:rotate-45 p-2 hover:bg-white/5 rounded-full"
                                                aria-label={`Visit ${title} on GitHub`}
                                        >
                                                <ExternalLink size={18} />
                                        </a>
                                </div>

                                <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-fit"
                                >
                                        <h3
                                                className="font-display font-bold text-white mb-2 hover:text-[#06b6d4] transition-colors duration-300"
                                                style={{ fontSize: "clamp(1.1rem, 1vw + 0.8rem, 1.35rem)", letterSpacing: "-0.02em" }}
                                        >
                                                {title}
                                        </h3>
                                </a>

                                <p className="text-sm text-[#64748b] mb-6 flex-1 leading-relaxed">
                                        {desc}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                        {tags.map((tag) => (
                                                <span
                                                        key={tag}
                                                        className="px-2.5 py-1 text-[#475569] text-xs rounded-md font-mono"
                                                        style={{
                                                                background: "rgba(255,255,255,0.03)",
                                                                border: "1px solid rgba(30,42,58,0.8)",
                                                        }}
                                                >
                                                        {tag}
                                                </span>
                                        ))}
                                </div>
                        </div>
                </TiltCard>
        );
}
