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
			className={`group relative text-slate-400 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 ${
				large
					? "p-4 rounded-2xl border border-white/5 hover:border-fuchsia-500/40 hover:bg-fuchsia-500/10 hover:shadow-[0_0_25px_rgba(217,70,239,0.3)] bg-white/5"
					: "p-2 rounded-xl hover:bg-fuchsia-500/10 hover:text-fuchsia-300"
			}`}
			style={{ backdropFilter: large ? "blur(12px)" : undefined }}
		>
			<Icon size={large ? 24 : 18} aria-hidden="true" role="img" className="transition-all duration-300 relative z-10" />
			{large && <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
		</a>
	);
}
