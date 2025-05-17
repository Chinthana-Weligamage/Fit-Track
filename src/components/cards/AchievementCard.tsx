import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, CornerUpRight, Trash, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import type { AchievementCard } from "@/types/CardTypes";
import MetadataBadge from "../badges/MetadataBadge";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import API_SERVICES from "@/lib/api_services";

const MySwal = withReactContent(Swal);

const AchievementCard: FC<any> = ({
  achievement,
  refresh,
}: {
  achievement: {
    imageUrls?: string[];
    videoUrl?: string;
    description?: string;
    id?: string;
    metadata?: any;
  };
  refresh: () => void;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    achievement.description || ""
  );
  // Ensure the Achievement type is imported or defined
  const isVideoUrl = (url: string) => {
    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"];
    const videoDomains = ["youtube.com", "youtu.be", "vimeo.com"];
    return (
      videoExtensions.some((ext) => url.toLowerCase().endsWith(ext)) ||
      videoDomains.some((domain) => url.toLowerCase().includes(domain))
    );
  };

  const handleDelete = async () => {
    if (!achievement.id) return;

    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "This achievement will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${API_SERVICES.AchievementDelete}/${achievement.id}`
        );

        await MySwal.fire({
          title: "Deleted!",
          text: "Your achievement has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setIsDeleted(true);
      } catch (error) {
        console.error("Delete failed:", error);
        await MySwal.fire({
          title: "Oops...",
          text: "Failed to delete the achievement.",
          icon: "error",
        });
      } finally {
        refresh();
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("description", editedDescription);

      // If you need to update the image, you would add it here:
      // formData.append("imageUtils", imageFile);

      await axios.put(
        `http://localhost:8080/api/achievements/${achievement.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsEditing(false);
      // You might want to refresh the achievements list here or update the local state
      await MySwal.fire({
        title: "Updated!",
        text: "Achievement updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Update failed:", error);
      await MySwal.fire({
        title: "Oops...",
        text: "Failed to update the achievement.",
        icon: "error",
      });
    } finally {
      refresh();
    }
  };

  if (isDeleted) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Card>
        {achievement.metadata && (
          <MetadataBadge metadata={achievement.metadata} />
        )}
        <CardHeader>
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-2">
                <Button onClick={handleUpdate}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <CardTitle>🏆 {achievement.description}</CardTitle>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4">
            {achievement.imageUrls?.map((url, index) => (
              <img
                key={`image-${index}`}
                src={url}
                alt={`Achievement ${index + 1}`}
                className="w-full h-auto max-h-80 object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
                }}
              />
            ))}

            {achievement.videoUrl &&
              isVideoUrl(String(achievement.videoUrl)) && (
                <div className="w-full aspect-video">
                  {String(achievement.videoUrl).includes("youtube.com") ||
                  String(achievement.videoUrl).includes("youtu.be") ? (
                    <iframe
                      className="w-full h-full rounded-lg"
                      src={String(achievement.videoUrl)
                        .replace("watch?v=", "embed/")
                        .replace("youtu.be/", "youtube.com/embed/")
                        .replace("shorts/", "embed/")}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video controls className="w-full h-full rounded-lg">
                      <source
                        src={String(achievement.videoUrl)}
                        type={`video/${String(achievement.videoUrl)
                          .split(".")
                          .pop()}`}
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}

            {!achievement.imageUrls?.length && !achievement.videoUrl && (
              <div className="w-full h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500">No media available</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between w-full">
            <Button
              title="Like"
              variant="outline"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart fill={isLiked ? "currentColor" : "none"} />
            </Button>

            <Button title="Share" variant="outline" size="icon">
              <CornerUpRight />
            </Button>

            <div className="flex gap-2">
              <Button
                title="Edit"
                variant="outline"
                size="icon"
                onClick={() => setIsEditing(true)}
              >
                <Pencil size={16} />
              </Button>
              <Button
                title="Delete"
                variant="destructive"
                size="icon"
                onClick={handleDelete}
              >
                <Trash />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AchievementCard;
