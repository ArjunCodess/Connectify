import { IUser } from "@/types/user";
import mongoose, { Schema, Document, models } from "mongoose";

export interface ICommentBase {
     user: IUser;
     text: string;
}

export interface IComment extends Document, ICommentBase {
     _id: string;
     createdAt: Date;
     updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
     {
          user: {
               userId: { type: String, required: true },
               userImage: { type: String, required: true },
               firstName: { type: String, required: true },
               lastName: { type: String },
               username: { type: String, required: true },
          },
          text: { type: String, required: true },
     },
     {
          timestamps: true,
     }
);

export const Comment = models.Comment || mongoose.model<IComment>("Comment", CommentSchema);