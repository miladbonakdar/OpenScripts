export default function(req: any, filter: Object) {
  if (req.query.course) {
    filter = {
      ...filter,
      'course.name': req.query.course
    }
  }
  return filter
}
