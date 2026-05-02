"use client";
import Meteors from "./Meteors";

export default function VisualBackground() {
        return (
                <div className="fixed inset-0 pointer-events-none z-0">
                        {/* Ambient glows — breathe with opacity only, no layout-triggering props */}
                        <div
                                className="absolute top-[-15%] left-[15%] w-[480px] h-[480px] rounded-full animate-breathe"
                                style={{
                                        background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
                                        filter: "blur(60px)",
                                }}
                        />
                        <div
                                className="absolute bottom-[-10%] right-[-5%] w-[540px] h-[540px] rounded-full animate-breathe-slow"
                                style={{
                                        background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
                                        filter: "blur(80px)",
                                }}
                        />
                        <div className="absolute inset-0 bg-noise opacity-[0.12] brightness-100 contrast-150" />
                        <div className="absolute inset-0 bg-grid-pattern" />
                        <Meteors number={18} />
                </div>
        );
}
