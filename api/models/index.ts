import mongoose from 'mongoose'
import { DB_NAME, DB_HOST, DB_PASSWORD, DB_USERNAME, DB_PORT } from '../config'

export default async (): Promise<void> => {
  try {
    await mongoose.connect(
      `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
      }
    )
    return
  } catch (error) {
    console.log(error)
    throw error
  }
}
