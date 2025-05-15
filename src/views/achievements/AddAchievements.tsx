"use client";

import {
  Dialog,
  DialogContent,
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
          className="flex flex-row items-center justify-center gap-3 bg-amber-400 hover:bg-amber-500"
        >
          <Plus />
          Add Achievement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-center">Add Achievement</DialogTitle>
        </DialogHeader>
        <AddAchievementForm userId="1" />
      </DialogContent>
    </Dialog>
  );
};

export default AddAchievementModal;
