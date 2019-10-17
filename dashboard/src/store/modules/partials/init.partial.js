import { statics } from '../../types'
import $gate from '../../../implementation/crudly/CRUDlyInstance'

export default ({ commit }, { done }) => {
  $gate
    .all([$gate.course.getAll(), $gate.category.getAll(), $gate.tag.getAll()])
    .then(([courses, categories, tags]) => {
      commit(statics.mutations.allCourses, courses.data)
      commit(statics.mutations.allCategories, categories.data)
      commit(statics.mutations.allTags, tags.data)
      done()
    })
    .catch(error => {
      console.log(error)
      done(error)
    })
}
