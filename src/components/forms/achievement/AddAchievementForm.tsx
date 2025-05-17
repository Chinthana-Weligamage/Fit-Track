import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import axios from "axios";
import API_SERVICES from "@/lib/api_services";
import type { Workout } from "@/types/CardTypes";
import { fetchWorkouts } from "@/lib/fetch-utils";

interface AddAchievementFormProps {
  userId: string;
}

const AddAchievementForm: React.FC<AddAchievementFormProps> = ({ userId }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workoutPlanId, setWorkoutPlanId] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (type === "image") {
      setImage(file);
      setImagePreview(previewUrl);
    } else {
      setVideo(file);
      setVideoPreview(previewUrl);
    }
  };

  useEffect(() => {
    fetchWorkouts().then((data) => setWorkouts(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please provide a description.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("description", description);
      if (image) formData.append("image", image);
      if (video) formData.append("video", video);

      const endpoint = `${API_SERVICES.Achievements}/share-achievement/${workoutPlanId}?userId=${userId}`;
      await axios.post(endpoint, formData);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Achievement shared successfully!",
      });

      // Reset form
      setDescription("");
      setImage(null);
      setVideo(null);
      setImagePreview(null);
      setVideoPreview(null);
    } catch (error: any) {
      console.error("Error submitting achievement:", error);
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Failed to share achievement.";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-zinc-900 text-white rounded-lg"
    >
      {/* Workout Plan Dropdown */}
      <div>
        <Label className="block mb-2">Workout Plan</Label>
        <select
          name="workoutPlanId"
          onChange={(e) => setWorkoutPlanId(e.target.value)}
          value={workoutPlanId || ""}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        >
          <option value="">Select a workout</option>
          {workouts?.map((workout) => (
            <option key={workout.id} value={workout.id}>
              {workout.name}
            </option>
          ))}
        </select>
      </div>
      {/* Description */}
      <div>
        <Label htmlFor="achievement-description">Description</Label>
        <Input
          id="achievement-description"
          type="text"
          placeholder="Describe your achievement..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-zinc-800 text-white"
        />
      </div>

      {/* Image Upload */}
      <div>
        <Label htmlFor="achievement-image">Upload Image (Optional)</Label>
        <Input
          id="achievement-image"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "image")}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Achievement preview"
            className="mt-2 h-40 object-cover rounded-md"
          />
        )}
      </div>

      {/* Video Upload */}
      <div>
        <Label htmlFor="achievement-video">Upload Video (Optional)</Label>
        <Input
          id="achievement-video"
          type="file"
          accept="video/*"
          onChange={(e) => handleFileChange(e, "video")}
        />
        {videoPreview && (
          <video
            src={videoPreview}
            controls
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
        {isSubmitting ? "Sharing..." : "Share Achievement"}
      </Button>
    </form>
  );
};

export default AddAchievementForm;
