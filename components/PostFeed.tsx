import { IPostDocument } from "@/mongodb/models/post";
import Post from "./Post";

export default async function PostFeed({ posts }: { posts: IPostDocument[] }) {
     return (
          <div className="space-y-2 pb-20">
               {posts?.map((post) => (
                    <Post key={post._id as string} post={post} />
               ))}
          </div>
     );
}