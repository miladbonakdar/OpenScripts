import { Document, Schema, Model, model } from 'mongoose'
import { IUser } from './interfaces/user.interface'

export interface IUserModel extends IUser, Document {}

export const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 20,
    lowercase: true
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 20,
    lowercase: true
  },
  telegramId: Number,
  email: {
    type: String,
    required: true,
    maxlength: 40,
    unique:true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  info: String,
  photoUrl: String,
  youtubeLink: String,
  instagramLink: String,
  telegramLink: String,
  facebookLink: String,
  twitterLink: String,
  whatsappLink: String,
  aparatLink: String
})

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema)
