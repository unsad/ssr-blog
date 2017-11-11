/**
 * Created by unsad on 2017/10/18.
 */
import Marked from 'marked'
import hljs from 'highlight.js'

const renderer = new Marked.Renderer();
export const toc = [];

renderer.heading = function (text, level) {
  let slug = text.toLowerCase().replace(/\s+/g, '-');
  toc.push({
    level,
    slug,
    title: text
  });
  return `<h${level}><a href='#${slug}' id='${slug}' class='anchor'></a><a href='#${slug}'>${text}</a></h${level}>`
}

marked.setOptions({
  highlight: function(code, lang) {
    if (hljs.getLanguage(lang)) {
      return hljs.highlightAuto(lang, code).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  },
  renderer
});

export const marked = text => {
  let tok = Marked.lexer(text);
  text = Marked.parser(tok).replace(/<pre>/ig, '<pre class="hljs">')
  return text;
};

