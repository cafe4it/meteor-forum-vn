Topics = new Meteor.Collection('topics');
Categories = new Meteor.Collection('categories');
Tags = new Meteor.Collection('tags');

Topics.helpers({
    getPath : function(){
        var params = {_id : this._id, slug : this.slug};
        return FlowRouter.path('topic', params);
    },
    category : function(){
        return Categories.findOne({_id : this.catId});
    }
});

Categories.helpers({
    getPath : function(){
        var params = {slug : this.slug, _id : this._id};
        return FlowRouter.path('category',params);
    }
})
