import { useState } from "react";
import { Star } from "lucide-react";

type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
};

export const StarRating = ({ value, onChange }: StarRatingProps) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-6 w-6 cursor-pointer ${
            (hover || value) >= star
              ? "fill-yellow-500 text-yellow-500"
              : "text-gray-400"
          }`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
};
