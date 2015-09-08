Template.MarkdownEditor.onCreated(function () {
    if (this.data && this.data.reactiveVar) {
        Session.set(this.data.reactiveVar, {});
    }else{
        Session.set("reactiveVar", {});
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
            selectionText = editor.getSelection(),
            content = editor.getValue(),
            start = editor.indexFromPos(editor.getCursor('start')),
            end = editor.indexFromPos(editor.getCursor('end'))
        var chunk = editor.somethingSelected() ? selectionText : 'some thing';

        if (isCurrentEditor(e, inId) && outId && codeId && type) {
            switch (type) {
                case 'mkd-btn-hr' :
                    doHr(chunk, start, end);
                    break;
                case 'mkd-btn-heading':
                    doHeading(chunk, start, end);
                    break;
                case 'mkd-btn-bold':
                    doIBS(2, content, chunk, start, end);
                    break;
                case 'mkd-btn-italic' :
                    doIBS(1, content, chunk, start, end);
                    break;
                case 'mkd-btn-strikethrough' :
                    doIBS(3, content, chunk, start, end);
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
    if (this.data && this.data.reactiveVar) {
        Session.set(this.data.reactiveVar, null);
    }else{
        Session.set("reactiveVar", null);
    }

    if (editor) editor = null;

    this.$('mkd-controls').remove();
}

var doIBS = function (t, content, chunk, start, end) {
    var char, cursor;
    switch (t) {
        case 1 : //Italic
            char = '_';
            break;
        case 2 : //Bold
            char = '**'
            break;
        case 3 ://Strike
            char = '~~';
            break;
    }
    var a = content.substr(start - char.length, char.length) === char && content.substr(end, char.length) === char,
        b = content.substr(start, char.length) === char && content.substr(end - char.length, char.length) === char;

    if (a) {
        editor.setSelection(editor.posFromIndex(start - char.length), editor.posFromIndex(end + char.length));
        editor.replaceSelection(chunk);
        cursor = start - char.length;
    } else if (b) {
        chunk = editor.getRange(editor.posFromIndex(start + char.length), editor.posFromIndex(end - char.length));
        editor.replaceSelection(chunk);
        cursor = start - char.length;
        editor.setSelection(editor.posFromIndex(cursor), editor.posFromIndex(chunk.length));
        return;
    }
    else {
        editor.replaceSelection(s(chunk).quote(char), "start");
        cursor = start + char.length;
    }

    editor.setSelection(editor.posFromIndex(cursor), editor.posFromIndex(cursor + chunk.length));
}

var doHeading = function (chunk, start, end) {
    var cursor;
    if (!editor.somethingSelected()) {
        var newChunk = '### ' + chunk + ' ###';
        editor.replaceSelection(newChunk, "start");
        cursor = start + 4;
        editor.setSelection(editor.posFromIndex(start - 4), editor.posFromIndex(cursor + newChunk.length));
        return;
    }

    var headerLevel = 0;


}

var doQuote = function () {

}

var doHr = function (chunk, start, end) {
    var pos = editor.posFromIndex(end),
        char = '----------',
        contentOfLine = editor.getLine(pos.line);
    var posFrom, posTo;
    if (!editor.somethingSelected() && _.isEmpty(contentOfLine)) {
        posFrom = {
            line: pos.line +1,
            ch: 0
        };
    }else{
        posFrom = {
            line: pos.line +2,
            ch: 0
        };
    }

    posTo = {
        line: posFrom.line,
        ch: char.length
    };
    editor.focus();
    if(posFrom.line - pos.line > 1){
        editor.execCommand('newlineAndIndent');
        editor.execCommand('newlineAndIndent');
    }
    editor.replaceRange(char, posFrom, posTo);
    editor.execCommand('newlineAndIndent');
}