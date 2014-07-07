Router.map(function(){
	this.route('home',{
		path:'/',
		template: 'home',
		onBeforeAction: function(pause){
			Session.set('showSearch',false);
		}
	});
	this.route('langs',{
		path: '/langs',
		template: 'langList',
		onBeforeAction: function(pause){
			Session.set('showSearch',true);
			Session.set('langPageLang',this.params._id);
		}
	});
	this.route('langSearch',{
		path: '/langs/:_id',
		template: 'langList',
		onBeforeAction: function(pause){
			Session.set('langPageLang',this.params._id);
			Session.set('showSearch',true);
		}
	});
	this.route('profile',{
		template: 'userPage',
		onBeforeAction: function(pause){
			Session.set('showSearch',true);
			Session.set('lastUserSearch',Meteor.user());
			if(Session.equals('lastUserSearch',undefined)){
				pause();
			}
		}
	});
	this.route('users',{
		path: '/users/:_id',
		template:'userPage',
		onBeforeAction: function(pause){
			Session.set('showSearch',true);
			var uDoc = Meteor.users.findOne({username:this.params._id});
			Session.set('lastUserSearch',uDoc);
			if(Session.equals('lastUserSearch',undefined)){
				pause();
			}
		}
	});
	this.route('pedia',{
		path:'/pedia/:_id',
		template: 'entryPage',
		onBeforeAction: function(pause){
			Session.set('showSearch',true);
			var aDoc = AlgoPedia.findOne({AiD:this.params._id});
			Session.set('tabSelect','first');
			Session.set('lastAlgoSearch',aDoc);
			Session.set('lsiLangSearch',null);
			Session.set('lsiSelected',null);
			if(Session.equals('lastAlgoSearch',undefined)){
				pause();
			}
		}
	});
	this.route('search',{
		path:'/search/:_id',
		template: 'searchList',
		action: function(){
			Session.set('showSearch',true);
			Session.set('lastSearch',this.params._id);
			this.render();
		}
	});
	this.route('pediaSearch',{
		path:'/pedia/:algo/:search',
		template: 'entryPage',
		onBeforeAction: function(pause){
			Session.set('showSearch',true);
			var aDoc=AlgoPedia.findOne({AiD:this.params.algo});
			Session.set('lastAlgoSearch',aDoc);
			if(this.params.search==="showAll"){
				Session.set('lsiLangSearch',null);
				Session.set('lsiSelected',null);
				Session.set('tabSelect','second');
				if(Session.equals('lastAlgoSearch',undefined)){
					pause();
				}
			}
			else{
				var lDoc = Languages.findOne({Slug:this.params.search});
				Session.set('lsiLangSearch',lDoc);
				Session.set('lsiSelected',null);
				Session.set('tabSelect','second');
				if(Session.equals('lastAlgoSearch',undefined)){
					pause();
				}
				if(Session.equals('lsiLangSearch',undefined)){
					pause();
				}
			}
		}
	});
	this.route('lsiSearchRoute',{
		path:'/pedia/:algo/:lang/:search',
		template: 'entryPage',
		onBeforeAction: function(pause){
			Session.set('showSearch',true);
			var aDoc=AlgoPedia.findOne({AiD:this.params.algo});
			Session.set('lastAlgoSearch',aDoc);
			if(this.params.lang==="showAll"){
				Session.set('lsiSelected',this.params.search);
				Session.set('tabSelect','second');
				Session.set('lsiLangSearch',null);
				if(Session.equals('lastAlgoSearch',undefined)){
					pause();
				}
			}
			else{
				var lDoc = Languages.findOne({Slug:this.params.lang});
				Session.set('lsiSelected',this.params.search);
				Session.set('tabSelect','second');
				Session.set('lsiLangSearch',lDoc);
				if(Session.equals('lastAlgoSearch',undefined)){
					pause();
				}
				if(Session.equals('lsiLangSearch',undefined)){
					pause();
				}
			}
		}
	});
});

Router.configure({
	layoutTemplate: 'layout_main'
});
