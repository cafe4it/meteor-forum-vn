Template.create_topic.destroyed = function(){
    console.log('Create Topic ... destroyed')
}

Template.create_topic.onDestroyed(function(){
    console.log('Create Topic Template ... onDestroyed')
})