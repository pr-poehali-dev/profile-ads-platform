interface CoinRatingProps {
  rating: number; // 1–5
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  interactive?: boolean;
  onRate?: (value: number) => void;
}

export default function CoinRating({
  rating,
  size = "md",
  showLabel = false,
  interactive = false,
  onRate,
}: CoinRatingProps) {
  const sizes = { sm: "text-base", md: "text-xl", lg: "text-2xl" };
  const gaps = { sm: "gap-0.5", md: "gap-1", lg: "gap-1.5" };

  return (
    <div className="flex items-center gap-2">
      <div className={`flex items-center ${gaps[size]}`}>
        {[1, 2, 3, 4, 5].map(i => (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate?.(i)}
            className={`${sizes[size]} leading-none transition-transform ${
              interactive ? "hover:scale-125 cursor-pointer" : "cursor-default"
            } ${i <= rating ? "opacity-100" : "opacity-25 grayscale"}`}
            title={interactive ? `Оценить ${i} монет` : undefined}
          >
            🪙
          </button>
        ))}
      </div>
      {showLabel && (
        <span className="text-sm font-semibold text-amber-600">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
