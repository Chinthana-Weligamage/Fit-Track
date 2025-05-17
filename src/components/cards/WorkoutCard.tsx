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
import { Heart, Check, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Workout } from "@/types/CardTypes";
import MetadataBadge from "../badges/MetadataBadge";
import { getCurrentLoggedInUser } from "@/lib/utils";
import axios from "axios";
import Swal from "sweetalert2";
import API_SERVICES from "@/lib/api_services";

interface WorkoutCardProps {
  workout: Workout;
  onDeleted?: () => void;
  onUpdated?: () => void;
}

const WorkoutCard: FC<WorkoutCardProps> = ({
  workout,
  onDeleted,
  onUpdated,
}) => {
  const [likes, setLikes] = useState(8);
  const [isLiked, setIsLiked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const user = getCurrentLoggedInUser();

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This workout will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/workouts/${workout.id}`);

        await Swal.fire({
          title: "Deleted!",
          text: "Your workout has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        onDeleted?.();
      } catch (error) {
        console.error("Delete failed:", error);
        await Swal.fire({
          title: "Oops...",
          text: "Failed to delete the workout.",
          icon: "error",
        });
      }
    }
  };

  const updateStatus = async () => {
    try {
      const user = getCurrentLoggedInUser();
      await axios.put(
        `${API_SERVICES.WorkoutPlans}/complete-exercise/${user.id}/${workout.id}/${workout.exercises?.length}`
      );
      setIsCompleted(!isCompleted);
      onUpdated?.();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

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
                {workout.exercises?.map((exercise, index) => (
                  <CarouselItem key={`${exercise.name}-${index}`}>
                    <Card className="w-full h-full flex flex-col items-center justify-center bg-amber-400">
                      <CardContent className="flex flex-col items-center justify-center aspect-square p-4 gap-2">
                        <img
                          src={exercise.imageUrl || "/fallback-image.png"}
                          alt={exercise.name || "Exercise Image"}
                          className="w-full h-70 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg"
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

        <CardFooter className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 ${
                isLiked ? "text-yellow-500" : "text-gray-500"
              }`}
            >
              <Heart className={isLiked ? "fill-yellow-500" : ""} />
              <span className="font-medium ml-2">{likes}</span>
            </button>

            {workout.creatorId === user?.id && (
              <div className="flex gap-2">
                <Button
                  title="Delete"
                  variant="destructive"
                  size="icon"
                  onClick={handleDelete}
                >
                  <Trash />
                </Button>
              </div>
            )}

            <Button
              title="Mark as completed"
              variant={isCompleted ? "default" : "outline"}
              size="sm"
              onClick={updateStatus}
              className={isCompleted ? "bg-amber-400 text-zinc-900" : ""}
            >
              <Check className="mr-2" />
              {isCompleted ? "Completed" : "Mark as completed"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WorkoutCard;
