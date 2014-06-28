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

Router.configure {
  layoutTemplate: 'layout_main'
}
