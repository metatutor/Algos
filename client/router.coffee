Router.map ->
  @route 'home',{
    path: '/'
	 template: 'home'
  }
  @route 'forum',{
	 template: 'forum'
  }

  @route 'algo',{
    path: '/pedia'
	 template: 'algopedia'
  }
  @route 'profile',{
	 template: 'userPage'
    action: ->
		 Session.set 'lastUserSearch',Meteor.user()
		 this.render()
  }
  @route 'users',{
    path: '/users/:_id'
    template: 'userPage'
	 action: ->
		 Session.set 'lastUserSearch',this.params._id
		 this.render()
  }
  @route 'pedia',{
    path:'/pedia/:_id'
	 template: 'entryPage'
	 action: ->
		 Session.set 'lastAlgoSearch',this.params._id
		 this.render()
  }

Router.configure {
  layoutTemplate: 'layout_main'
}
