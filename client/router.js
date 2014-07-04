Router.map(function(){
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
			var uDoc = Meteor.users.findOne({username:this.params._id});
			Session.set('lastUserSearch',uDoc);
			this.render();
		}
	});
	this.route('pedia',{
		path:'/pedia/:_id',
		template: 'entryPage',
		action: function(){
			var aDoc = AlgoPedia.findOne({AiD:this.params._id});
			Session.set('tabSelect','first');
			Session.set('lastAlgoSearch',aDoc);
			this.render();
		}
	});
	this.route('search',{
		path:'/search/:_id',
		template: 'searchList',
		action: function(){
			Session.set('lastSearch',this.params._id);
			this.render();
		}
	});
	this.route('langs',{
		path: '/langs/:_id',
		template: 'entryPageLang',
		action: function(){
			Session.set('tabSelectLang','first');
			var lDoc = Languages.findOne({Name:this.params._id});
			Session.set('langSearch',lDoc);
			this.render();
		}
	});
	this.route('pediaSearch',{
		path:'/pedia/:algo/:search',
		template: 'entryPage',
		action: function(){
			var aDoc=AlgoPedia.findOne({AiD:this.params.algo});
			Session.set('lastAlgoSearch',aDoc);
			Session.set('tabSelect','second');
			Session.set('lsiSearch',this.params.search);
			this.render();
		}
	});
});

Router.configure({
	layoutTemplate: 'layout_main'
});
