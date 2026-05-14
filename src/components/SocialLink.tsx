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
			className={`text-slate-300 hover:text-[#06b6d4] transition-all duration-200 hover:scale-110 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center ${
				large
					? "p-4 bg-[#080810]/50 rounded-full border border-slate-800 hover:border-[#06b6d4]/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
					: "p-2"
			}`}
		>
			<Icon size={large ? 22 : 18} aria-hidden="true" />
		</a>
	);
}
