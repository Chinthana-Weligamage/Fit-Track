import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";
import EditPostForm from "@/components/forms/post/EditPostForm";
import type { Post } from "@/types/CardTypes";

const EditPostModal = ({ post }: { post: Post }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="Edit" variant="outline" size="icon">
          <PencilLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Update Post</DialogTitle>
        </DialogHeader>
        <div className="flex items-center w-full">
          <EditPostForm post={post} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostModal;
