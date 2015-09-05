if(Meteor.isClient){
    BlazeLayout.setRoot('body');
    accountsUIBootstrap3.setLanguage('vi');
}

FlowRouter.route('/',{
    name : 'home',
    action : function(p, q){
        BlazeLayout.render('defaultLayout',{ top : 'frontHeader', main : 'frontHome'})
    }
});

FlowRouter.route('/c',{
    name : 'categories'
})

FlowRouter.route('/c/:_id/:slug/',{
    name : 'category',
    action : function(p, q){
        BlazeLayout.render('defaultLayout',{ top : 'frontHeader', main : 'frontHome'})
    }
});

FlowRouter.route('/t/:_id/:slug/',{
    name : 'topic'
});

FlowRouter.route('/u/:_id',{
    name : 'user'
})

var adminRoutes = FlowRouter.group({
    prefix: "/a"
});

adminRoutes.route('/',{
    name : 'admin_home',
    action : function(p, q){
        BlazeLayout.render('defaultLayout', {top : 'backHeader', main : 'admin_Home'});
    }
});

adminRoutes.route('/c',{
    name : 'admin_categories',
    action : function(p, q){
        BlazeLayout.render('defaultLayout', {top : 'backHeader', main : 'admin_categories'});
    }
});

adminRoutes.route('/t',{
    name : 'admin_topics'
})