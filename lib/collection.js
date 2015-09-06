Topics = new Meteor.Collection('topics');
Posts = new Meteor.Collection('posts');
Categories = new Meteor.Collection('categories');
Tags = new Meteor.Collection('tags');

Users = Meteor.users;

Topics.helpers({
    getPath : function(){
        var params = {_id : this._id, slug : this.slug};
        return FlowRouter.path('topic', params);
    },
    getCategory : function(){
        return Categories.findOne({_id : this.catId});
    },
    getAuthor : function(){
        return Meteor.users.findOne({_id : this.createdBy});
    },
    getPosts : function(){
        var _posts = Posts.find({topicId : this._id}).fetch();
        return (_posts) ? _posts : []
    },
    getTags : function(){
        if(!this.tags) return [];
        var _tags = Tags.find({name : {$in : this.tags}}).fetch();
        return (_tags) ? _tags : []
    }
});

Categories.helpers({
    getPath : function(){
        var params = {slug : this.slug, _id : this._id};
        return FlowRouter.path('category',params);
    },
    getTopics : function(){
        var _topics = Topics.find({catId : this._id}).fetch();
        return (_topics) ? _topics : []
    }
});

Tags.helpers({
    getPath : function(){
        var params = {_id : this._id, slug : this.slug};
        return FlowRouter.path('tag',params);
    },
    getTopics : function(){
        var _topics = Topics.find({tags : this.name}).fetch();
        return (_topics) ? _topics : []
    }
});

Posts.helpers({
    author : function(){
        return Meteor.users.findOne({_id : this.createdBy});
    }
})

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
        index : 1,
        unique : true,
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

schemas.Topic = new SimpleSchema({
    title : {
        type : String,
        max : 255,
        index : 1,
        label : 'Tiêu đề'
    },
    slug : {
        type : String,
        label : 'Đường dẫn'
    },
    catId : {
        type : String,
        label : 'Danh mục'
    },
    tags : {
        type : [String],
        index : 1,
        optional : true
    },
    isClose : {
        type : Boolean,
        defaultValue : false,
        label : 'Không reply?'
    },
    isPinned : {
        type : Boolean,
        defaultValue : false,
        label : 'Chủ đề dính?'
    },
    createdBy : {
        type : String,
        optional : true,
        autoValue : function(){
            return Meteor.userId();
        }
    },
    createdAt : {
        type : Date,
        optional : true,
        autoValue : function(){
            if(this.isInsert) return new Date;
        }
    },
    updatedAt : {
        type : Date,
        optional : true,
        autoValue : function(){
            return new Date;
        }
    }
});

Topics.attachSchema(schemas.Topic);

schemas.Tag = new SimpleSchema({
    name : {
        type : String,
        unique : true,
        index : 1
    },
    slug : {
        type : String,
        optional : true
    },
    updatedAt : {
        type : Date,
        optional : true,
        autoValue : function(){
            return new Date;
        }
    }
});

Tags.attachSchema(schemas.Tag);

schemas.Post = new SimpleSchema({
    topicId : {
        type : String
    },
    replyTo : {
        type : String,
        optional : true
    },
    content : {
        type : String,
        index : 1
    },
    html : {
        type : String,
        label : 'Nội dung'
    },
    createdBy : {
        type : String,
        optional : true,
        autoValue : function(){
            return Meteor.userId();
        }
    },
    createdAt : {
        type : Date,
        optional : true,
        autoValue : function(){
            if(this.isInsert) return new Date;
        }
    },
    updatedAt : {
        type : Date,
        optional : true,
        autoValue : function(){
            return new Date;
        }
    }
});

Posts.attachSchema(schemas.Post);