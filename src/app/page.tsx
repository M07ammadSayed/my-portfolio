// import nextDynamic from "next/dynamic";
// import PageManager from "@/components/PageManager";
// import NavBar from "@/components/NavBar";
// import { Link } from "lucide-react";

// export const dynamic = "force-static";

// export const metadata = {
// 	title: "Muhammad Sayyid | Full-Stack Developer & AppSec Engineer",
// 	description:
// 		"Portfolio of Muhammad Sayyid, specializing in MERN stack and Application Security.",
// };

// const Hero = nextDynamic(() => import("@/components/Hero"), { ssr: true });
// const Skills = nextDynamic(() => import("@/components/Skills"), { ssr: true });
// const Projects = nextDynamic(() => import("@/components/Projects"), {
// 	ssr: true,
// });
// const Footer = nextDynamic(() => import("@/components/Footer"), { ssr: true });

// export default function Portfolio() {
// 	return (
// 		<PageManager>
// 			<NavBar />
// 			<Hero />
// 			<Skills />
// 			<Projects />
// 			<Footer />
// 			<div style={{ display: "none" }}>
// 				<Link href="/offline">Offline</Link>
// 			</div>
// 		</PageManager>
// 	);
// }


import PageManager from "@/components/PageManager";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Link from "next/link";

// export const dynamic = "force-static";

export const metadata = {
    title: "Muhammad Sayyid | Full-Stack Developer & AppSec Engineer",
    description: "Portfolio of Muhammad Sayyid, specializing in MERN stack and Application Security.",
};

export default function Portfolio() {
    return (
        <PageManager>
            <NavBar />
            <Hero />
            <Skills />
            <Projects />
            <Footer />
            <div style={{ display: "none" }}>
                <Link href="/offline">Offline</Link>
            </div>
        </PageManager>
    );
}