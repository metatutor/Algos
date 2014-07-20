Router.map(function(){
	this.route('home',{
		path:'/',
		template: 'home',
		onBeforeAction: function(pause){
			this.subscribe('getAlgosByReg',Session.get('mainQuery')).wait();
			this.subscribe('getAlgosByName',Session.get('mainQuery')).wait();
			this.subscribe('getAlgosByKeyWord',Session.get('mainQuery')).wait();
		}
	});
	this.route('guide',{
		path:'/guidelines',
		template:'guidelines'
	});
	this.route('pediaHome',{
		path: '/algos',
		template:'pedia',
		onBeforeAction: function(pause){
			this.subscribe('getAllAlgos');
			Session.set('pediaAiD',"");
		}
	});
	this.route('pediaSpecific',{
		path: '/algos/:_id',
		template:'pedia',
		onBeforeAction: function(pause){
			this.subscribe('getAllAlgos');
			this.subscribe('codeByAlgo',this.params._id);
			Session.set('pediaAiD',this.params._id);
		}
	});
	this.route('langs',{
		template: 'langList',
		onBeforeAction: function(pause){
			Session.set('langPageLang',"");
		}
	});
	this.route('langSearch',{
		path: '/langs/:_id',
		template: 'langList',
		onBeforeAction: function(pause){
			this.subscribe('codeByLang',this.params._id).wait();
			Session.set('langPageLang',this.params._id);
		}
	});
	this.route('users',{
		path: '/users/:_id',
		template:'userPage',
		onBeforeAction: function(pause){
			this.subscribe('getUserCode',this.params._id).wait();
			this.subscribe('getUserAlgos',this.params._id).wait();
			var uDoc = Meteor.users.findOne({_id:this.params._id});
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
			this.subscribe('algoParticular',this.params._id).wait();
			var aDoc = AlgoPedia.findOne({AiD:this.params._id});
			Session.set('lastAlgoSearch',aDoc);
			Session.set('lsiSelected',null);
			Session.set('tabSelect','first');
			Session.set('lsiLangSearch',null);
			if(Session.equals('lastAlgoSearch',undefined)){
				pause();
			}
		}
	});
	this.route('pediaSearch',{
		path:'/pedia/:algo/:search',
		template: 'entryPage',
		onBeforeAction: function(pause){
			this.subscribe('algoParticular',this.params.algo).wait();
			var aDoc=AlgoPedia.findOne({AiD:this.params.algo});
			Session.set('lastAlgoSearch',aDoc);
			if(this.params.search==="showAll"){
				this.subscribe('codeByAlgo',this.params.algo).wait();
				Session.set('lsiLangSearch',null);
				Session.set('lsiSelected',null);
				Session.set('tabSelect','second');
				if(Session.equals('lastAlgoSearch',undefined)){
					pause();
				}
			}
			else{
				this.subscribe('codeByAlgoAndLang',this.params.algo,this.params.search).wait();
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
			this.subscribe('getComments',this.params.search);
			this.subscribe('algoParticular',this.params.algo).wait();
			var aDoc=AlgoPedia.findOne({AiD:this.params.algo});
			Session.set('lastAlgoSearch',aDoc);
			if(this.params.lang==="showAll"){
				this.subscribe('codeByAlgo',this.params.algo).wait();
				Session.set('lsiSelected',this.params.search);
				Session.set('tabSelect','second');
				Session.set('lsiLangSearch',null);
				if(Session.equals('lastAlgoSearch',undefined)){
					pause();
				}
			}
			else{
				this.subscribe('codeByAlgoAndLang',this.params.algo,this.params.lang).wait();
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
	layoutTemplate: 'layout_main',
});
