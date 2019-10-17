import { Document, Schema, Model, model } from 'mongoose'
import { IPost } from './interfaces/post.interface'

export interface IPostModel extends IPost, Document {}

export const PostSchema: Schema = new Schema({
})

export const Post: Model<IPostModel> = model<IPostModel>('Post', PostSchema)
