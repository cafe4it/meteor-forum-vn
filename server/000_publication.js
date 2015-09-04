if(Meteor.isServer){
    Meteor.publish(null,function(){
        return Categories.find();
    })

    Meteor.publish('getTopics',function(limit){
        return Topics.find({},{limit : limit});
    });

    Meteor.publish('getTags', function(){
        return Tags.find();
    })
}