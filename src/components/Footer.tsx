"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import SocialLink from "./SocialLink";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Footer() {
        return (
                <footer
                        id="contact"
                        className="py-24 md:py-32 relative z-20 overflow-hidden"
                        style={{ borderTop: "1px solid rgba(30,42,58,0.6)" }}
                >
                        {/* Subtle top accent line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#a855f7]/40 to-transparent" />

                        <div className="max-w-3xl mx-auto text-center px-6">
                                <motion.h2
                                        initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
                                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.7, ease }}
                                        className="font-display font-bold text-white mb-4"
                                        style={{
                                                fontSize: "clamp(2rem, 4vw + 0.5rem, 3.5rem)",
                                                letterSpacing: "-0.03em",
                                                lineHeight: 1.1,
                                        }}
                                >
                                        Let's Talk AppSec.
                                </motion.h2>

                                <motion.p
                                        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.1, ease }}
                                        className="text-[#64748b] mb-12 leading-relaxed"
                                        style={{ fontSize: "clamp(0.95rem, 0.5vw + 0.8rem, 1.1rem)" }}
                                >
                                        Open to opportunities in{" "}
                                        <span className="text-[#06b6d4] font-medium">Application Security</span>
                                        .
                                        <span className="block text-sm text-[#334155] mt-2 font-mono">
                                                I find the vulnerabilities before attackers do.
                                        </span>
                                </motion.p>

                                <motion.div
                                        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.18, ease }}
                                        className="flex justify-center gap-4 mb-16"
                                >
                                        <SocialLink
                                                href="https://github.com/M07ammadSayed"
                                                icon={Github}
                                                label="Visit GitHub Profile"
                                                large
                                        />
                                        <SocialLink
                                                href="https://www.linkedin.com/in/muhammad-sayyid/"
                                                icon={Linkedin}
                                                label="Visit LinkedIn Profile"
                                                large
                                        />
                                        <SocialLink
                                                href="mailto:msayed.ms2005@gmail.com?subject=Contact%20from%20Portfolio&body=Hi%20Muhammad,%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss..."
                                                icon={Mail}
                                                label="Send Email"
                                                large
                                        />
                                </motion.div>

                                <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3, ease }}
                                        className="text-center font-mono space-y-1.5"
                                >
                                        <p className="text-[#334155] text-xs">
                                                © {new Date().getFullYear()} Muhammad Sayyid. All Rights Reserved.
                                        </p>
                                        <p className="text-[#475569] text-sm">
                                                Engineered with{" "}
                                                <span className="text-[#06b6d4]/80">Next.js</span>
                                                {" "}
                                                &{" "}
                                                <span className="text-[#06b6d4]/80">Security</span>
                                        </p>
                                </motion.div>
                        </div>
                </footer>
        );
}
