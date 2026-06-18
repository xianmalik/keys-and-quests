const base = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})

// A price tag — used for Brand.
export const BrandIcon = ({ size = 16, className, ...rest }) => (
  <svg {...base(size)} className={className} {...rest}>
    <path d="M3 3h7l11 11-8 8L3 14V3Z" />
    <circle cx="7.5" cy="7.5" r="1.4" fill="currentColor" stroke="none" />
  </svg>
)

// A switch housing viewed from above, with the cross-shaped stem slot — used for Switch Type.
export const SwitchTypeIcon = ({ size = 16, className, ...rest }) => (
  <svg {...base(size)} className={className} {...rest}>
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M12 8v8M8 12h8" />
  </svg>
)

// A force/travel curve with the actuation point marked — used for Actuation Point.
export const ActuationIcon = ({ size = 16, className, ...rest }) => (
  <svg {...base(size)} className={className} {...rest}>
    <path d="M4 4v16h16" />
    <path d="M6.5 16c2.3-1 3-6.5 5.5-8.5s4.5 1.5 7 .5" />
    <circle cx="11" cy="8.6" r="1.4" fill="currentColor" stroke="none" />
  </svg>
)

// A single lube droplet — used for Lube Status.
export const LubeIcon = ({ size = 16, className, ...rest }) => (
  <svg {...base(size)} className={className} {...rest}>
    <path d="M12 3c4 5 7 8.7 7 12a7 7 0 1 1-14 0c0-3.3 3-7 7-12Z" />
  </svg>
)

// A switch top housing, with the clip rails and LED/light-pipe slot — used for Top Housing.
export const TopHousingIcon = ({ size = 16, className, ...rest }) => (
  <svg {...base(size)} className={className} {...rest}>
    <rect x="5" y="7" width="14" height="13" rx="2" />
    <path d="M9 7V4.5M15 7V4.5" />
    <rect x="10.5" y="4" width="3" height="3" rx="0.5" />
  </svg>
)

// A switch bottom housing, with its contact pins/legs — used for Bottom Housing.
export const BottomHousingIcon = ({ size = 16, className, ...rest }) => (
  <svg {...base(size)} className={className} {...rest}>
    <rect x="5" y="4" width="14" height="13" rx="2" />
    <path d="M9 17v3M12 17v3M15 17v3" />
  </svg>
)

// An MX-style cross stem — used for Stem Material.
export const StemMaterialIcon = ({ size = 16, className, ...rest }) => (
  <svg {...base(size)} className={className} {...rest}>
    <path d="M10 3h4v6h6v4h-6v6h-4v-6H4v-4h6V3Z" />
  </svg>
)
