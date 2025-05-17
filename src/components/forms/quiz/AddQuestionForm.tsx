import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Questions } from "@/types/CardTypes";

interface AddQuestionFormProps {
  addQuestion: (question: Questions) => void;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ addQuestion }) => {
  const [formData, setFormData] = useState<Questions>({
    question: "",
  } as Questions);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addNewQuestion = () => {
    if (!formData.question?.trim()) return;
    addQuestion(formData);
    setFormData({ question: "" });
  };

  return (
    <div className="space-y-3 w-full mx-auto py-10 p-5 rounded-lg text-white">
      <div>
        <Label className="block mb-2" htmlFor="question">
          Question
        </Label>
        <Input
          id="question"
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <Button
        className="w-full bg-yellow-400 text-black"
        onClick={addNewQuestion}
      >
        Add Question
      </Button>
    </div>
  );
};

export default AddQuestionForm;
