Meteor.Loader.loadJs('//www.google-analytics.com/analytics.js',function(){
   if(!ga){ console.error("Failed to load google analytics"); }
   // Attach ga to window object
   //window.ga = ga;
   ga('create', 'UA-50026049-1', 'navdash.com');
   ga('send', 'pageview');
})
