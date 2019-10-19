import { Document, Schema, Model, model } from 'mongoose'
import { IArchive } from './interfaces/archive.interface'

export interface IArchiverModel extends IArchive, Document {}

export const ArchiveSchema: Schema = new Schema({
  archivedAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  archivedBy: {
    type: Object,
    required: true
  },
  itemId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  item: {
    type: Object,
    required: true
  },
  collectionName: {
    type: String,
    required: true
  }
})

export const Archive: Model<IArchiverModel> = model<IArchiverModel>(
  'Archive',
  ArchiveSchema
)
