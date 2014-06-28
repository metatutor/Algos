Router.map ->
  @route 'home',{
    path: '/'
  }
  @route 'algo',{
    path: '/algopedia'
	 template: 'algopedia'
  }
  @route 'forum',{
    path: '/forum'
	 template: 'forum'
  }

Router.configure {
  layoutTemplate: 'layout_main'
}
