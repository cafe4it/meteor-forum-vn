Template.defaultLayout.rendered = function(){
    $(document).ready(function(){
        var to = Meteor.setTimeout(function(){
            $('[data-toggle="tooltip"]').tooltip();
            Meteor.clearTimeout(to);
        },1000)
    })
}