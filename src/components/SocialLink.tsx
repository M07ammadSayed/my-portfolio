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
			className={`text-[#ffffff] hover:text-white transition-all hover:scale-110 active:scale-95 active:text-[#06b6d4] ${
				large
					? "p-4 bg-[#080810]/50 rounded-full border border-slate-800 hover:border-[#06b6d4]/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
					: ""
			}`}
		>
			<Icon size={large ? 24 : 20} aria-hidden="true" role="img" />
		</a>
	);
}
