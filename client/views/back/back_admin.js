Template.admin_Home.events({
    'click button' : function(e, t){
        e.preventDefault();
        BlazeLayout.render('defaultLayout',{ top : 'frontHeader', main : 'frontHome'})
    }
})