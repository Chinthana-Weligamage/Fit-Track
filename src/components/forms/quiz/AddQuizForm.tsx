import { useEffect, useState } from "react";
import AddQuestionForm from "./AddQuestionForm";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import type { Quiz, Questions, Workout } from "@/types/CardTypes";
import API_SERVICES from "@/lib/api_services";
import { fetchWorkouts } from "@/lib/fetch-utils";
import Swal from "sweetalert2";

const AddQuizForm = () => {
  const [quizData, setQuizData] = useState<Quiz>({
    questions: [],
    name: "",
    description: "",
  });
  const [workoutPlanId, setWorkoutPlanId] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    fetchWorkouts().then((data) => setWorkouts(data));
  }, []);

  const addQuestion = (question: Questions) => {
    setQuizData((prev) => ({
      ...prev,
      questions: [...(prev.questions || []), question],
    }));
  };

  const removeQuestion = (index: number) => {
    setQuizData((prev) => ({
      ...prev,
      questions: (prev.questions || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!workoutPlanId) {
      Swal.fire({
        title: "Workout plan is required",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        return;
      });
    }

    if (!quizData.questions?.length) {
      Swal.fire({
        title: "Please add at least one question.",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        return;
      });
    }

    try {
      const payload = {
        workoutPlanId: parseInt(workoutPlanId ?? "0"),
        questions: (quizData.questions || []).map((q) => q.question),
      };

      const response = await axios.post(API_SERVICES.Quiz, payload);

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Quiz submitted successfully!",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        setQuizData({ questions: [], name: "", description: "" });
        setWorkoutPlanId(null);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to submit quiz. Please try again.",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while submitting the quiz. Please try again.",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="mx-auto w-full px-10 py-10 bg-zinc-900 text-white rounded-md grid grid-cols-2 gap-6">
      {/* Form Section */}
      <form
        className="col-span-1 flex flex-col gap-5 p-5"
        onSubmit={handleSubmit}
      >
        {/* Workout Plan Dropdown */}
        <div>
          <Label className="block mb-2">Workout Plan</Label>
          <select
            name="workoutPlanId"
            onChange={(e) => setWorkoutPlanId(e.target.value)}
            value={workoutPlanId || ""}
            className="w-full p-2 rounded bg-zinc-800 text-white"
          >
            <option value="">Select a workout</option>
            {workouts.map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.name}
              </option>
            ))}
          </select>
        </div>

        {/* Question Table */}
        {(quizData.questions?.length || 0) > 0 && (
          <div>
            <table className="w-full text-sm text-left text-amber-400">
              <thead>
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Question</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(quizData.questions || []).map((q, idx) => (
                  <tr key={idx} className="border-t border-amber-400">
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{q.question}</td>
                    <td className="px-4 py-2">
                      <Button
                        type="button"
                        className="bg-transparent text-white px-2 py-1 w-6 h-6 flex items-center justify-center"
                        onClick={() => removeQuestion(idx)}
                      >
                        ×
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Submit Button */}
        <Button className="w-full bg-yellow-400 text-black mt-4" type="submit">
          Create Quiz
        </Button>
      </form>

      {/* Add Questions Panel */}
      <div className="col-span-1 bg-zinc-800 p-6 rounded-xl">
        <Label className="block text-center text-lg mb-5">Add Questions</Label>
        <AddQuestionForm addQuestion={addQuestion} />
      </div>
    </div>
  );
};

export default AddQuizForm;
