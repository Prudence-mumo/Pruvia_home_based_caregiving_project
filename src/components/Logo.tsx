interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const sizes = { sm: 32, md: 44, lg: 56 };
  const px = sizes[size];
  const textColor = variant === 'light' ? '#ffffff' : '#0B3C5D';
  const subTextColor = variant === 'light' ? 'rgba(255,255,255,0.85)' : '#328CC1';

  return (
    <div className="flex items-center gap-2.5">
      <svg width={px} height={px} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer circle */}
        <circle cx="28" cy="28" r="28" fill="#0B3C5D" />
        {/* Inner teal ring */}
        <circle cx="28" cy="28" r="22" fill="#328CC1" opacity="0.15" />
        {/* Home shape */}
        <path d="M28 14L14 26V42H22V34H34V42H42V26L28 14Z" fill="white" opacity="0.95" />
        {/* Gold cross / plus on home */}
        <rect x="25.5" y="19" width="5" height="10" rx="1" fill="#D9B310" />
        <rect x="21" y="22" width="14" height="4" rx="1" fill="#D9B310" />
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className="font-bold tracking-wide"
          style={{
            fontFamily: 'Merriweather, serif',
            fontSize: size === 'sm' ? '13px' : size === 'md' ? '16px' : '20px',
            color: textColor,
            lineHeight: 1.1,
          }}
        >
          PRUVIA
        </span>
        <span
          style={{
            fontSize: size === 'sm' ? '9px' : size === 'md' ? '11px' : '13px',
            color: subTextColor,
            letterSpacing: '0.08em',
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          HOME-BASED CARE
        </span>
      </div>
    </div>
  );
}
