import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddWorkoutForm from "@/components/forms/workout/AddWorkoutForm";

const AddWorkoutModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"lg"}
          className="flex flex-row items-center justify-center gap-3 bg-amber-400"
        >
          <Plus />
          Add Workout
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center">Add Workout</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <AddWorkoutForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkoutModal;
