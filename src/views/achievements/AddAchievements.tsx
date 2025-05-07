import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddAchievementForm from "@/components/forms/achievement/AddAchievementForm";

const AddAchievementModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"lg"}
          className="flex flex-row items-center justify-center gap-3 bg-amber-400"
        >
          <Plus />
          Add Achievement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Add Achievement</DialogTitle>
          {/* <DialogDescription>
            Add Achievement form will be here
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <AddAchievementForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAchievementModal;
