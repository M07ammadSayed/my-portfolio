import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: "/api/",
			},
			{
				userAgent: "magicsearchbot",
				disallow: "/",
			},
		],
		sitemap: "https://muhammad-sayyid.vercel.app/sitemap.xml",
	};
}
