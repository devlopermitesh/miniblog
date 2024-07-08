import React, { useCallback, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { Inputcomp, Button, Select, RTE } from "../Index";
import appwriteService from "../../appwrite/conf";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Postform = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.Authreducer.userData);

  const submit = async (data) => {
    if (post) {
      data.image[0] ? appwriteService.uploadFile(data.image[0]) : null;
      if (file) {
        appwriteService.deleteFile(post.featureImage);
      }
      const dbpost = await appwriteService.updatePost(post.$id, {
        ...data,
        featureImage: file ? file.$id : undefined,
        if(dbpost) {
          navigate(`/post/${dbpost.$id}`);
        },
      });
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        console.log(userData);
        const fileId = file.$id;
        data.featureImage = fileId;
        const dbpost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      }
    }
  };
  const slugTransForm = useCallback((value) => {
    if (value && typeof value === "string") {
      let slug = value
        .trim()
        .toLocaleLowerCase()
        .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove invalid characters
        .replace(/\s+/g, "-"); // Replace spaces with hyphens

      // Ensure the slug does not start with a special character
      if (slug.charAt(0) === "-") {
        slug = slug.slice(1);
      }
      return slug;
    }
    return "";
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue(
          "slug",
          slugTransForm(value.title, {
            shouldValidate: true,
          })
        );
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [slugTransForm, watch, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Inputcomp
          label="title :"
          placeholder="title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Inputcomp
          className="mb-4"
          label="slug"
          placeholder="slug"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransForm(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label={"Content :"}
          name={"content"}
          control={control}
          defaultValue={getValues("content")}
        ></RTE>
      </div>
      <div className="w-1/3 px-2">
        <Inputcomp
          label="featured Image"
          type="file"
          className="mb-4"
          accept="image/png,image/jpg,image.gif"
          {...register("image", {
            required: !post,
          })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featureImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        ></Select>
        <Button
          type="submit"
          name={"post"}
          txtcolor="text-white"
          bgcolor="bg-sky-500"
          hoverbgcolor="bg-sky-600"
          hovertxtcolor="text-white"
          className="ms-36 mt-10"
        ></Button>
      </div>
    </form>
  );
};

export default Postform;
