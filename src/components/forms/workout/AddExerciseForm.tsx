import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Exercise } from "@/types/CardTypes";

interface AddExerciseFormProps {
  addExercise: (exercise: Exercise) => void;
}

const AddExerciseForm: React.FC<AddExerciseFormProps> = ({ addExercise }) => {
  const [formData, setFormData] = useState<Exercise>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const response = await axios.post("/api/upload", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData((prev) => ({ ...prev, imageUrl: response.data.url }));
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const addNewExercise = async () => {
    if (!formData.name) return;
    addExercise(formData);
    setFormData({});
  };

  return (
    <div className="space-y-3 w-full mx-auto py-10  p-5 rounded-lg text-white">
      <div>
        <Label className="block mb-2">Exercise Name</Label>
        <Input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div>
        <Label className="block mb-2">Description</Label>
        <Input
          type="text"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div>
        <Label className="block mb-2">Order</Label>
        <Input
          type="text"
          name="order"
          value={formData.order || ""}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div>
        <Label className="block mb-2">Upload Image</Label>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        {formData.imageUrl && (
          <img
            src={formData.imageUrl || ""}
            alt="Uploaded preview"
            className="mt-2 h-32 rounded-md object-cover"
          />
        )}
      </div>

      <Button className="w-full bg-yellow-400" onClick={addNewExercise}>
        Add Exercise
      </Button>
    </div>
  );
};

export default AddExerciseForm;
