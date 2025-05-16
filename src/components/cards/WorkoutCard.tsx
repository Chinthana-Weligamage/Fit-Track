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
import { Heart, Check, Trash2, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import type { Workout } from "@/types/CardTypes";
import MetadataBadge from "../badges/MetadataBadge";

interface WorkoutCardProps {
  workout: Workout;
}

interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  authorName: string;
  authorImage: string;
}

const WorkoutCard: FC<WorkoutCardProps> = ({ workout }) => {
  const [likes, setLikes] = useState(8);
  const [isLiked, setIsLiked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: "1",
    name: "Current User",
    image: "https://i.pravatar.cc/150?img=1",
  });

  // Sample data for demo purposes
  const sampleComments: Comment[] = [
    {
      id: "1",
      userId: "2",
      content:
        "This workout is amazing! I've been doing it for a week and already seeing results.",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      authorName: "Jane Smith",
      authorImage: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: "2",
      userId: "3",
      content:
        "The third exercise is too difficult for beginners. Any modifications?",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      authorName: "Mike Johnson",
      authorImage: "https://i.pravatar.cc/150?img=3",
    },
  ];

  // Fetch comments when component mounts
  useEffect(() => {
    if (workout.id) {
      // Simulate API call
      setIsLoading(true);
      setTimeout(() => {
        setComments(sampleComments);
        setIsLoading(false);
      }, 500);
    }
  }, [workout.id]);




  const ViewComments = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showComments, setShowComments] = useState(false);


    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetchComments();
          setWorkouts(res);
        } catch (error) {
          console.error("Failed to fetch workouts:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const fetchComments = async () => {
    // In a real app, this would call your API
    // Currently using sample data
    setIsLoading(true);
    setTimeout(() => {
      setComments(sampleComments);
      setIsLoading(false);
    }, 500);
  };

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || !workout.id) return;

    try {
      setIsLoading(true);

      // Simulate API call
      // In a real app, this would call your backend API
      setTimeout(() => {
        const newCommentObj: Comment = {
          id: `comment-${Date.now()}`,
          userId: currentUser.id,
          content: newComment,
          createdAt: new Date().toISOString(),
          authorName: currentUser.name,
          authorImage: currentUser.image,
        };

        setComments([...comments, newCommentObj]);
        setNewComment("");
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error posting comment:", error);
      setIsLoading(false);
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    try {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setComments(comments.filter((comment) => comment.id !== commentId));
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error deleting comment:", error);
      setIsLoading(false);
    }
  };

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
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
                {workout.exercises.map((exercise, index) => (
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
          <div className="flex items-center justify-between w-full mb-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 ${
                isLiked ? "text-yellow-500" : "text-gray-500"
              }`}
            >
              <Heart className={isLiked ? "fill-yellow-500" : ""} />
              <span className="font-medium ml-2">{likes}</span>
            </button>
            <Button
              title="Mark as completed"
              variant={isCompleted ? "default" : "outline"}
              size="sm"
              onClick={() => setIsCompleted(!isCompleted)}
              className={isCompleted ? "bg-amber-400 text-zinc-900" : ""}
            >
              <Check className="mr-2" />{" "}
              {isCompleted ? "Completed" : "Mark as completed"}
            </Button>
          </div>

          <Button
            variant="ghost"
            className="w-full flex items-center justify-center gap-2 mb-2"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4" />
            <span>
              {showComments ? "Hide Comments" : "Show Comments"} (
              {comments.length})
            </span>
          </Button>

          {showComments && (
            <>
              <Separator className="my-2" />

              {/* Comments List */}
              <div className="h-48 w-full rounded-md border p-2 mb-4 overflow-y-auto">
                {comments.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">
                    No comments yet. Be the first to comment!
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2 mb-4">
                      <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={comment.authorImage}
                          alt={comment.authorName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">
                            {comment.authorName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {comment.content}
                        </p>
                      </div>
                      {comment.userId === currentUser.id && (
                        <button
                          onClick={() => handleCommentDelete(comment.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Comment Input */}
              <div className="flex gap-2 w-full mt-2">
                <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={currentUser.image}
                    alt={currentUser.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleCommentSubmit();
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={handleCommentSubmit}
                    disabled={isLoading || !newComment.trim()}
                    className="h-10 w-10 p-0 flex items-center justify-center"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default WorkoutCard;
