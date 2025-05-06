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
import type { QuizCard } from "@/types/CardTypes";
import MetadataBadge from "../badges/MetadataBadge";

const QuizCard: FC<QuizCard> = ({ quiz }) => {
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
      <Card>
        {quiz.metadata && <MetadataBadge metadata={quiz.metadata} />}
        <CardHeader>
          <CardTitle className="text-center">{quiz.name}</CardTitle>
          <CardDescription className="text-center">
            {quiz.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col px-10 py-3 items-center justify-center">
            <Carousel setApi={setApi} className="w-full max-w-xs">
              <CarouselContent>
                {quiz.questions.map((question, index) => (
                  <CarouselItem key={index}>
                    <Card className="w-full h-full flex flex-col items-center justify-center bg-amber-400">
                      <CardContent className="flex flex-col items-center justify-center aspect-square p-6 gap-2">
                        <span className="text-2xl font-semibold text-center text-zinc-900">
                          {question.question}
                        </span>
                        {question.options.map((answer, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-center gap-2"
                          >
                            <input type="radio" name="answer" value={answer} />
                            <label className="text-sm text-center font-semibold text-zinc-600">
                              {answer}
                            </label>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
              Question {current} of {quiz.questions?.length}
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

export default QuizCard;
