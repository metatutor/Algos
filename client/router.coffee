Router.map ->
  @route 'home',{
    path: '/'
	 template: 'home'
  }
  @route 'forum',{
	 template: 'forum'
  }

  @route 'algo',{
    path: '/algopedia'
	 template: 'algopedia'
  }
  @route 'profile',{
	 template: 'profile'
  }

Router.configure {
  layoutTemplate: 'layout_main'
}
