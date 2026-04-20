export default function SocialLink({
	href,
	icon: Icon,
	label,
	large = false,
}: {
	href: string;
	icon: React.ElementType;
	label?: string;
	large?: boolean;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="me noopener noreferrer"
			// aria-label={label || "Social Link"}
			title={label}
			className={`text-slate-400 hover:text-white transition-all hover:scale-110 active:scale-95 active:text-cyan-400 ${
				large
					? "p-4 bg-slate-900/50 rounded-full border border-slate-800 hover:border-cyan-500/50"
					: ""
			}`}
		>
			<Icon size={large ? 24 : 20} aria-hidden="true" role="img" />
		</a>
	);
}
