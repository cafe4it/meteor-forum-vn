Template.MarkdownEditor.onCreated(function () {
    if (this.data.reactiveVar) {
        Session.set(this.data.reactiveVar, {});
    }
    var id = Random.id(5);
    this.inId = 'in-' + id;
    this.outId = 'out-' + id;
    this.codeId = 'code-' + id;
});

Template.MarkdownEditor.rendered = function () {
    var self = Template.instance();


    var languageOverrides = {
        js: 'javascript',
        html: 'xml'
    };

    emojify.setConfig({img_dir: '/packages/cafe4it_markdown-github-editor-bootstrap3/lib/emoji'});

    var md = markdownit({
        html: true,
        highlight: function (code, lang) {
            if (languageOverrides[lang]) lang = languageOverrides[lang];
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, code).value;
                } catch (e) {
                }
            }
            return '';
        }
    }).use(markdownitFootnote);
    //var textArea = self.find('#' + self.codeId);
    editor = CodeMirror.fromTextArea(document.getElementById(this.codeId), {
        mode: 'gfm',
        lineNumbers: false,
        matchBrackets: true,
        lineWrapping: true,
        theme: 'base16-light',
        extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
    });
    editor.on('change', update);

    function update(e) {
        setOutput(e.getValue());
        //textArea.value = e.getValue();
        if (self.data.reactiveVar) {
            Session.set(self.data.reactiveVar, {
                getHtml: document.getElementById(self.outId).innerHTML,
                getMarkdown: e.getValue()
            })
        }
    }

    function setOutput(val) {
        val = val.replace(/<equation>((.*?\n)*?.*?)<\/equation>/ig, function (a, b) {
            return '<img src="http://latex.codecogs.com/png.latex?' + encodeURIComponent(b) + '" />';
        });
        var out = document.getElementById(self.outId);
        var old = out.cloneNode(true);
        out.innerHTML = md.render(val);
        emojify.run(out);
        var allold = old.getElementsByTagName("*");
        if (allold === undefined) return;
        var allnew = out.getElementsByTagName("*");
        if (allnew === undefined) return;
        for (var i = 0, max = Math.min(allold.length, allnew.length); i < max; i++) {
            if (!allold[i].isEqualNode(allnew[i])) {
                out.scrollTop = allnew[i].offsetTop;
                return;
            }
        }
    }
}

Template.MarkdownEditor.helpers({
    inId: function () {
        return Template.instance().inId;
    },
    codeId: function () {
        //var markdownEditor = Session.get('markdownEditor');
        return Template.instance().codeId;
    },
    outId: function () {
        //var markdownEditor = Session.get('markdownEditor');
        return Template.instance().outId;
    }
})

//Template.MarkdownEditor.events(Template.instance.eventsMap);

Template.MarkdownEditor.events({
    'click button.mkd-btn': function (e, t) {
        e.preventDefault();
        var inId = Template.instance().inId,
            outId = Template.instance().outId,
            codeId = Template.instance().codeId,
            type = e.currentTarget.getAttribute('data-id'),
            selectionText = editor.getSelection();

        if (isCurrentEditor(e, inId) && outId && codeId && type) {
            switch (type) {
                case 'mkd-btn-bold':
                    var replacement = doBorI(2, selectionText);
                    editor.replaceSelection(replacement,selectionText);
                    break;
                case 'mkd-btn-italic' :
                    var replacement = doBorI(1, selectionText);
                    editor.replaceSelection(replacement,selectionText);
                    break;
                case 'mkd-btn-strikethrough' :
                    var replacement = doBorI(3, selectionText);
                    editor.replaceSelection(replacement,selectionText);
                    break;
                case 'mkd-btn-preview':
                    t.$('#' + inId + ' button.mkd-btn-preview').toggleClass('active');
                    t.$('#' + outId).toggleClass('mkd-preview-hide');
                    t.$('#' + inId).toggleClass('mkd-expand');
                    break;
                default :
                    return;
                    break;
            }
        }
    }
});


function isCurrentEditor(e, v) {
    var inId = e.currentTarget.parentElement.getAttribute('data-id');
    return (inId && (inId == v));
}

Template.MarkdownEditor.destroyed = function () {
    if (this.data.reactiveVar) {
        Session.set(this.data.reactiveVar, null);
    }

    if(editor) editor = null;

    this.$('mkd-controls').remove();
}

doBorI = function(t, selectionText){
    var char;
    switch(t){
        case 1 :
            char = '*';
            break;
        case 2 :
            char = '**'
            break;
        case 3 :
            char = '~~';
            break;
    }
    return (s.startsWith(selectionText, char) && s.endsWith(selectionText,char)) ? s(selectionText).strRight(char).strLeftBack(char).value() : s.quote(selectionText,char);
}