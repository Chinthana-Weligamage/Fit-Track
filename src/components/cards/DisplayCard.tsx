import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, CornerUpRight } from "lucide-react";
import { Button } from "../ui/button";

interface DisplayCardProps {
  data: {
    title: string;
    description: string;
    imageUrls: string[];
  };
}

const DisplayCard: React.FC<DisplayCardProps> = ({ data }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            {data.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Image ${index + 1}`}
                className="w-xl h-auto rounded-lg mb-2"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
                }}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between w-full">
            <Button
              title="Like"
              variant="outline"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart fill={isLiked ? "yellow" : "none"} />
            </Button>

            <Button title="Share" variant="outline" size="icon">
              <CornerUpRight />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DisplayCard;
