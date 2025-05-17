import { useState } from "react";
import AddQuestionForm from "./AddQuestionForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import type { Quiz, Questions } from "@/types/CardTypes";
import API_SERVICES from "@/lib/api_services";
import { getCurrentLoggedInUser } from "@/lib/utils";

const AddQuizForm = () => {
  const [quizData, setQuizData] = useState<Quiz>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuizData((prev) => ({ ...prev, [name]: value }));
  };

  const addQuestion = (question: Questions) => {
    setQuizData((prev) => ({
      ...prev,
      questions: [...(prev.questions || []), question],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quizData.name?.trim()) {
      alert("Quiz name is required.");
      return;
    }

    if (quizData.questions?.length === 0) {
      alert("Please add at least one question.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", quizData.name || "");
      formData.append("description", quizData.description || "");
      quizData.questions?.forEach((question, index) => {
        formData.append(`questions[${index}]`, JSON.stringify(question));
      });
      const user = getCurrentLoggedInUser();
      const response = await axios.post(
        `${API_SERVICES.Quiz}/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Quiz submitted successfully!");
      } else {
        alert("Failed to submit quiz. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting the quiz. Please try again.");
    }
  };

  return (
    <div className=" mx-auto w-full px-10 py-10 bg-zinc-900 text-white rounded-md grid grid-cols-2">
      <form
        className="col-span-1 flex flex-col gap-5 p-5 h-full"
        onSubmit={handleSubmit}
      >
        <div>
          <Label className="block mb-2">Quiz Name</Label>
          <Input
            type="text"
            name="name"
            value={quizData.name || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white"
          />
        </div>

        <div>
          <Label className="block mb-2">Description</Label>
          <Input
            type="text"
            name="description"
            value={quizData.description || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white"
          />
        </div>

        <div>
          <table className="mt-2 w-full text-sm text-left text-amber-400">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Question Name</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(quizData.questions || []).map((ex, idx) => (
                <tr key={idx} className="border-t border-amber-400">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{ex.question}</td>
                  <td className="px-4 py-2">
                    <Button
                      className="bg-transparent text-white px-2 py-1 rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => {
                        setQuizData((prev) => ({
                          ...prev,
                          questions: (prev.questions || []).filter(
                            (_, i) => i !== idx
                          ),
                        }));
                      }}
                    >
                      x
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-end justify-center h-full">
          <Button className="w-full bg-yellow-400 mb-9" type="submit">
            Create Quiz
          </Button>
        </div>
      </form>

      <div className="col-span-1 bg-zinc-800 p-4 rounded-xl">
        <Label className="block text-center text-lg mb-5">
          Add Multiple Questions
        </Label>
        <AddQuestionForm addQuestion={addQuestion} />
      </div>
    </div>
  );
};

export default AddQuizForm;
