import { useState } from "react";
import AddExerciseForm from "./AddExerciseForm";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!workoutData.name?.trim()) {
      alert("Workout name is required.");
      return;
    }

    if (workoutData.exercises?.length === 0) {
      alert("Please add at least one exercise.");
      return;
    }

    console.log("Submitted Workout:", workoutData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" mx-auto w-full px-10 py-10 bg-zinc-900 text-white rounded-md grid grid-cols-2"
    >
      <div className="col-span-1 flex flex-col gap-5 p-5 h-full">
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
      </div>

      <div className="col-span-1 bg-zinc-800 p-4 rounded-xl">
        <Label className="block text-center text-lg mb-5">
          Add Multiple Exercises
        </Label>
        <AddExerciseForm addExercise={addExercise} />
      </div>
    </form>
  );
};

export default AddWorkoutForm;
