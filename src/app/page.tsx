import dynamic from "next/dynamic";
import PageManager from "@/components/PageManager";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import VisualBackground from "@/components/VisualBackground";
import { Link } from "lucide-react";

const Skills = dynamic(() => import("@/components/Skills"), { ssr: true });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
	ssr: true,
});
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), {
	ssr: true,
});

export default function Portfolio() {
	return (
		<PageManager>
			<CustomCursor />
			<VisualBackground />
			<NavBar />
			<Hero />
			<Skills />
			<Projects />
			<Footer />
			<ScrollToTop />
			<div style={{ display: "none" }}>
				<Link href="/offline.html">Offline</Link>
			</div>
		</PageManager>
	);
}
