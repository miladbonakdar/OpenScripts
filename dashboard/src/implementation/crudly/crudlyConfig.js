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
      actions: [
        { type: 'get', url: '/:pageSize/:pageNumber', name: 'page' },
        { type: 'patch', url: '/randomizeColor', name: 'randomizeColor' },
        { type: 'get', url: '/course-details/:courseId', name: 'courseDetails' }
      ]
    },
    {
      name: 'category',
      actions: [
        { type: 'patch', url: '/randomizeColor', name: 'randomizeColor' }
      ]
    },
    {
      name: 'course',
      actions: [
        { type: 'get', url: '/:pageSize/:pageNumber', name: 'page' },
        { type: 'patch', url: '/randomizeColor', name: 'randomizeColor' }
      ]
    },
    {
      name: 'tag',
      actions: [
        { type: 'get', url: '/:pageSize/:pageNumber', name: 'page' },
        { type: 'patch', url: '/randomizeColor', name: 'randomizeColor' }
      ]
    },
    {
      name: 'message',
      actions: [
        { type: 'get', url: '/:pageSize/:pageNumber', name: 'page' },
        { type: 'patch', url: '/randomizeColor', name: 'randomizeColor' },
        { type: 'get', url: '/not-read', name: 'notRead' },
        { type: 'patch', url: '/read', name: 'read' },
        { type: 'patch', url: '/read-all', name: 'readAll' }
      ]
    },
    {
      name: 'comment',
      actions: [
        { type: 'get', url: '/:pageSize/:pageNumber', name: 'page' },
        { type: 'patch', url: '/randomizeColor', name: 'randomizeColor' },
        { type: 'get', url: '/not-accepted', name: 'notAccepted' },
        { type: 'patch', url: '/accept', name: 'accept' }
      ]
    },
    {
      name: 'news-letter',
      actions: [{ type: 'get', url: '/:pageSize/:pageNumber', name: 'page' }]
    },
    {
      name: 'archive',
      loadDefaults: false,
      actions: [
        { type: 'get', url: '/:pageSize/:pageNumber', name: 'page' },
        { type: 'delete', url: '/:id' },
        { type: 'patch', url: '/recycle', name: 'recycle' }
      ]
    },
    {
      name: 'auth',
      loadDefaults: false,
      actions: [
        { type: 'post', name: 'login' },
        { type: 'get', name: 'getUser' }
      ]
    }
  ]
}
