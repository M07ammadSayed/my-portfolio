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
			title={label}
			className={`group relative text-slate-500 hover:text-violet-300 transition-all duration-300 hover:scale-110 active:scale-95 ${
				large
					? "p-4 rounded-xl border border-white/6 hover:border-violet-500/30 hover:bg-violet-500/8 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
					: "p-2 rounded-lg hover:bg-violet-500/10"
			}`}
			style={{ backdropFilter: large ? "blur(8px)" : undefined }}
		>
			<Icon size={large ? 22 : 18} aria-hidden="true" role="img" className="transition-all duration-300" />
		</a>
	);
}
