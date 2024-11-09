import HomePage from "./home";
import { getAllPosts } from "@/lib/sanity/client";
import AltHome from "./home/alt/alternate";

export default async function IndexPage() {
  const posts = await getAllPosts();
  return <AltHome posts={posts} />;
}

// export const revalidate = 60;
