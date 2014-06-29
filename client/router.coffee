Router.map ->
  @route 'home',{
    path: '/'
	 template: 'home'
  }
  @route 'forum',{
    path: '/forum'
	 template: 'forum'
  }

  @route 'algo',{
    path: '/algopedia'
	 template: 'algopedia'
  }
  @route 'profile',{
    path: '/profile'
	 template: 'profile'
  }

Router.configure {
  layoutTemplate: 'layout_main'
}
