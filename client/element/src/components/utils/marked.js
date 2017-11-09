/**
 * Created by unsad on 2017/10/18.
 */
import marked from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
  highlight: function(code, lang) {
    if (hljs.getLanguage(lang)) {
      return hljs.highlightAuto(lang, code).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  }
});

const Marked = text => {
  let tok = marked.lexer(text);
  text = marked.parser(tok).replace(/<pre>/ig, '<pre class="hljs">')
  return text;
};

export default Marked;
