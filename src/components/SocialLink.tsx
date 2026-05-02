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
                        className={`text-[#475569] hover:text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
                                large
                                        ? "p-4 rounded-full hover:bg-white/5"
                                        : "p-1.5 rounded-full hover:bg-white/5"
                        }`}
                        style={
                                large
                                        ? {
                                                  border: "1px solid rgba(30,42,58,0.8)",
                                                  background: "rgba(13,13,26,0.4)",
                                          }
                                        : undefined
                        }
                        onMouseEnter={(e) => {
                                if (large) {
                                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(6,182,212,0.3)";
                                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 16px rgba(6,182,212,0.12)";
                                }
                        }}
                        onMouseLeave={(e) => {
                                if (large) {
                                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(30,42,58,0.8)";
                                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                                }
                        }}
                >
                        <Icon size={large ? 22 : 18} aria-hidden="true" role="img" />
                </a>
        );
}
