import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://muhammad-sayyid.vercel.app";

	const lastModified = new Date();

	return [
		{
			url: baseUrl,
			lastModified: lastModified,
			changeFrequency: "weekly",
			priority: 1.0,
		},
	];
}
