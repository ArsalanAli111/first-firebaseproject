
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 180 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Scent Sample"
    >
      <text
        x="0"
        y="30"
        fontFamily="Playfair Display, serif"
        fontSize="28"
        fontWeight="bold"
        fill="hsl(var(--primary))"
      >
        Scent
      </text>
      <text
        x="85"
        y="30"
        fontFamily="Playfair Display, serif"
        fontStyle="italic"
        fontSize="28"
        fill="hsl(var(--accent))"
      >
        Sample
      </text>
    </svg>
  );
}
