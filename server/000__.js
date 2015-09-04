if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Categories.find().count() === 0) {
            var categories = JSON.parse(Assets.getText('categories.json'));
            categories.default.forEach(function (c) {
                Categories.insert({
                    name: c.name,
                    slug: c.slug,
                    color: randomColor(),
                    updatedAt: new Date()
                });
            });
        }
        if (Topics.find().count() === 0) {
            faker.locale = 'vi';
            var cats = Categories.find().fetch(),
                catIds = _.map(cats, function (c) {
                    return c._id
                });
            _(60).times(function (i) {
                var title = s.capitalize(faker.lorem.sentence(), true),
                    slug = slugify(title),
                    catId = catIds[_.random(0, catIds.length - 1)],
                    content = faker.lorem.paragraphs(),
                    now = new Date(2015, _.random(1, 8), _.random(1, 29), _.random(0, 23), _.random(0.59), _.random(0, 59)),
                    now = (_.random(0,10) > 5) ? now : new Date();
                Topics.insert({
                    title: title,
                    slug: slug,
                    catId: catId,
                    content: content,
                    createdAt: now,
                    updatedAt: now
                });
            })
        }
    })
}