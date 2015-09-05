Topics = new Meteor.Collection('topics');
Categories = new Meteor.Collection('categories');
Tags = new Meteor.Collection('tags');

Users = Meteor.users;

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
});

Users.helpers({
    isAdmin : function(){
        return Roles.userIsInRole(this._id, ['administrator']);
    },
    getPath : function(){
        return FlowRouter.path('user', {_id : this._id});
    }
})

var schemas = {};

schemas.Category = new SimpleSchema({
    name : {
        type : String,
        label : 'Tên danh mục',
        max : 50
    },
    description : {
        type : String,
        label : 'Mô tả',
        max : 255
    },
    slug : {
        type : String,
        label : 'Đường dẫn'
    },
    color : {
        type : String,
        label : 'Màu đại diện',
        autoform: {
            type: "bootstrap-colorpicker"
        }
    },
    no : {
        type : Number,
        label : 'Số thứ tự',
        optional : true,
        defaultValue : 99
    }
});

Categories.attachSchema(schemas.Category);