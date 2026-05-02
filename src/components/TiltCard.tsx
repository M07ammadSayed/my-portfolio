"use client";
import {
        motion,
        useTransform,
        useMotionTemplate,
        useMotionValue,
} from "framer-motion";

export default function TiltCard({
        children,
        className = "",
}: {
        children: React.ReactNode;
        className?: string;
}) {
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
                const { left, top } = currentTarget.getBoundingClientRect();
                mouseX.set(clientX - left);
                mouseY.set(clientY - top);
        }

        function handleMouseLeave() {
                mouseX.set(0);
                mouseY.set(0);
        }

        const rotationX = useTransform(mouseY, [0, 400], [3.5, -3.5]);
        const rotationY = useTransform(mouseX, [0, 400], [-3.5, 3.5]);

        return (
                <motion.div
                        className={`relative overflow-hidden group perspective-1000 ${className}`}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                                rotateX: rotationX,
                                rotateY: rotationY,
                                transformStyle: "preserve-3d",
                                border: "1px solid rgba(30,42,58,0.8)",
                                background: "rgba(13,13,26,0.5)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                borderRadius: "16px",
                        }}
                        whileHover={{ scale: 1.015, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
                        transition={{ type: "spring", stiffness: 250, damping: 28 }}
                >
                        <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none" />

                        {/* Spotlight gradient on hover */}
                        <motion.div
                                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100 z-10"
                                style={{
                                        background: useMotionTemplate`
                                                radial-gradient(
                                                        500px circle at ${mouseX}px ${mouseY}px,
                                                        rgba(6, 182, 212, 0.07),
                                                        transparent 80%
                                                )
                                        `,
                                }}
                        />

                        {/* Scanline reveal on hover */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10">
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#06b6d4]/30 to-transparent absolute top-0 -translate-y-full group-hover:animate-scanline opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="relative z-20 h-full transform-style-3d">
                                {children}
                        </div>
                </motion.div>
        );
}
