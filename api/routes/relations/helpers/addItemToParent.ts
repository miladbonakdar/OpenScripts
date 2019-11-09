export default async (
  collection: any,
  arrayName: string,
  itemId: any,
  parentId: any
) =>
  collection.updateOne(
    { _id: parentId },
    {
      $addToSet: {
        [arrayName]: itemId
      }
    }
  )
