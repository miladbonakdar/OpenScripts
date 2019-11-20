import SearchFilter from './SearchFilter'
import CourseFilter from './CourseFilter'
import CategoryFilter from './CategoryFilter'
import TagFilter from './TagFilter'

export default function(req: any, filter: Object) {
  filter = SearchFilter(req, filter)
  filter = CategoryFilter(req, filter)
  filter = CourseFilter(req, filter)
  filter = TagFilter(req, filter)
  return filter
}
