"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const titles = [
        "Microservice-Based",
        "Cloud-Native",
        "API-Driven",
        "Zero-Trust",
];

export default function DigitalTitle() {
        const [index, setIndex] = useState(0);
        const [isFirstRender, setIsFirstRender] = useState(true);

        useEffect(() => {
                setIsFirstRender(false);
                const timer = setInterval(() => {
                        setIndex((prev) => (prev + 1) % titles.length);
                }, 3200);
                return () => clearInterval(timer);
        }, []);

        return (
                <div className="relative inline-block min-w-[140px] md:min-w-[290px] min-h-[1.15em] text-center md:text-left overflow-hidden">
                        <AnimatePresence mode="wait">
                                <motion.span
                                        key={index}
                                        initial={isFirstRender ? { opacity: 1, y: 0 } : { opacity: 0, y: 12, filter: "blur(6px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        className="block font-extrabold pb-1 whitespace-nowrap will-change-transform"
                                        style={{
                                                background: "linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                backgroundClip: "text",
                                        }}
                                >
                                        {titles[index]}
                                </motion.span>
                        </AnimatePresence>
                </div>
        );
}
