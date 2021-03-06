import authonticator from '../../middlewares/passportAuthonticator'
import { Archive } from '../../models/archive'
import { Request, Response } from 'express'

const archiveDocument = async (
  item: any,
  itemId: any,
  user: any,
  collectionName: string
) => {
  const archive = new Archive({
    archivedBy: user,
    itemId: itemId,
    item: item,
    collectionName: collectionName
  })
  await archive.save()
}

export const deleteAction = (collection: any, beforeResponse: any = null) => {
  return [
    authonticator,
    async (req: Request, res: Response) => {
      let item = await collection.findByIdAndDelete(req.params.id)
      if (!item) return res.notFound(collection.modelName)
      if (collection.modelName !== 'Archive')
        await archiveDocument(
          item,
          req.params.id,
          req.user,
          collection.collection.collectionName
        )
      if (beforeResponse) await beforeResponse(req, res)
      res.success(item)
    }
  ]
}
