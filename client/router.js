Router.map(function(){
	this.route('pediaSearch',{
		path:'/pedia/:algo/:search',
		template: 'entryPage',
		action: function(){
			aDoc=AlgoPedia.findOne({AiD:@params.algo});
			Session.set('lastAlgoSearch',aDoc);
			Session.set('tabSelect','second');
			Session.set('lsiSearch',@params.search);
			this.render();
		}
	});
	this.route('home',{
		path:'/',
		template: 'home'
	});
	this.route('forum',{
		template: 'forum'
	});
	this.route('algo',{
		path: '/pedia',
		template: 'algopedia'
	});
	this.route('profile',{
		template: 'userPage',
		action: function(){
			Session.set('lastUserSearch',Meteor.user());
			this.render();
		}
	});
	this.route('users',{
		path: '/users/:_id',
		template:'userPage',
		action:function(){
			uDoc = Meteor.users.findOne({username:@params._id});
			Session.set('lastUserSearch',uDoc);
			this.render();
		}
	});
	this.route('pedia',{
		path:'/pedia/:_id',
		template: 'entryPage',
		action: function(){
			aDoc = AlgoPedia.findOne({AiD:@params._id});
			Session.set('tabSelect','first');
			Session.set('lastAlgoSearch',aDoc);
			this.render();
		}
	});
	this.route('search',{
		path:'/search/:_id',
		template: 'searchList',
		action: function(){
			Session.set('lastSearch',@params._id);
			this.render();
		}
	});
	this.route('langs',{
		path: '/langs/:_id',
		template: 'entryPageLang',
		action: function(){
			Session.set('tabSelectLang','first');
			lDoc = Languages.findOne({Name:@params._id});
			Session.set('langSearch',lDoc);
			this.render();
		}
	});
}
Router.configure = {
	layoutTemplate: 'layout_main'
}
