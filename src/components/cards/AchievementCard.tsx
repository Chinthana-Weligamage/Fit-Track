import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, CornerUpRight } from "lucide-react";
import { Button } from "../ui/button";
import type { AchievementCard } from "@/types/CardTypes";
import MetadataBadge from "../badges/MetadataBadge";

const AchievementCard: FC<AchievementCard> = ({ achievement }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Card>
        {achievement.metadata && (
          <MetadataBadge metadata={achievement.metadata} />
        )}
        <CardHeader>
          <CardTitle>🏆 {achievement.description}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            {achievement.imageUrls.map((url, index) => (
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
            {typeof achievement.video === "string" &&
            (achievement.video.includes("youtube.com") ||
              achievement.video.includes("youtu.be")) ? (
              <iframe
                className="w-full h-80 rounded-lg mb-2"
                src={achievement.video.replace("shorts/", "embed/")}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : typeof achievement.video === "string" &&
              achievement.video.endsWith(".mp4") ? (
              typeof achievement?.video === "object" &&
              (achievement?.video as unknown) instanceof File && (
                <video
                  controls
                  className="w-full h-auto rounded-lg mb-2"
                  onError={(e) => {
                    e.currentTarget.poster =
                      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
                  }}
                >
                  <source
                    src={URL.createObjectURL(achievement.video)}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )
            ) : null}
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

export default AchievementCard;
