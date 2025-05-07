import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddQuizForm from "@/components/forms/quiz/AddQuizForm";

const AddQuizModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"lg"}
          className="flex flex-row items-center justify-center gap-3 bg-amber-400"
        >
          <Plus />
          Add Quiz
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-center">Add Quiz</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <AddQuizForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuizModal;
