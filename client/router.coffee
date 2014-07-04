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
		 @render()
  }
  @route 'users',{
    path: '/users/:_id'
    template: 'userPage'
	 action: ->
		 uDoc = Meteor.users.findOne({username:@params._id})
		 Session.set 'lastUserSearch',uDoc
		 @render()
  }
  @route 'pedia',{
    path:'/pedia/:_id'
	 template: 'entryPage'
	 action: ->
      aDoc = AlgoPedia.findOne({AiD:@params._id})
      Session.set 'tabSelect','first'
      Session.set 'lastAlgoSearch',aDoc
      @render()
  }
  @route 'search',{
    path: '/search/:_id'
	 template: 'searchList'
	 action: ->
		 Session.set 'lastSearch',@params._id
		 @render()
  }
  @route 'langs',{
    path: '/langs/:_id'
    template: 'entryPageLang'
    action: ->
      Session.set 'tabSelect','first'
      lDoc = Languages.findOne({Name:@params._id})
      Session.set 'langSearch',lDoc
      @render()
  }
  @route 'langs',{
    path: '/pedia/:_id/:search'
    template: 'entryPage'
    action: ->
      Session.set 'tabSelect','second'
      aDoc = AlgoPedia.findOne({AiD:@params._id})
      Session.set 'lsiSearch',@params.search
      Session.set 'lastAlgoSearch',aDoc
      @render()
  }

Router.configure {
  layoutTemplate: 'layout_main'
}
