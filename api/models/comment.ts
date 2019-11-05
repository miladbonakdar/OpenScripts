import { Document, Schema, Model, model } from 'mongoose'
import { IComment } from './interfaces/comment.interface'
import { color, createdAt, text, email } from './contracts'

export interface ICommentModel extends IComment, Document {}

export const CommentSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
    set: (n: string) => n.trim().toLowerCase()
  },
  email,
  text,
  color,
  createdAt,
  replys: [],
  path: [Number],
  acceptedAt: {
    type: Date,
    default: new Date()
  },
  accepted: {
    type: Boolean,
    default: false,
    required: true
  },
  acceptedById: Schema.Types.ObjectId,
  postId: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

CommentSchema.index({
  text: 'text',
  email: 'text',
  name: 'text'
})

export const Comment: Model<ICommentModel> = model<ICommentModel>(
  'Comment',
  CommentSchema
)
