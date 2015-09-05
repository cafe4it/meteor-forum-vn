Template.admin_categories.onCreated(function () {
    var self = this;
    self.Categories = Categories.find();
})

Template.admin_categories.helpers({
    categories : function(){
        return Template.instance().Categories;
    }
})

Template.admin_tr_category.events({
    'click .btn-sm.btn-warning' : function(e,t){
        e.preventDefault();
        var message = Blaze.toHTMLWithData(Template.admin_category_edit, t.data);

    }
})