import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostValidation } from "./lib/validation";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../src/appwrite/service";
import FileUploader from "./FileUploader";
import { useSelector } from "react-redux";

const PostForm = ({ post, action }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tag: post ? post.tag : "",
      creator: userData ? userData.$id : null,
    },
  });

  const createPost = async (data) => {
    if (post) {
      const file = data.file[0]
        ? await appwriteService.uploadFile(data.file[0])
        : null;
      

      if (file) {
        appwriteService.deleteFile(post.imageId);
        
      }
      
      const updatePost = await appwriteService.updatePost(post.$id, {
        ...data,
        imageId: file ? file.$id : undefined,
        imageUrl: file ? appwriteService.getFilePreview(file.$id): post.imageUrl
      });
      if (updatePost) {
        navigate(`/posts/${post.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.file[0]);
      const fileUrl = appwriteService.getFilePreview(file.$id);

      if (file) {
        const fileId = file.$id;
        data.imageId = fileId;
      }

      const newPost = await appwriteService.createPost({
        ...data,
        userId: userData.$id,
        imageUrl: fileUrl,
        creator: userData.name
      });

      if (newPost) {
        navigate("/");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(createPost)}
        className="flex flex-col gap-9 w-full  max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            // disabled={isLoadingCreate || isLoadingUpdate}>
            // {(isLoadingCreate || isLoadingUpdate) && <Loader />}
          >
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
