Template.list_controls.onCreated(function(){
    //var self = this;
    /*self.categories = new ReactiveVar();
    self.autorun(function(c){
        self.subsCat = self.subscribe('getCategories');
        if(self.subsCat.ready()){
            var cats = Categories.find();
            self.categories.set(cats);
        }
    })*/
});

Template.list_controls.helpers({
    categories : function(){
        return Categories.find();
    }
})