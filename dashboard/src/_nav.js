export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Posts',
      icon: 'fa fa-paw',
      url: '/post/list'
    },
    {
      name: 'Comments',
      icon: 'fa fa-comments-o',
      url: '/comment/list'
    },
    {
      name: 'Messages',
      icon: 'fa fa-bell-o',
      url: '/message/list'
    },
    {
      name: 'Basic Data',
      icon: 'fa fa-info',
      children: [
        {
          name: 'Categories',
          url: '/category/list',
          icon: 'fa fa-list-ul'
        },
        {
          name: 'Courses',
          url: '/course/list',
          icon: 'fa fa-television'
        },
        {
          name: 'Tags',
          url: '/tag/list',
          icon: 'fa fa-tag'
        },
        {
          name: 'News letters',
          url: '/news-letter/list',
          icon: 'fa fa-envelope-o'
        }
      ]
    },
    {
      name: 'Archived',
      icon: 'fa fa-trash-o',
      url: '/archive/list'
    }
  ]
}
