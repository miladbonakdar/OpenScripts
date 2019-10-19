import { Schema } from 'mongoose'

export const createdById = {
  type: Schema.Types.ObjectId,
  required: true
}
