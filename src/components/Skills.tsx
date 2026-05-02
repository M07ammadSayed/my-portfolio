"use client";
import { Terminal, Shield, Code, Lock } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import SectionHeader from "./SectionHeader";

const cardVariants = {
        hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
        visible: (i: number) => ({
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                        duration: 0.55,
                        delay: i * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                },
        }),
};

const skills = [
        {
                icon: Shield,
                title: "AppSec & Tools",
                desc: "Burp Suite, OWASP ZAP, Postman, Secure Code Review",
                color: "text-red-400",
                accent: "rgba(248,113,113,0.12)",
        },
        {
                icon: Lock,
                title: "Web Security",
                desc: "OWASP Top 10, XSS/Injection Prevention, Auth Logic",
                color: "text-[#06b6d4]",
                accent: "rgba(6,182,212,0.12)",
        },
        {
                icon: Code,
                title: "Secure Coding",
                desc: "Input Validation, Output Encoding, JWT Handling",
                color: "text-emerald-400",
                accent: "rgba(52,211,153,0.12)",
        },
        {
                icon: Terminal,
                title: "Full Stack Base",
                desc: "React.js, Node.js, Express, MongoDB, Linux",
                color: "text-[#a855f7]",
                accent: "rgba(168,85,247,0.12)",
        },
];

export default function Skills() {
        return (
                <section
                        id="skills"
                        className="py-24 md:py-36 px-6 max-w-7xl mx-auto relative z-10"
                >
                        <SectionHeader
                                icon={Shield}
                                title="Security & Tech Stack"
                                desc="The toolkit I use to build secure software and identify vulnerabilities."
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                                {skills.map((item, index) => (
                                        <motion.div
                                                key={index}
                                                custom={index}
                                                variants={cardVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true, margin: "-8%" }}
                                        >
                                                <TiltCard className="p-6 md:p-8 h-full">
                                                        <div
                                                                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                                                                style={{ background: item.accent }}
                                                        >
                                                                <item.icon className={`w-5 h-5 ${item.color}`} />
                                                        </div>
                                                        <h3
                                                                className="font-display font-bold text-white mb-2.5"
                                                                style={{ fontSize: "clamp(1.05rem, 1vw + 0.75rem, 1.2rem)", letterSpacing: "-0.02em" }}
                                                        >
                                                                {item.title}
                                                        </h3>
                                                        <p className="text-[#64748b] leading-relaxed text-sm">
                                                                {item.desc}
                                                        </p>
                                                </TiltCard>
                                        </motion.div>
                                ))}
                        </div>
                </section>
        );
}
