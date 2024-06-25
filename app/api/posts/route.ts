import { connectToDatabase } from "@/mongodb/database";
import { IPostBase, Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export interface AddPostRequestBody {
     user: IUser;
     text: string;
}

export async function POST(request: Request) {
     auth().protect();
     const { user, text }: AddPostRequestBody = await request.json();

     try {
          await connectToDatabase();

          const postData: IPostBase = {
               user,
               text,
          };

          const post = await Post.create(postData);
          return NextResponse.json({ message: "Post created successfully", post });
     }

     catch (error) {
          return NextResponse.json(
               { error: `An error occurred while creating the post: ${error}` },
               { status: 500 }
          );
     }
}

export async function GET() {
     try {
          await connectToDatabase();

          const posts = await Post.getAllPosts();

          return NextResponse.json(posts);
     }

     catch (error) {
          return NextResponse.json(
               { error: "An error occurred while fetching posts" },
               { status: 500 }
          );
     }
}