import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import axios from "axios";
import API_SERVICES from "@/lib/api_services";
import { Post } from "@/components/cards/PostCard";

const EditPostForm: React.FC<{ post: Post }> = ({ post }) => {
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (type === "image") {
      setImage(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please provide a description.",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("description", description);
      if (image) formData.append("imageUrls", image);

      await axios.put(
        `http://localhost:8080/api/workoutPost/${post.id}`,
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Post Updated successfully!",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      }).then(() => window.location.reload());

      // Reset form
      setDescription("");
      setImage(null);
      setImagePreview(null);
    } catch (error: any) {
      console.error("Error submitting post:", error);
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Failed to share post.";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 flex w-full flex-col gap-6">
      {/* Description */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="post-description">Description</Label>
        <Input
          id="post-description"
          type="text"
          placeholder="Describe your post..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-zinc-800 text-white"
        />
      </div>

      {/* Image Upload */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="post-image">Upload Image (Optional)</Label>
        <Input
          id="post-image"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "image")}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Post preview"
            className="mt-2 h-40 object-cover rounded-md"
          />
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-yellow-400 text-black"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sharing..." : "Update Post"}
      </Button>
    </form>
  );
};

export default EditPostForm;
