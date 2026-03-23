import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
export const dynamic = "force-static";

export default function NotFound() {
	return (
		<>
			<CustomCursor />
			<div className="h-screen w-full flex flex-col items-center justify-center bg-[#020617] text-slate-200 font-mono text-center p-4">
				<h1 className="text-9xl font-bold text-cyan-500 opacity-20 select-none">
					404
				</h1>
				<div className="absolute inset-0 flex flex-col items-center justify-center z-10">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Signal Lost
					</h2>
					<p className="text-slate-400 mb-8 max-w-md">
						The requested resource could not be found on this
						server. It might have been secured or deleted.
					</p>
					<Link
						href="/"
						className="px-6 py-3 bg-cyan-600/20 border border-cyan-500/50 text-cyan-400 rounded-full hover:bg-cyan-600 hover:text-white transition-all hover:scale-105"
					>
						Return to Base
					</Link>
				</div>
			</div>
		</>
	);
}
