Template.list_topic.onCreated(function(){
    var self = this;
    self.topics = new ReactiveVar();
    self.autorun(function(c){
        self.subsTopics = self.subscribe('getTopics',20);
        if(self.subsTopics.ready()){
            var topics = Topics.find({},{sort : {updatedAt : -1}});
            self.topics.set(topics);
        }
    })
});

Template.list_topic.helpers({
    topics : function(){
        return Template.instance().topics.get();
    },
    isReady : function(){
        return Template.instance().subsTopics.ready();
    },
    updated : function(){
        var ms = moment().diff(moment(this.updatedAt)),
            s = moment.duration(ms).minutes();
        return (s < 59) ? s + ' phút' : s.humanize();
    }
})