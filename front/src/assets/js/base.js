export default function () {
  if (typeof window !== 'undefined') {
    (function (win, doc) {
      let getById = function (el) {
        return document.getElementById(el);
      };

      // from qwrap
      let getDocRect = function (doc) {
        doc = doc || document;
        let win = doc.defaultView || doc.parentWindow,
          mode = doc.compatMode,
          root = doc.documentElement,
          h = win.innerHeight || 0,
          w = win.innerWidth || 0,
          scrollX = win.pageXOffset || 0,
          scrollY = win.pageYOffset || 0,
          scrollW = root.scrollWidth,
          scrollH = root.scrollHeight;
        if (mode !== 'CSS1Compat') { // Quirks
          root = doc.body;
          scrollW = root.scrollWidth;
          scrollH = root.scrollHeight;
        }
        if (mode) { // IE, Gecko
          w = root.clientWidth;
          h = root.clientHeight;
        }
        scrollW = Math.max(scrollW, w);
        scrollH = Math.max(scrollH, h);
        scrollX = Math.max(scrollX, doc.documentElement.scrollLeft, doc.body.scrollLeft);
        scrollY = Math.max(scrollY, doc.documentElement.scrollTop, doc.body.scrollTop);
        return {
          width: w,
          height: h,
          scrollWidth: scrollW,
          scrollHeight: scrollH,
          scrollX: scrollX,
          scrollY: scrollY
        };
      };

      let getXY = function (node) {
        let doc = node.ownerDocument,
          docRect = getDocRect(doc),
          scrollLeft = docRect.scrollX,
          scrollTop = docRect.scrollY,
          box = node.getBoundingClientRect(),
          xy = [box.left, box.top],
          mode,
          off1,
          off2;
        if (scrollTop || scrollLeft) {
          xy[0] += scrollLeft;
          xy[1] += scrollTop;
        }
        return xy;
      };

      let getRect = function (el) {
        let p = getXY(el);
        let x = p[0];
        let y = p[1];
        let w = el.offsetWidth;
        let h = el.offsetHeight;
        return {
          'width': w,
          'height': h,
          'left': x,
          'top': y,
          'bottom': y + h,
          'right': x + w
        };
      };

      let utils = {
        isMob: (function () {
          let ua = navigator.userAgent.toLowerCase();
          let agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
          let result = false;
          for (let i = 0; i < agents.length; i++) {
            if (ua.indexOf(agents[i].toLowerCase()) > -1) {
              result = true;
            }
          }
          return result;
        })()
      };

      if (utils.isMob) {
        document.documentElement.className += ' mob';
      } else {
        document.documentElement.className += ' pc';
      }

      let Dom = {
        $sidebar: document.querySelector('#sidebar'),
        $main: document.querySelector('#main'),
        $sidebar_mask: document.querySelector('#sidebar-mask'),
        $body: document.body,
        $btn_side: document.querySelector('#header .btn-bar'),
        $article: document.querySelectorAll('.mob #page-index article')
      };

      Dom.bindEvent = function () {
        let _this = this,
          bodyClassName = 'side',
          eventFirst = 'click',
          eventSecond = 'click';

        if (utils.isMob) {
          eventFirst = 'touchstart';
          eventSecond = 'touchend';
        }

        try {
          this.$btn_side.addEventListener(eventSecond, function () {
            if (_this.$body.className.indexOf(bodyClassName) > -1) {
              _this.$body.className = _this.$body.className.replace(bodyClassName, '');
              _this.$sidebar_mask.style.display = 'none';
            } else {
              _this.$body.className += (' ' + bodyClassName);
              _this.$sidebar_mask.style.display = 'block';
            }
          }, false);
        } catch (err) {}
        try {
          this.$sidebar_mask.addEventListener(eventFirst, function (e) {
            _this.$body.className = _this.$body.className.replace(bodyClassName, '');
            _this.$sidebar_mask.style.display = 'none';
            e.preventDefault();
          }, false);
        } catch (err) {}
        window.addEventListener('resize', function () {
          try {
            _this.$body.className = _this.$body.className.replace(bodyClassName, '');
            _this.$sidebar_mask.style.display = 'none';
          } catch (err) {}
        }, false);
      };
      Dom.bindEvent();
    })(window, document);
  }
}
