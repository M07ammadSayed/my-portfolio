"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress({ isLoaded }: { isLoaded: boolean }) {
        const { scrollYProgress } = useScroll();

        const gatedProgress = useTransform(scrollYProgress, (v) =>
                isLoaded ? v : 0,
        );

        const scaleX = useSpring(gatedProgress, {
                stiffness: 120,
                damping: 30,
                restDelta: 0.001,
        });

        return (
                <motion.div
                        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9999]"
                        style={{
                                scaleX,
                                background: "linear-gradient(90deg, #a855f7, #06b6d4)",
                        }}
                />
        );
}
