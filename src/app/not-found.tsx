import Link from "next/link";
// import dynamic from "next/dynamic";
import CursorParticleEngine from "@/components/CursorParticleEngine";
// const CursorParticleEngine = dynamic(() => import("@/components/CursorParticleEngine"), {
// 	ssr: false,
// });

// export const dynamicConfig = "force-static"; // `export const dynamic` is reserved for page configs

export default function NotFound() {
	return (
		<>
			<CursorParticleEngine />
			<div className="h-screen w-full flex flex-col items-center justify-center bg-[#06060f] text-[#ffffff] font-mono text-center p-4">
				<h1 className="text-9xl font-bold text-[#06b6d4] opacity-20 select-none">
					404
				</h1>
				<div className="absolute inset-0 flex flex-col items-center justify-center z-10">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Signal Lost
					</h2>
					<p className="text-[#ffffff] mb-8 max-w-md">
						The requested resource could not be found on this
						server. It might have been secured or deleted.
					</p>
					<Link
						href="/"
						className="px-6 py-3 bg-[#a855f7]/20 border border-[#06b6d4]/50 text-[#06b6d4] rounded-full hover:bg-[#a855f7] hover:text-white transition-all hover:scale-105"
					>
						Return to Base
					</Link>
				</div>
			</div>
		</>
	);
}
