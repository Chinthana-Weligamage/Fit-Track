import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, CornerUpRight, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import MetadataBadge from "../badges/MetadataBadge";
import { getCurrentLoggedInUser } from "@/lib/utils";
import EditPostModal from "@/views/posts/EditPosts";
import axios from "axios";
import Swal from "sweetalert2";

export interface Post {
  id: number;
  title: string | null;
  description: string;
  imageUrl: string[];
  user: {
    id: number;
    username: string;
    email: string;
    password: string;
    authProvider: string;
    savedPlans: any[];
    following: any[];
    userAnswers: any[];
  };
  createdAt: string;
  likedCount: number;
  likedBy: any[];
}

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const user = getCurrentLoggedInUser();
  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This post will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await axios
          .delete(`http://localhost:8080/api/workoutPost/${post.id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your post has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          });
        window.location.reload();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            {Array.isArray(post.imageUrl) && post.imageUrl.length > 0 ? (
              post.imageUrl.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="max-w-full max-h-96 object-contain rounded-lg mb-2"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
                  }}
                />
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">
                No images available
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2 justify-between w-full">
            <Button
              title="Like"
              variant="outline"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart fill={isLiked ? "yellow" : "none"} />
            </Button>
            <div className="flex items-center gap-2">
              <EditPostModal post={post} />
              <Button
                title="Delete"
                variant="outline"
                size="icon"
                onClick={handleDelete}
              >
                <Trash2 />
              </Button>

              <Button title="Share" variant="outline" size="icon">
                <CornerUpRight />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;

// Define a new type interface for the post object
