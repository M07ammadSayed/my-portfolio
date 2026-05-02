"use client";
import { Terminal, Shield, Code, Database } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";

const cardVariants = {
        hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
        visible: (i: number) => ({
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                        duration: 0.55,
                        delay: i * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                },
        }),
};

const projects = [
        {
                icon: Shield,
                color: "cyan" as const,
                title: "Hardened Runtime",
                desc: "Securing supply chain with Least Privilege, Alpine, and Trivy.",
                link: "https://github.com/M07ammadSayed/secure-software-supply-chain",
                tags: ["AppSec", "Docker", "Trivy"],
                "aria-label": "View Secure Software Supply Chain project on GitHub",
        },
        {
                icon: Terminal,
                color: "purple" as const,
                title: "Python Port Scanner",
                desc: "Custom network tool built with raw Sockets & Multi-threading.",
                link: "https://github.com/M07ammadSayed/python-port-scanner",
                tags: ["Python", "Networking"],
                "aria-label": "View Python Port Scanner project on GitHub",
        },
        {
                icon: Database,
                color: "blue" as const,
                title: "Secure State Mgmt",
                desc: "React app focused on Input Handling and logic integrity.",
                link: "https://github.com/M07ammadSayed/use-popcorn",
                tags: ["React.js", "Secure Coding"],
                "aria-label": "View usePopcorn project on GitHub",
        },
];

export default function Projects() {
        return (
                <section
                        id="projects"
                        className="py-24 md:py-36 px-6 max-w-7xl mx-auto relative z-10"
                >
                        <SectionHeader
                                icon={Code}
                                title="AppSec Labs"
                                desc="Hands-on security research and tooling."
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {projects.map((project, index) => (
                                        <motion.div
                                                key={index}
                                                custom={index}
                                                variants={cardVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true, margin: "-8%" }}
                                        >
                                                <ProjectCard {...project} />
                                        </motion.div>
                                ))}
                        </div>
                </section>
        );
}
