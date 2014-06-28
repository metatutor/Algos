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
  @route 'regEnd',{
    path: '/finishRegistration'
	 template: 'completeRegistration'
  }

Router.configure {
  layoutTemplate: 'layout_main'
}
