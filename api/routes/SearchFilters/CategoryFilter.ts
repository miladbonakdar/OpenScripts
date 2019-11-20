export default function(req: any, filter: Object) {
  if (req.query.category) {
    filter = {
      ...filter,
      'category.name': req.query.category
    }
  }
  return filter
}
