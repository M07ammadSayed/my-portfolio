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
			aria-label={label || "Social Link"}
			title={label}
			className={`text-slate-400 hover:text-[#06b6d4] transition-all duration-300 hover:scale-105 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center ${
				large
					? "p-3.5 bg-white/[0.02] rounded-full border border-white/[0.06] hover:border-[#06b6d4]/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)]"
					: "p-2 hover:bg-white/[0.04] rounded-lg"
			}`}
		>
			<Icon size={large ? 20 : 16} aria-hidden="true" />
		</a>
	);
}
