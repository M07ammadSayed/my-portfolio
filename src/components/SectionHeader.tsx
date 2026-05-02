"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function ScrambleText({ text }: { text: string }) {
        const [displayText, setDisplayText] = useState(text.replace(/./g, " "));
        const ref = useRef<HTMLSpanElement>(null);
        const isInView = useInView(ref, { once: true, margin: "-10%" });

        useEffect(() => {
                if (!isInView) return;
                let iteration = 0;
                let interval: NodeJS.Timeout;

                interval = setInterval(() => {
                        setDisplayText(
                                text
                                        .split("")
                                        .map((letter, index) => {
                                                if (index < iteration) return text[index];
                                                return letter === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
                                        })
                                        .join(""),
                        );

                        if (iteration >= text.length) clearInterval(interval);
                        iteration += 1 / 2;
                }, 30);

                return () => clearInterval(interval);
        }, [text, isInView]);

        return <span ref={ref}>{displayText}</span>;
}

export default function SectionHeader({
        icon: Icon,
        title,
        desc,
}: {
        icon: React.ElementType;
        title: string;
        desc: string;
}) {
        return (
                <motion.div
                        initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-14 md:mb-16"
                >
                        <h2 className="font-display font-bold flex items-center gap-3 mb-3" style={{ letterSpacing: "-0.025em", fontSize: "clamp(1.75rem, 3vw + 0.75rem, 3rem)" }}>
                                <span className="relative flex-shrink-0">
                                        <Icon className="text-[#06b6d4] w-8 h-8 md:w-9 md:h-9 relative z-10" />
                                        <span className="absolute inset-0 bg-[#06b6d4]/15 blur-lg rounded-full pointer-events-none" />
                                </span>
                                <span className="text-white font-mono tracking-tight">
                                        <ScrambleText text={title} />
                                </span>
                        </h2>
                        <p className="text-[#64748b] flex items-center gap-2 pl-1" style={{ fontSize: "clamp(0.9rem, 0.5vw + 0.8rem, 1.05rem)" }}>
                                <span className="text-[#06b6d4]/40 font-mono select-none">{">"}</span>
                                {desc}
                        </p>
                </motion.div>
        );
}
