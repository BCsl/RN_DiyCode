/**
 * Created by chensuilun on 2017/8/23.
 */
function setBody(body) {
    if (body === null) {
        return false;
    }
    document.getElementById('markdown').innerHTML = body;
    let preElement = document.getElementsByTagName('pre');
    for (let variable of preElement) {
        let codeElement = variable.getElementsByTagName('code');
        for (let code of codeElement) {
            hljs.highlightBlock(code);
        }
    }
}


function setMarkdown(markdownString) {
    if (markdownString === null) {
        return markdownString;
    }
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });
    marked.setOptions({
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });

    document.getElementById('markdown').innerHTML = marked(markdownString);
}