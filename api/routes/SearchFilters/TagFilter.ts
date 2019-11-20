export default function(req: any, filter: Object) {
  if (req.query.tag) {
    if (Array.isArray(req.query.tag)) {
      filter = {
        ...filter,
        tags: { $elemMatch: { name: { $in: req.query.tag } } }
      }
    } else {
      filter = {
        ...filter,
        tags: { $elemMatch: { name: req.query.tag } }
      }
    }
  }
  return filter;
}
