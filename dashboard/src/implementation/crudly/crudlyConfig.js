import { baseRoute } from '../routeProvider'

export default {
  root: baseRoute,
  defaultActions: [
    { type: 'get', name: 'getAll' },
    { type: 'put' },
    { type: 'post' },
    { type: 'get', name: 'get', url: '/:id' },
    { type: 'delete', url: '/:id' }
  ],
  controllers: [
    {
      name: 'post',
      actions: [{ type: 'get', url: '/:pageSize/:pageNumber', name: 'page' }]
    },
    {
      name: 'category',
      actions: []
    },
    {
      name: 'course',
      actions: [{ type: 'get', url: '/:pageSize/:pageNumber', name: 'page' }]
    },
    {
      name: 'tag',
      actions: [{ type: 'get', url: '/:pageSize/:pageNumber', name: 'page' }]
    },
    {
      name: 'news-letter',
      actions: [{ type: 'get', url: '/:pageSize/:pageNumber', name: 'page' }]
    },
    {
      name: 'auth',
      loadDefaults: false,
      actions: [{ type: 'post', name: 'login' }]
    }
  ]
}
