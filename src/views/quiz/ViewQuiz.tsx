import QuizCard from "@/components/cards/QuizCard";
import AddQuizModal from "./AddQuizModal";
import { Quiz } from "@/types/CardTypes";
import { useEffect, useState } from "react";
import { fetchQuiz } from "@/lib/fetch-utils";
import { s } from "node_modules/framer-motion/dist/types.d-DSjX-LJB";
import { f } from "node_modules/react-router/dist/development/route-data-C12CLHiN.d.mts";

const sampleQuizs: Quiz[] = [
  {
    metadata: {
      authorName: "John Doe",
      publishedDate: "07th May 2023",
      authorImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    name: "Fitness Basics",
    description: "Test your knowledge on fitness fundamentals",
    questions: [
      {
        question:
          "What is the recommended amount of daily physical activity for adults?",
        options: ["30 minutes", "60 minutes", "90 minutes", "120 minutes"],
        answer: "30 minutes",
      },
      {
        question: "Which of the following is a cardiovascular exercise?",
        options: ["Push-ups", "Squats", "Running", "Deadlifts"],
        answer: "Running",
      },
    ],
  },
  {
    metadata: {
      authorName: "John Doe",
      publishedDate: "07th May 2023",
      authorImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    name: "Healthy Eating",
    description: "Learn about balanced diets and nutrition",
    questions: [
      {
        question: "Which nutrient is essential for muscle repair?",
        options: ["Carbohydrates", "Proteins", "Fats", "Vitamins"],
        answer: "Proteins",
      },
      {
        question: "What is the primary source of energy for the body?",
        options: ["Proteins", "Fats", "Carbohydrates", "Minerals"],
        answer: "Carbohydrates",
      },
    ],
  },
];
const ViewQuiz = () => {
  const [quizes, setQuizs] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetchQuiz();
        setQuizs(res);
      } catch (error) {
        console.error("Error fetching quizs:", error);
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
      {loading && (
        <div className="flex items-center justify-center w-full h-64">
          <p className="text-lg text-gray-500">Loading quizs...</p>
        </div>
      )}
      {quizes?.map((quiz, index) => (
        <QuizCard
          key={index}
          quiz={{
            name: quiz.name,
            description: quiz.description,
            questions: Array.isArray(quiz.questions) ? quiz.questions : [],
          }}
        />
      ))}
    </div>
  );
};

export default ViewQuiz;
