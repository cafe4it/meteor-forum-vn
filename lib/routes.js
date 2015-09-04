if(Meteor.isClient){
    BlazeLayout.setRoot('body');
    accountsUIBootstrap3.setLanguage('vi');
}

FlowRouter.route('/',{
    name : 'home',
    action : function(p, q){
        BlazeLayout.render('frontLayout',{ top : 'frontHeader', main : 'frontHome'})
    }
});

FlowRouter.route('/danh-muc',{
    name : 'categories'
})

FlowRouter.route('/c/:slug/:_id',{
    name : 'category',
    action : function(p, q){
        BlazeLayout.render('frontLayout',{ top : 'frontHeader', main : 'frontHome'})
    }
});

FlowRouter.route('/t/:slug/:_id',{
    name : 'topic'
})