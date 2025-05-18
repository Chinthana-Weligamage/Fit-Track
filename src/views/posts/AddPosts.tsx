import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddPostForm from "@/components/forms/post/AddPostForm";

const AddPostModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"lg"}
          className="flex flex-row items-center justify-center gap-3 bg-amber-400"
        >
          <Plus />
          Add Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Add Post</DialogTitle>
          {/* <DialogDescription>Add Post form will be here</DialogDescription> */}
        </DialogHeader>
        <div className="flex items-center w-full">
          <AddPostForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPostModal;
