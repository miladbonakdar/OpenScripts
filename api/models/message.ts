import { Document, Schema, Model, model } from 'mongoose'
import { IMessage } from './interfaces/message.interface'
import { color, text, createdAt, email } from './contracts'

export interface IMessageModel extends IMessage, Document {}

export const MessageSchema: Schema = new Schema({
  email,
  name: {
    type: String,
    required: true,
    maxlength: 50,
    lowercase: true,
    trim: true
  },
  createdAt,
  color,
  text,
  telegramUsername: String,
  readed: {
    required: true,
    type: Boolean,
    default: false
  }
})

export const Message: Model<IMessageModel> = model<IMessageModel>(
  'Message',
  MessageSchema
)
