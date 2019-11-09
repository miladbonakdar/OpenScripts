export default async (
  collection: any,
  arrayName: string,
  itemId: any,
  parentId: any
) =>
  collection.updateMany(
    { [arrayName]: itemId, _id: parentId },
    {
      $pull: {
        [arrayName]: itemId
      }
    }
  )
