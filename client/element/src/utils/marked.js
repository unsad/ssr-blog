/**
 * Created by unsad on 2017/10/10.
 */
import marked from 'marked';
import hljs from 'highlight.js';

marked.setOptions({
  highlight: function(code) {
    return hljs.highlightAuto(code).value
  }
});

export default marked;
