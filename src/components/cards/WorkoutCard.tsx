import { FC, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Heart, Check } from "lucide-react";
import { Button } from "../ui/button";
import type { Workout } from "@/types/CardTypes";
import MetadataBadge from "../badges/MetadataBadge";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard: FC<WorkoutCardProps> = ({ workout }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Card className="w-full max-w-md">
        {workout.metadata && <MetadataBadge metadata={workout.metadata} />}
        <CardHeader>
          <CardTitle className="text-center">{workout.name}</CardTitle>
          <CardDescription className="text-center">
            {workout.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col px-6 py-4 items-center justify-center">
            <Carousel setApi={setApi} className="w-full max-w-xs">
              <CarouselContent>
                {workout.exercises.map((exercise, index) => (
                  <CarouselItem key={`${exercise.name}-${index}`}>
                    <Card className="w-full h-full flex flex-col items-center justify-center bg-amber-400">
                      <CardContent className="flex flex-col items-center justify-center aspect-square p-4 gap-2">
                        <img
                          src={exercise.imageUrl || "/fallback-image.png"}
                          alt={exercise.name || "Exercise Image"}
                          className="w-32 h-32 object-contain rounded-md shadow-md"
                          loading="lazy"
                        />
                        <span className="text-2xl font-semibold text-center text-zinc-900">
                          {exercise.name}
                        </span>
                        <span className="text-sm text-center font-semibold text-zinc-600">
                          {exercise.description}
                        </span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
              Exercise {current} of {workout.exercises?.length}
            </div>
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
            <Button
              title="Share"
              variant={isCompleted ? "default" : "outline"}
              size="lg"
              onClick={() => setIsCompleted(!isCompleted)}
              className={isCompleted ? "bg-amber-400 text-zinc-900" : ""}
            >
              Mark as completed <Check />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WorkoutCard;
