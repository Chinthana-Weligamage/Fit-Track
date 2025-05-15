import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  order: z.string().min(1), // Added order field
  imageUrl: z.string().min(1), // Added imageUrl field
});

const AddExerciseForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      console.log(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      console.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full mx-auto py-10 bg-zinc-900 p-5 rounded-lg"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise Name</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="col-span-12">
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order</FormLabel>
                <FormControl>
                  <Input placeholder="" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-12">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const formData = new FormData();
                        formData.append("file", file);

                        try {
                          const response = await axios.post(
                            "/api/upload",
                            formData,
                            {
                              headers: {
                                "Content-Type": "multipart/form-data",
                              },
                            }
                          );

                          // Assume the server returns the image URL
                          const imageUrl = response.data.url;
                          field.onChange(imageUrl); // Set form value
                        } catch (error) {
                          console.error("Image upload failed", error);
                        }
                      }}
                    />
                    {field.value && (
                      <img
                        src={field.value}
                        alt="Uploaded preview"
                        className="mt-2 h-32 rounded-md object-cover"
                      />
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
};

export default AddExerciseForm;
