Package.describe({
    name: 'cafe4it:markdown-github-editor-bootstrap3',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'Live (Github-flavored) Markdown Editor - Bootstrap 3',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.3');

    api.use(['templating','twbs:bootstrap','fortawesome:fontawesome'],['client']);

    api.addFiles('lib/markdown-it.js',['client']);
    api.addFiles('lib/markdown-it-footnote.js',['client']);
    api.addFiles('lib/highlight.pack.js',['client']);
    api.addFiles('lib/emojify.js',['client']);
    api.addFiles('lib/codemirror/lib/codemirror.js',['client']);
    api.addFiles('lib/codemirror/overlay.js',['client']);
    api.addFiles('lib/codemirror/xml/xml.js',['client']);
    api.addFiles('lib/codemirror/markdown/markdown.js',['client']);
    api.addFiles('lib/codemirror/gfm/gfm.js',['client']);
    api.addFiles('lib/codemirror/javascript/javascript.js',['client']);
    api.addFiles('lib/codemirror/css/css.js',['client']);
    api.addFiles('lib/codemirror/javascript/javascript.js',['client']);
    api.addFiles('lib/codemirror/htmlmixed/htmlmixed.js',['client']);
    api.addFiles('lib/codemirror/lib/util/continuelist.js',['client']);
    api.addFiles('lib/rawinflate.js',['client']);
    api.addFiles('lib/rawdeflate.js',['client']);
    api.addFiles('lib/base16-light.css',['client']);
    api.addFiles('lib/codemirror/lib/codemirror.css',['client']);
    api.addFiles('lib/default.css',['client']);

    api.addFiles('markdown-github-editor.js');
});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('cafe4it:markdown-github-editor');
    api.addFiles('markdown-github-editor-tests.js');
});
