"use client";

import { useQuery } from "@tanstack/react-query";
import AddPost from "./components/AddPost";
import axios from "axios";
import Post from "./components/Post";
import { PostType } from "./types/Posts";

// Fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";

  return (
    <main className="">
      <AddPost />
      {data?.map((post) => (
        <Post
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
          comments={post.Comment}
        />
      ))}
    </main>
  );
}
