import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { IPostDocument } from "@/mongodb/models/post";
import React from "react";
import Link from "next/link";

export default async function UserInformation({ posts }: { posts: IPostDocument[] }) {
     const user = await currentUser();

     const firstName = user?.firstName as string;
     const lastName = user?.lastName as string;
     const username = user?.username as string;
     const imageUrl = user?.imageUrl as string;

     const userPosts = posts?.filter((post) => post.user.userId === user?.id);

     //  The flatMap() method creates a new array by calling a function for each element in the array and then flattening the result into a new array. It is identical to a map() followed by a flat() of depth 1, but flatMap() is often quite useful, as merging both into one method is slightly more efficient. The result of this flatMap() is a new array that contains all comments made by the current user across all posts. It's "flat" because it's a single-level array, not an array of arrays.
     const userComments = (posts || [])?.flatMap(post => post?.comments?.filter((comment) => comment.user.userId === user?.id) || []);

     return (
          <div className="flex flex-col justify-center items-center bg-white mr-6 rounded-lg border py-4">
               <Avatar className="h-16 w-16 mb-5">
                    {user?.id ? <AvatarImage src={imageUrl} /> : <AvatarImage src={`https://avatar.vercel.sh/${username}` || "https://github.com/shadcn.png"} />}
                    <AvatarFallback>{firstName?.charAt(0)}{lastName?.charAt(0)}</AvatarFallback>
               </Avatar>

               <SignedIn>
                    <div className="text-center">
                         <Link href={`/profile/${username}`} className="font-semibold underline underline-offset-2">{firstName} {lastName}</Link>

                         <p className="text-xs">@{username}</p>
                    </div>
               </SignedIn>

               <SignedOut>
                    <div className="text-center space-y-2">
                         <p className="font-semibold">You are not signed in</p>

                         <Button asChild className="bg-[#0B63C4] text-white">
                              <SignInButton>Sign in</SignInButton>
                         </Button>
                    </div>
               </SignedOut>

               <hr className="w-full border-gray-200 my-5" />

               <div className="flex justify-between w-full px-4 text-sm">
                    <p className="font-semibold text-gray-400">Posts</p>
                    <p className="text-blue-400">{userPosts?.length}</p>
               </div>

               <div className="flex justify-between w-full px-4 text-sm">
                    <p className="font-semibold text-gray-400">Comments</p>
                    <p className="text-blue-400">{userComments?.length}</p>
               </div>
          </div>
     );
}