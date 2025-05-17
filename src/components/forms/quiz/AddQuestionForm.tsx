import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Questions } from "@/types/CardTypes";

interface AddQuestionFormProps {
  addQuestion: (question: Questions) => void;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ addQuestion }) => {
  const [formData, setFormData] = useState<Questions>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, image: file }));
  };

  const addNewQuestion = () => {
    if (!formData.question) return;
    addQuestion(formData);
    setFormData({});
    (document.getElementById("question-image") as HTMLInputElement).value = "";
  };

  return (
    <div className="space-y-3 w-full mx-auto py-10  p-5 rounded-lg text-white">
      <div>
        <Label className="block mb-2">Question Name</Label>
        <Input
          type="text"
          name="name"
          value={formData.question || ""}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div>
        <Label className="block mb-2">Description</Label>
        <Input
          type="text"
          name="description"
          value={formData.question || ""}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div>
        <Label className="block mb-2">Order</Label>
        <Input
          type="text"
          name="order"
          value={formData.question || ""}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div>
        <Label className="block mb-2">Upload Image</Label>
        <Input
          id="question-image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <Button className="w-full bg-yellow-400" onClick={addNewQuestion}>
        Add Question
      </Button>
    </div>
  );
};

export default AddQuestionForm;
