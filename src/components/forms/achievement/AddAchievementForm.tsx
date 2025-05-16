"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
  image: z.instanceof(File).optional(),
  video: z.instanceof(File).optional(),
});

const AddAchievementForm = ({ userId }: { userId: string }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    description: string;
    imageUrls: string[];
    videoUrl: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("video", file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("description", values.description);

      if (values.image) {
        formData.append("image", values.image);
      }

      if (values.video) {
        formData.append("video", values.video);
      }

      const response = await fetch(
        `http://localhost:8080/api/achievements/share-achievement/1?userId=1`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to share achievement");
      }

      const responseData = await response.json();
      console.log("API Response:", responseData); // Debug log

      // Ensure imageUrls is always an array, even if empty or undefined
      const imageUrls = Array.isArray(responseData.imageUrls)
        ? responseData.imageUrls
        : responseData.imageUrl
        ? [responseData.imageUrl]
        : [];

      setSubmittedData({
        description: responseData.description || values.description,
        imageUrls: imageUrls,
        videoUrl: responseData.videoUrl || "",
      });

      toast.success("Achievement shared successfully!");

      // Reset form but keep previews for display
      form.reset({ description: "" });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to share achievement. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full mx-auto"
        >
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="I have achieved this in 10 months"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image (Optional)</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-2 h-40 rounded-md object-cover"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Video Upload */}
          <FormField
            control={form.control}
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video (Optional)</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                    />
                    {videoPreview && (
                      <video
                        src={videoPreview}
                        controls
                        className="mt-2 h-40 rounded-md object-cover"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-amber-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sharing..." : "Share Achievement"}
          </Button>
        </form>
      </Form>

      {/* Display submitted data */}
      {submittedData && (
        <div className="mt-8 p-6 border rounded-lg bg-gray-50 dark:bg-gray-900">
          <h3 className="text-lg font-semibold mb-4">Shared Achievement</h3>

          <div className="mb-4">
            <h4 className="font-medium">Description:</h4>
            <p>{submittedData.description}</p>
          </div>

          {/* Handle both array and single image cases */}
          {submittedData.imageUrls?.length > 0 ? (
            <div className="mb-4">
              <h4 className="font-medium">Images:</h4>
              <div className="flex flex-wrap gap-4 mt-2">
                {submittedData.imageUrls.map(
                  (url, index) =>
                    url && (
                      <img
                        key={index}
                        src={url}
                        alt={`Achievement ${index}`}
                        className="h-40 rounded-md object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )
                )}
              </div>
            </div>
          ) : (
            imagePreview && (
              <div className="mb-4">
                <h4 className="font-medium">Image:</h4>
                <img
                  src={imagePreview}
                  alt="Achievement"
                  className="mt-2 h-40 rounded-md object-cover"
                />
              </div>
            )
          )}

          {submittedData.videoUrl ? (
            <div className="mb-4">
              <h4 className="font-medium">Video:</h4>
              <video
                src={submittedData.videoUrl}
                controls
                className="mt-2 h-40 rounded-md object-cover"
              />
            </div>
          ) : (
            videoPreview && (
              <div className="mb-4">
                <h4 className="font-medium">Video:</h4>
                <video
                  src={videoPreview}
                  controls
                  className="mt-2 h-40 rounded-md object-cover"
                />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AddAchievementForm;
