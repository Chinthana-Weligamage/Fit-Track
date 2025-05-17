import { useEffect, useState } from "react";
import QuizCard from "@/components/cards/QuizCard";
import AddQuizModal from "./AddQuizModal";
import { fetchQuiz } from "@/lib/fetch-utils";
interface Quiz {
  id: number;
  questionText: string;
}
const ViewQuiz = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = (await fetchQuiz()) as Quiz[];
        // Sort quizzes by id for consistent display order
        const sorted = (res || []).sort((a: Quiz, b: Quiz) => a.id - b.id);
        setQuizzes(sorted);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto my-10 gap-6 px-4 overflow-y-auto">
      <div className="fixed top-10 right-10 z-50">
        <AddQuizModal />
      </div>

      {loading ? (
        <div className="flex items-center justify-center w-full h-64">
          <p className="text-lg text-gray-500">Loading quizzes...</p>
        </div>
      ) : quizzes.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">No quizzes available.</p>
      ) : (
        quizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
      )}
    </div>
  );
};

export default ViewQuiz;
