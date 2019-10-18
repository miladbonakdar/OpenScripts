import { statics } from '../../types'
import $gate from '../../../implementation/crudly/CRUDlyInstance'

export default ({ commit }, { done }) => {
  $gate
    .all([
      $gate.course.getAll(),
      $gate.category.getAll(),
      $gate.tag.getAll(),
      $gate.auth.getUser()
    ])
    .then(([courses, categories, tags, user]) => {
      commit(statics.mutations.allCourses, courses)
      commit(statics.mutations.allCategories, categories)
      commit(statics.mutations.allTags, tags)
      commit(statics.mutations.user, user)
      done()
    })
    .catch(error => {
      console.log(error)
      done(error)
    })
}
