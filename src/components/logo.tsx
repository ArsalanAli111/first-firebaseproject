
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 180 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Oud Mystique"
    >
      <text
        x="0"
        y="30"
        fontFamily="Playfair Display, serif"
        fontSize="28"
        fontWeight="bold"
        fill="hsl(var(--primary))"
      >
        Oud
      </text>
      <text
        x="65"
        y="30"
        fontFamily="Playfair Display, serif"
        fontStyle="italic"
        fontSize="28"
        fill="hsl(var(--accent))"
      >
        Mystique
      </text>
    </svg>
  );
}
