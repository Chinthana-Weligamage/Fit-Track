import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";

interface QuizCardProps {
  quiz: {
    id: number;
    questionText: string;
  };
}

const QuizCard: FC<QuizCardProps> = ({ quiz }) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (value: string) => {
    setAnswer(value);
  };

  const handleSubmit = () => {
    if (!answer.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please enter an answer before submitting.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Your answer has been submitted.",
    });
    setAnswer(""); // Optionally clear answer after submit
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Card className="w-full max-w-2xl bg-zinc-900 text-white p-6">
        <CardHeader>
          <CardTitle className="text-center text-xl">Question</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="font-semibold">{quiz.questionText}</p>
            <Input
              type="text"
              placeholder="Your answer..."
              value={answer}
              onChange={(e) => handleChange(e.target.value)}
              className="bg-zinc-800 text-white"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 w-full rounded-full bg-amber-300 text-black font-semibold hover:bg-amber-400 transition"
          >
            Submit Answer
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCard;
