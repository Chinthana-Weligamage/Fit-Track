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
import axios from "axios";
import Swal from "sweetalert2";
import API_SERVICES from "@/lib/api_services";
import { getCurrentLoggedInUser } from "@/lib/utils";

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

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue(type, file);
      const previewUrl = URL.createObjectURL(file);
      type === "image"
        ? setImagePreview(previewUrl)
        : setVideoPreview(previewUrl);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("description", values.description);

      if (values.image) formData.append("image", values.image);
      if (values.video) formData.append("video", values.video);

      const response = await axios.post(
        `http://localhost:8080/api/achievements/share-achievement/1?userId=${userId}`,
        formData
      );

      const data = response.data;

      const imageUrls = Array.isArray(data.imageUrls)
        ? data.imageUrls
        : data.imageUrl
        ? [data.imageUrl]
        : [];

      setSubmittedData({
        description: data.description || values.description,
        imageUrls,
        videoUrl: data.videoUrl || "",
      });

      toast.success("Achievement shared successfully!");
      form.reset({ description: "" });
    } catch (error) {
      console.error("Form submission error", error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to share achievement. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full mx-auto"
        >
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

          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Image (Optional)</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "image")}
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

          <FormField
            control={form.control}
            name="video"
            render={() => (
              <FormItem>
                <FormLabel>Video (Optional)</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange(e, "video")}
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

      {submittedData && (
        <div className="mt-8 p-6 border rounded-lg bg-gray-50 dark:bg-gray-900">
          <h3 className="text-lg font-semibold mb-4">Shared Achievement</h3>

          <div className="mb-4">
            <h4 className="font-medium">Description:</h4>
            <p>{submittedData.description}</p>
          </div>

          {submittedData.imageUrls.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium">Images:</h4>
              <div className="flex flex-wrap gap-4 mt-2">
                {submittedData.imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Achievement ${index}`}
                    className="h-40 rounded-md object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {submittedData.videoUrl && (
            <div className="mb-4">
              <h4 className="font-medium">Video:</h4>
              <video
                src={submittedData.videoUrl}
                controls
                className="mt-2 h-40 rounded-md object-cover"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddAchievementForm;
