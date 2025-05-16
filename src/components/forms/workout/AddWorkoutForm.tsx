import { useState } from "react";
import AddExerciseForm from "./AddExerciseForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import type { Workout, Exercise } from "@/types/CardTypes";

const AddWorkoutForm = () => {
  const [workoutData, setWorkoutData] = useState<Workout>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkoutData((prev) => ({ ...prev, [name]: value }));
  };

  const addExercise = (exercise: Exercise) => {
    setWorkoutData((prev) => ({
      ...prev,
      exercises: [...(prev.exercises || []), exercise],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!workoutData.name?.trim()) {
      alert("Workout name is required.");
      return;
    }

    if (workoutData.exercises?.length === 0) {
      alert("Please add at least one exercise.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", workoutData.name || "");
      formData.append("description", workoutData.description || "");
      workoutData.exercises?.forEach((exercise, index) => {
        formData.append(`exercises[${index}]`, JSON.stringify(exercise));
      });

      const response = await axios.post("/api/workouts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Workout submitted successfully!");
      } else {
        alert("Failed to submit workout. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        "An error occurred while submitting the workout. Please try again."
      );
    }
  };

  return (
    <div className=" mx-auto w-full px-10 py-10 bg-zinc-900 text-white rounded-md grid grid-cols-2">
      <form
        className="col-span-1 flex flex-col gap-5 p-5 h-full"
        onSubmit={handleSubmit}
      >
        <div>
          <Label className="block mb-2">Workout Name</Label>
          <Input
            type="text"
            name="name"
            value={workoutData.name || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white"
          />
        </div>

        <div>
          <Label className="block mb-2">Description</Label>
          <Input
            type="text"
            name="description"
            value={workoutData.description || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white"
          />
        </div>

        <div>
          <table className="mt-2 w-full text-sm text-left text-amber-400">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Exercise Name</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(workoutData.exercises || []).map((ex, idx) => (
                <tr key={idx} className="border-t border-amber-400">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{ex.name}</td>
                  <td className="px-4 py-2">
                    <Button
                      className="bg-transparent text-white px-2 py-1 rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => {
                        setWorkoutData((prev) => ({
                          ...prev,
                          exercises: (prev.exercises || []).filter(
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
            Create Workout
          </Button>
        </div>
      </form>

      <div className="col-span-1 bg-zinc-800 p-4 rounded-xl">
        <Label className="block text-center text-lg mb-5">
          Add Multiple Exercises
        </Label>
        <AddExerciseForm addExercise={addExercise} />
      </div>
    </div>
  );
};

export default AddWorkoutForm;
