Template.list_controls.helpers({
    categories : function(){
        return Categories.find();
    }
});

Template.list_controls.events({
    'click #create_topic' : function(e,t){
        e.preventDefault();
        var reply_control = $('#reply-control');
        $(reply_control).toggleClass('closed');
        $(reply_control).toggleClass('open');
        Blaze.render(Template.create_topic, reply_control[0]);
    }
})