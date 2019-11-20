export default function(req: any, filter: Object) {
  if (req.query.search)
    filter = { ...filter, $text: { $search: req.query.search } }
  return filter
}
