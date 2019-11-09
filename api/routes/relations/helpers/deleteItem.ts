export default async (collection: any, arrayName: string, itemId: any) =>
  collection.updateMany(
    { [arrayName]: itemId },
    {
      $pull: {
        [arrayName]: itemId
      }
    }
  )
