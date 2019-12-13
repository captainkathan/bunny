/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);
;
/*!
	Colorbox v1.5.8 - 2014-04-15
	jQuery lightbox and modal window plugin
	(c) 2014 Jack Moore - http://www.jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(t,e,i){function n(i,n,o){var r=e.createElement(i);return n&&(r.id=Z+n),o&&(r.style.cssText=o),t(r)}function o(){return i.innerHeight?i.innerHeight:t(i).height()}function r(e,i){i!==Object(i)&&(i={}),this.cache={},this.el=e,this.value=function(e){var n;return void 0===this.cache[e]&&(n=t(this.el).attr("data-cbox-"+e),void 0!==n?this.cache[e]=n:void 0!==i[e]?this.cache[e]=i[e]:void 0!==X[e]&&(this.cache[e]=X[e])),this.cache[e]},this.get=function(e){var i=this.value(e);return t.isFunction(i)?i.call(this.el,this):i}}function h(t){var e=W.length,i=(z+t)%e;return 0>i?e+i:i}function a(t,e){return Math.round((/%/.test(t)?("x"===e?E.width():o())/100:1)*parseInt(t,10))}function s(t,e){return t.get("photo")||t.get("photoRegex").test(e)}function l(t,e){return t.get("retinaUrl")&&i.devicePixelRatio>1?e.replace(t.get("photoRegex"),t.get("retinaSuffix")):e}function d(t){"contains"in x[0]&&!x[0].contains(t.target)&&t.target!==v[0]&&(t.stopPropagation(),x.focus())}function c(t){c.str!==t&&(x.add(v).removeClass(c.str).addClass(t),c.str=t)}function g(e){z=0,e&&e!==!1?(W=t("."+te).filter(function(){var i=t.data(this,Y),n=new r(this,i);return n.get("rel")===e}),z=W.index(_.el),-1===z&&(W=W.add(_.el),z=W.length-1)):W=t(_.el)}function u(i){t(e).trigger(i),ae.triggerHandler(i)}function f(i){var o;if(!G){if(o=t(i).data("colorbox"),_=new r(i,o),g(_.get("rel")),!$){$=q=!0,c(_.get("className")),x.css({visibility:"hidden",display:"block",opacity:""}),L=n(se,"LoadedContent","width:0; height:0; overflow:hidden; visibility:hidden"),b.css({width:"",height:""}).append(L),D=T.height()+k.height()+b.outerHeight(!0)-b.height(),j=C.width()+H.width()+b.outerWidth(!0)-b.width(),A=L.outerHeight(!0),N=L.outerWidth(!0);var h=a(_.get("initialWidth"),"x"),s=a(_.get("initialHeight"),"y"),l=_.get("maxWidth"),f=_.get("maxHeight");_.w=(l!==!1?Math.min(h,a(l,"x")):h)-N-j,_.h=(f!==!1?Math.min(s,a(f,"y")):s)-A-D,L.css({width:"",height:_.h}),J.position(),u(ee),_.get("onOpen"),O.add(I).hide(),x.focus(),_.get("trapFocus")&&e.addEventListener&&(e.addEventListener("focus",d,!0),ae.one(re,function(){e.removeEventListener("focus",d,!0)})),_.get("returnFocus")&&ae.one(re,function(){t(_.el).focus()})}v.css({opacity:parseFloat(_.get("opacity"))||"",cursor:_.get("overlayClose")?"pointer":"",visibility:"visible"}).show(),_.get("closeButton")?B.html(_.get("close")).appendTo(b):B.appendTo("<div/>"),w()}}function p(){!x&&e.body&&(V=!1,E=t(i),x=n(se).attr({id:Y,"class":t.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),v=n(se,"Overlay").hide(),S=t([n(se,"LoadingOverlay")[0],n(se,"LoadingGraphic")[0]]),y=n(se,"Wrapper"),b=n(se,"Content").append(I=n(se,"Title"),R=n(se,"Current"),P=t('<button type="button"/>').attr({id:Z+"Previous"}),K=t('<button type="button"/>').attr({id:Z+"Next"}),F=n("button","Slideshow"),S),B=t('<button type="button"/>').attr({id:Z+"Close"}),y.append(n(se).append(n(se,"TopLeft"),T=n(se,"TopCenter"),n(se,"TopRight")),n(se,!1,"clear:left").append(C=n(se,"MiddleLeft"),b,H=n(se,"MiddleRight")),n(se,!1,"clear:left").append(n(se,"BottomLeft"),k=n(se,"BottomCenter"),n(se,"BottomRight"))).find("div div").css({"float":"left"}),M=n(se,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),O=K.add(P).add(R).add(F),t(e.body).append(v,x.append(y,M)))}function m(){function i(t){t.which>1||t.shiftKey||t.altKey||t.metaKey||t.ctrlKey||(t.preventDefault(),f(this))}return x?(V||(V=!0,K.click(function(){J.next()}),P.click(function(){J.prev()}),B.click(function(){J.close()}),v.click(function(){_.get("overlayClose")&&J.close()}),t(e).bind("keydown."+Z,function(t){var e=t.keyCode;$&&_.get("escKey")&&27===e&&(t.preventDefault(),J.close()),$&&_.get("arrowKey")&&W[1]&&!t.altKey&&(37===e?(t.preventDefault(),P.click()):39===e&&(t.preventDefault(),K.click()))}),t.isFunction(t.fn.on)?t(e).on("click."+Z,"."+te,i):t("."+te).live("click."+Z,i)),!0):!1}function w(){var e,o,r,h=J.prep,d=++le;q=!0,U=!1,u(he),u(ie),_.get("onLoad"),_.h=_.get("height")?a(_.get("height"),"y")-A-D:_.get("innerHeight")&&a(_.get("innerHeight"),"y"),_.w=_.get("width")?a(_.get("width"),"x")-N-j:_.get("innerWidth")&&a(_.get("innerWidth"),"x"),_.mw=_.w,_.mh=_.h,_.get("maxWidth")&&(_.mw=a(_.get("maxWidth"),"x")-N-j,_.mw=_.w&&_.w<_.mw?_.w:_.mw),_.get("maxHeight")&&(_.mh=a(_.get("maxHeight"),"y")-A-D,_.mh=_.h&&_.h<_.mh?_.h:_.mh),e=_.get("href"),Q=setTimeout(function(){S.show()},100),_.get("inline")?(r=n(se).hide().insertBefore(t(e)[0]),ae.one(he,function(){r.replaceWith(L.children())}),h(t(e))):_.get("iframe")?h(" "):_.get("html")?h(_.get("html")):s(_,e)?(e=l(_,e),U=new Image,t(U).addClass(Z+"Photo").bind("error",function(){h(n(se,"Error").html(_.get("imgError")))}).one("load",function(){d===le&&setTimeout(function(){var e;t.each(["alt","longdesc","aria-describedby"],function(e,i){var n=t(_.el).attr(i)||t(_.el).attr("data-"+i);n&&U.setAttribute(i,n)}),_.get("retinaImage")&&i.devicePixelRatio>1&&(U.height=U.height/i.devicePixelRatio,U.width=U.width/i.devicePixelRatio),_.get("scalePhotos")&&(o=function(){U.height-=U.height*e,U.width-=U.width*e},_.mw&&U.width>_.mw&&(e=(U.width-_.mw)/U.width,o()),_.mh&&U.height>_.mh&&(e=(U.height-_.mh)/U.height,o())),_.h&&(U.style.marginTop=Math.max(_.mh-U.height,0)/2+"px"),W[1]&&(_.get("loop")||W[z+1])&&(U.style.cursor="pointer",U.onclick=function(){J.next()}),U.style.width=U.width+"px",U.style.height=U.height+"px",h(U)},1)}),U.src=e):e&&M.load(e,_.get("data"),function(e,i){d===le&&h("error"===i?n(se,"Error").html(_.get("xhrError")):t(this).contents())})}var v,x,y,b,T,C,H,k,W,E,L,M,S,I,R,F,K,P,B,O,_,D,j,A,N,z,U,$,q,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,rel:function(){return this.rel},href:function(){return t(this).attr("href")},title:function(){return this.title}},Y="colorbox",Z="cbox",te=Z+"Element",ee=Z+"_open",ie=Z+"_load",ne=Z+"_complete",oe=Z+"_cleanup",re=Z+"_closed",he=Z+"_purge",ae=t("<a/>"),se="div",le=0,de={},ce=function(){function t(){clearTimeout(h)}function e(){(_.get("loop")||W[z+1])&&(t(),h=setTimeout(J.next,_.get("slideshowSpeed")))}function i(){F.html(_.get("slideshowStop")).unbind(s).one(s,n),ae.bind(ne,e).bind(ie,t),x.removeClass(a+"off").addClass(a+"on")}function n(){t(),ae.unbind(ne,e).unbind(ie,t),F.html(_.get("slideshowStart")).unbind(s).one(s,function(){J.next(),i()}),x.removeClass(a+"on").addClass(a+"off")}function o(){r=!1,F.hide(),t(),ae.unbind(ne,e).unbind(ie,t),x.removeClass(a+"off "+a+"on")}var r,h,a=Z+"Slideshow_",s="click."+Z;return function(){r?_.get("slideshow")||(ae.unbind(oe,o),o()):_.get("slideshow")&&W[1]&&(r=!0,ae.one(oe,o),_.get("slideshowAuto")?i():n(),F.show())}}();t.colorbox||(t(p),J=t.fn[Y]=t[Y]=function(e,i){var n,o=this;if(e=e||{},t.isFunction(o))o=t("<a/>"),e.open=!0;else if(!o[0])return o;return o[0]?(p(),m()&&(i&&(e.onComplete=i),o.each(function(){var i=t.data(this,Y)||{};t.data(this,Y,t.extend(i,e))}).addClass(te),n=new r(o[0],e),n.get("open")&&f(o[0])),o):o},J.position=function(e,i){function n(){T[0].style.width=k[0].style.width=b[0].style.width=parseInt(x[0].style.width,10)-j+"px",b[0].style.height=C[0].style.height=H[0].style.height=parseInt(x[0].style.height,10)-D+"px"}var r,h,s,l=0,d=0,c=x.offset();if(E.unbind("resize."+Z),x.css({top:-9e4,left:-9e4}),h=E.scrollTop(),s=E.scrollLeft(),_.get("fixed")?(c.top-=h,c.left-=s,x.css({position:"fixed"})):(l=h,d=s,x.css({position:"absolute"})),d+=_.get("right")!==!1?Math.max(E.width()-_.w-N-j-a(_.get("right"),"x"),0):_.get("left")!==!1?a(_.get("left"),"x"):Math.round(Math.max(E.width()-_.w-N-j,0)/2),l+=_.get("bottom")!==!1?Math.max(o()-_.h-A-D-a(_.get("bottom"),"y"),0):_.get("top")!==!1?a(_.get("top"),"y"):Math.round(Math.max(o()-_.h-A-D,0)/2),x.css({top:c.top,left:c.left,visibility:"visible"}),y[0].style.width=y[0].style.height="9999px",r={width:_.w+N+j,height:_.h+A+D,top:l,left:d},e){var g=0;t.each(r,function(t){return r[t]!==de[t]?(g=e,void 0):void 0}),e=g}de=r,e||x.css(r),x.dequeue().animate(r,{duration:e||0,complete:function(){n(),q=!1,y[0].style.width=_.w+N+j+"px",y[0].style.height=_.h+A+D+"px",_.get("reposition")&&setTimeout(function(){E.bind("resize."+Z,J.position)},1),i&&i()},step:n})},J.resize=function(t){var e;$&&(t=t||{},t.width&&(_.w=a(t.width,"x")-N-j),t.innerWidth&&(_.w=a(t.innerWidth,"x")),L.css({width:_.w}),t.height&&(_.h=a(t.height,"y")-A-D),t.innerHeight&&(_.h=a(t.innerHeight,"y")),t.innerHeight||t.height||(e=L.scrollTop(),L.css({height:"auto"}),_.h=L.height()),L.css({height:_.h}),e&&L.scrollTop(e),J.position("none"===_.get("transition")?0:_.get("speed")))},J.prep=function(i){function o(){return _.w=_.w||L.width(),_.w=_.mw&&_.mw<_.w?_.mw:_.w,_.w}function a(){return _.h=_.h||L.height(),_.h=_.mh&&_.mh<_.h?_.mh:_.h,_.h}if($){var d,g="none"===_.get("transition")?0:_.get("speed");L.remove(),L=n(se,"LoadedContent").append(i),L.hide().appendTo(M.show()).css({width:o(),overflow:_.get("scrolling")?"auto":"hidden"}).css({height:a()}).prependTo(b),M.hide(),t(U).css({"float":"none"}),c(_.get("className")),d=function(){function i(){t.support.opacity===!1&&x[0].style.removeAttribute("filter")}var n,o,a=W.length;$&&(o=function(){clearTimeout(Q),S.hide(),u(ne),_.get("onComplete")},I.html(_.get("title")).show(),L.show(),a>1?("string"==typeof _.get("current")&&R.html(_.get("current").replace("{current}",z+1).replace("{total}",a)).show(),K[_.get("loop")||a-1>z?"show":"hide"]().html(_.get("next")),P[_.get("loop")||z?"show":"hide"]().html(_.get("previous")),ce(),_.get("preloading")&&t.each([h(-1),h(1)],function(){var i,n=W[this],o=new r(n,t.data(n,Y)),h=o.get("href");h&&s(o,h)&&(h=l(o,h),i=e.createElement("img"),i.src=h)})):O.hide(),_.get("iframe")?(n=e.createElement("iframe"),"frameBorder"in n&&(n.frameBorder=0),"allowTransparency"in n&&(n.allowTransparency="true"),_.get("scrolling")||(n.scrolling="no"),t(n).attr({src:_.get("href"),name:(new Date).getTime(),"class":Z+"Iframe",allowFullScreen:!0}).one("load",o).appendTo(L),ae.one(he,function(){n.src="//about:blank"}),_.get("fastIframe")&&t(n).trigger("load")):o(),"fade"===_.get("transition")?x.fadeTo(g,1,i):i())},"fade"===_.get("transition")?x.fadeTo(g,0,function(){J.position(0,d)}):J.position(g,d)}},J.next=function(){!q&&W[1]&&(_.get("loop")||W[z+1])&&(z=h(1),f(W[z]))},J.prev=function(){!q&&W[1]&&(_.get("loop")||z)&&(z=h(-1),f(W[z]))},J.close=function(){$&&!G&&(G=!0,$=!1,u(oe),_.get("onCleanup"),E.unbind("."+Z),v.fadeTo(_.get("fadeOut")||0,0),x.stop().fadeTo(_.get("fadeOut")||0,0,function(){x.hide(),v.hide(),u(he),L.remove(),setTimeout(function(){G=!1,u(re),_.get("onClosed")},1)}))},J.remove=function(){x&&(x.stop(),t.colorbox.close(),x.stop().remove(),v.remove(),G=!1,x=null,t("."+te).removeData(Y).removeClass(te),t(e).unbind("click."+Z))},J.element=function(){return t(_.el)},J.settings=X)})(jQuery,document,window);;
/*! SimpleStateManager | license: MIT | version: 2.2.4 | build date: 2014-03-12 */
!function(a,b){"use strict";var c={},d=[],e=0,f=[],g=10,h=null,i=[],j=function(){clearTimeout(h),h=setTimeout(k,g)},k=function(){e=n(),l(e)},l=function(a){for(var b=d.length,e=i.length,g=[],h=[],j=[],k=!0,l=c,m=0;b>m;m++){k=!0,l.state=d[m],l.browserWidth=a;for(var n=0;e>n;n++)if("undefined"!=typeof l.state[i[n].name]&&(l.callback=i[n].test,l.callback()===!1)){k=!1;break}k?r(f,d[m])?h=h.concat(d[m].onResize):(f.push(d[m]),j=j.concat(d[m].onEnter)):r(f,d[m])&&(g=g.concat(d[m].onLeave),f=s(f,d[m]))}t(g),t(j),t(h)};c.browserResize=l,c.getBrowserWidth=function(){return e},c.addState=function(a){var b={id:m(),minWidth:0,maxWidth:99999,onEnter:[],onLeave:[],onResize:[]};return a=o(b,a),"function"==typeof a.onEnter&&(a.onEnter=[a.onEnter]),"function"==typeof a.onLeave&&(a.onLeave=[a.onLeave]),"function"==typeof a.onResize&&(a.onResize=[a.onResize]),d.push(a),d=p(d,"minWidth"),this},c.updateState=function(a,b){for(var c=d.length-1;c>=0;c--)d[c].id===a&&(d[c]=o(d[c],b));return this},c.removeState=function(a){for(var b=d.length-1;b>=0;b--)d[b].id===a&&d.splice(b,1);return this},c.removeStates=function(a){for(var b=a.length-1;b>=0;b--)c.removeState(a[b]);return this},c.removeAllStates=function(){return d=f=[],this},c.addStates=function(a){for(var b=a.length-1;b>=0;b--)c.addState(a[b]);return this},c.getStates=function(a){var b=null,c=[];if("undefined"==typeof a)return d;b=a.length;for(var e=0;b>e;e++)c.push(q(a[e]));return c},c.addConfigOption=function(a){var b={name:"",test:null};a=o(b,a),""!==a.name&&null!==a.test&&i.push(a)},c.getConfigOption=function(a){if("string"!=typeof a)return i;for(var b=i.length-1;b>=0;b--)if(i[b].name===a)return i[b]},c.removeConfigOption=function(a){for(var b=i.length-1;b>=0;b--)i[b].name===a&&i.splice(b,1)},c.isActive=function(a){for(var b=0;b<f.length;b++)if(f[b].id===a)return!0;return!1},c.getCurrentStates=function(){return f},c.setResizeTimeout=function(a){g=a},c.getResizeTimeout=function(){return g},c.ready=function(){return e=n(),a.attachEvent?a.attachEvent("onresize",j):a.addEventListener&&a.addEventListener("resize",j,!0),l(e),this};var m=function(){for(var a="",b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",c=0;10>c;c++)a+=b.charAt(Math.floor(Math.random()*b.length));return a},n=function(){var c=0,d=null,e=!1;return"function"==typeof a.matchMedia&&(d=a.matchMedia("(width: 100px)"),"undefined"!=typeof d.addListener&&(e=!0)),e?(d=a.matchMedia("(width: 100px)"),a.matchMedia("(width:"+a.innerWidth+"px)").matches?c=a.innerWidth:a.matchMedia("(width:"+a.innerWidth+"px)").matches?c=a.outerWidth:a.matchMedia("(width:"+b.body.clientWidth+"px)").matches&&(c=b.body.clientWidth)):"number"==typeof b.body.clientWidth?c=b.body.clientWidth:"number"==typeof a.innerWidth?c=a.innerWidth:b.documentElement&&b.documentElement.clientWidth&&(c=b.documentElement.clientWidth),c},o=function(a,b){var c={};for(var d in a)c[d]=a[d];for(var e in b)c[e]=b[e];return c},p=function(a,b){return a.sort(function(a,c){var d=a[b],e=c[b];return e>d?-1:d>e?1:0})},q=function(a){for(var b=d.length-1;b>=0;b--)if(d[b].id===a)return d[b]},r=function(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return!0},s=function(a,b){for(var c=a.length,d=0;c>d;d++)a[d]===b&&a.splice(d,1);return a},t=function(a){for(var b=a.length,c=0;b>c;c++)a[c]()};c.addConfigOption({name:"minWidth",test:function(){return"number"==typeof this.state.minWidth&&this.state.minWidth<=this.browserWidth?!0:!1}}),c.addConfigOption({name:"maxWidth",test:function(){return"number"==typeof this.state.maxWidth&&this.state.maxWidth>=this.browserWidth?!0:!1}}),a.ssm=c,"function"==typeof a.define&&a.define.amd&&a.define("ssm",[],function(){return a.ssm})}(window,document);;
/*!
 * Masonry PACKAGED v3.1.5
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function(a){function b(){}function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}return this}return this.each(function(){var d=a.data(this,b);d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d))})}}if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}var d=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],c):c(a.jQuery)}(window),function(a){function b(b){var c=a.event;return c.target=c.target||c.srcElement||b,c}var c=document.documentElement,d=function(){};c.addEventListener?d=function(a,b,c){a.addEventListener(b,c,!1)}:c.attachEvent&&(d=function(a,c,d){a[c+d]=d.handleEvent?function(){var c=b(a);d.handleEvent.call(d,c)}:function(){var c=b(a);d.call(a,c)},a.attachEvent("on"+c,a[c+d])});var e=function(){};c.removeEventListener?e=function(a,b,c){a.removeEventListener(b,c,!1)}:c.detachEvent&&(e=function(a,b,c){a.detachEvent("on"+b,a[b+c]);try{delete a[b+c]}catch(d){a[b+c]=void 0}});var f={bind:d,unbind:e};"function"==typeof define&&define.amd?define("eventie/eventie",f):"object"==typeof exports?module.exports=f:a.eventie=f}(this),function(a){function b(a){"function"==typeof a&&(b.isReady?a():f.push(a))}function c(a){var c="readystatechange"===a.type&&"complete"!==e.readyState;if(!b.isReady&&!c){b.isReady=!0;for(var d=0,g=f.length;g>d;d++){var h=f[d];h()}}}function d(d){return d.bind(e,"DOMContentLoaded",c),d.bind(e,"readystatechange",c),d.bind(a,"load",c),b}var e=a.document,f=[];b.isReady=!1,"function"==typeof define&&define.amd?(b.isReady="function"==typeof requirejs,define("doc-ready/doc-ready",["eventie/eventie"],d)):a.docReady=d(a.eventie)}(this),function(){function a(){}function b(a,b){for(var c=a.length;c--;)if(a[c].listener===b)return c;return-1}function c(a){return function(){return this[a].apply(this,arguments)}}var d=a.prototype,e=this,f=e.EventEmitter;d.getListeners=function(a){var b,c,d=this._getEvents();if(a instanceof RegExp){b={};for(c in d)d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])}else b=d[a]||(d[a]=[]);return b},d.flattenListeners=function(a){var b,c=[];for(b=0;b<a.length;b+=1)c.push(a[b].listener);return c},d.getListenersAsObject=function(a){var b,c=this.getListeners(a);return c instanceof Array&&(b={},b[a]=c),b||c},d.addListener=function(a,c){var d,e=this.getListenersAsObject(a),f="object"==typeof c;for(d in e)e.hasOwnProperty(d)&&-1===b(e[d],c)&&e[d].push(f?c:{listener:c,once:!1});return this},d.on=c("addListener"),d.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})},d.once=c("addOnceListener"),d.defineEvent=function(a){return this.getListeners(a),this},d.defineEvents=function(a){for(var b=0;b<a.length;b+=1)this.defineEvent(a[b]);return this},d.removeListener=function(a,c){var d,e,f=this.getListenersAsObject(a);for(e in f)f.hasOwnProperty(e)&&(d=b(f[e],c),-1!==d&&f[e].splice(d,1));return this},d.off=c("removeListener"),d.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)},d.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)},d.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;if("object"!=typeof b||b instanceof RegExp)for(d=c.length;d--;)f.call(this,b,c[d]);else for(d in b)b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e));return this},d.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();if("string"===c)delete d[a];else if(a instanceof RegExp)for(b in d)d.hasOwnProperty(b)&&a.test(b)&&delete d[b];else delete this._events;return this},d.removeAllListeners=c("removeEvent"),d.emitEvent=function(a,b){var c,d,e,f,g=this.getListenersAsObject(a);for(e in g)if(g.hasOwnProperty(e))for(d=g[e].length;d--;)c=g[e][d],c.once===!0&&this.removeListener(a,c.listener),f=c.listener.apply(this,b||[]),f===this._getOnceReturnValue()&&this.removeListener(a,c.listener);return this},d.trigger=c("emitEvent"),d.emit=function(a){var b=Array.prototype.slice.call(arguments,1);return this.emitEvent(a,b)},d.setOnceReturnValue=function(a){return this._onceReturnValue=a,this},d._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},d._getEvents=function(){return this._events||(this._events={})},a.noConflict=function(){return e.EventEmitter=f,a},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return a}):"object"==typeof module&&module.exports?module.exports=a:this.EventEmitter=a}.call(this),function(a){function b(a){if(a){if("string"==typeof d[a])return a;a=a.charAt(0).toUpperCase()+a.slice(1);for(var b,e=0,f=c.length;f>e;e++)if(b=c[e]+a,"string"==typeof d[b])return b}}var c="Webkit Moz ms Ms O".split(" "),d=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return b}):"object"==typeof exports?module.exports=b:a.getStyleProperty=b}(window),function(a){function b(a){var b=parseFloat(a),c=-1===a.indexOf("%")&&!isNaN(b);return c&&b}function c(){for(var a={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},b=0,c=g.length;c>b;b++){var d=g[b];a[d]=0}return a}function d(a){function d(a){if("string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var d=f(a);if("none"===d.display)return c();var e={};e.width=a.offsetWidth,e.height=a.offsetHeight;for(var k=e.isBorderBox=!(!j||!d[j]||"border-box"!==d[j]),l=0,m=g.length;m>l;l++){var n=g[l],o=d[n];o=h(a,o);var p=parseFloat(o);e[n]=isNaN(p)?0:p}var q=e.paddingLeft+e.paddingRight,r=e.paddingTop+e.paddingBottom,s=e.marginLeft+e.marginRight,t=e.marginTop+e.marginBottom,u=e.borderLeftWidth+e.borderRightWidth,v=e.borderTopWidth+e.borderBottomWidth,w=k&&i,x=b(d.width);x!==!1&&(e.width=x+(w?0:q+u));var y=b(d.height);return y!==!1&&(e.height=y+(w?0:r+v)),e.innerWidth=e.width-(q+u),e.innerHeight=e.height-(r+v),e.outerWidth=e.width+s,e.outerHeight=e.height+t,e}}function h(a,b){if(e||-1===b.indexOf("%"))return b;var c=a.style,d=c.left,f=a.runtimeStyle,g=f&&f.left;return g&&(f.left=a.currentStyle.left),c.left=b,b=c.pixelLeft,c.left=d,g&&(f.left=g),b}var i,j=a("boxSizing");return function(){if(j){var a=document.createElement("div");a.style.width="200px",a.style.padding="1px 2px 3px 4px",a.style.borderStyle="solid",a.style.borderWidth="1px 2px 3px 4px",a.style[j]="border-box";var c=document.body||document.documentElement;c.appendChild(a);var d=f(a);i=200===b(d.width),c.removeChild(a)}}(),d}var e=a.getComputedStyle,f=e?function(a){return e(a,null)}:function(a){return a.currentStyle},g=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],d):"object"==typeof exports?module.exports=d(require("get-style-property")):a.getSize=d(a.getStyleProperty)}(window),function(a,b){function c(a,b){return a[h](b)}function d(a){if(!a.parentNode){var b=document.createDocumentFragment();b.appendChild(a)}}function e(a,b){d(a);for(var c=a.parentNode.querySelectorAll(b),e=0,f=c.length;f>e;e++)if(c[e]===a)return!0;return!1}function f(a,b){return d(a),c(a,b)}var g,h=function(){if(b.matchesSelector)return"matchesSelector";for(var a=["webkit","moz","ms","o"],c=0,d=a.length;d>c;c++){var e=a[c],f=e+"MatchesSelector";if(b[f])return f}}();if(h){var i=document.createElement("div"),j=c(i,"div");g=j?c:f}else g=e;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return g}):window.matchesSelector=g}(this,Element.prototype),function(a){function b(a,b){for(var c in b)a[c]=b[c];return a}function c(a){for(var b in a)return!1;return b=null,!0}function d(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function e(a,e,f){function h(a,b){a&&(this.element=a,this.layout=b,this.position={x:0,y:0},this._create())}var i=f("transition"),j=f("transform"),k=i&&j,l=!!f("perspective"),m={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[i],n=["transform","transition","transitionDuration","transitionProperty"],o=function(){for(var a={},b=0,c=n.length;c>b;b++){var d=n[b],e=f(d);e&&e!==d&&(a[d]=e)}return a}();b(h.prototype,a.prototype),h.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},h.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},h.prototype.getSize=function(){this.size=e(this.element)},h.prototype.css=function(a){var b=this.element.style;for(var c in a){var d=o[c]||c;b[d]=a[c]}},h.prototype.getPosition=function(){var a=g(this.element),b=this.layout.options,c=b.isOriginLeft,d=b.isOriginTop,e=parseInt(a[c?"left":"right"],10),f=parseInt(a[d?"top":"bottom"],10);e=isNaN(e)?0:e,f=isNaN(f)?0:f;var h=this.layout.size;e-=c?h.paddingLeft:h.paddingRight,f-=d?h.paddingTop:h.paddingBottom,this.position.x=e,this.position.y=f},h.prototype.layoutPosition=function(){var a=this.layout.size,b=this.layout.options,c={};b.isOriginLeft?(c.left=this.position.x+a.paddingLeft+"px",c.right=""):(c.right=this.position.x+a.paddingRight+"px",c.left=""),b.isOriginTop?(c.top=this.position.y+a.paddingTop+"px",c.bottom=""):(c.bottom=this.position.y+a.paddingBottom+"px",c.top=""),this.css(c),this.emitEvent("layout",[this])};var p=l?function(a,b){return"translate3d("+a+"px, "+b+"px, 0)"}:function(a,b){return"translate("+a+"px, "+b+"px)"};h.prototype._transitionTo=function(a,b){this.getPosition();var c=this.position.x,d=this.position.y,e=parseInt(a,10),f=parseInt(b,10),g=e===this.position.x&&f===this.position.y;if(this.setPosition(a,b),g&&!this.isTransitioning)return void this.layoutPosition();var h=a-c,i=b-d,j={},k=this.layout.options;h=k.isOriginLeft?h:-h,i=k.isOriginTop?i:-i,j.transform=p(h,i),this.transition({to:j,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},h.prototype.goTo=function(a,b){this.setPosition(a,b),this.layoutPosition()},h.prototype.moveTo=k?h.prototype._transitionTo:h.prototype.goTo,h.prototype.setPosition=function(a,b){this.position.x=parseInt(a,10),this.position.y=parseInt(b,10)},h.prototype._nonTransition=function(a){this.css(a.to),a.isCleaning&&this._removeStyles(a.to);for(var b in a.onTransitionEnd)a.onTransitionEnd[b].call(this)},h.prototype._transition=function(a){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(a);var b=this._transn;for(var c in a.onTransitionEnd)b.onEnd[c]=a.onTransitionEnd[c];for(c in a.to)b.ingProperties[c]=!0,a.isCleaning&&(b.clean[c]=!0);if(a.from){this.css(a.from);var d=this.element.offsetHeight;d=null}this.enableTransition(a.to),this.css(a.to),this.isTransitioning=!0};var q=j&&d(j)+",opacity";h.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:q,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(m,this,!1))},h.prototype.transition=h.prototype[i?"_transition":"_nonTransition"],h.prototype.onwebkitTransitionEnd=function(a){this.ontransitionend(a)},h.prototype.onotransitionend=function(a){this.ontransitionend(a)};var r={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};h.prototype.ontransitionend=function(a){if(a.target===this.element){var b=this._transn,d=r[a.propertyName]||a.propertyName;if(delete b.ingProperties[d],c(b.ingProperties)&&this.disableTransition(),d in b.clean&&(this.element.style[a.propertyName]="",delete b.clean[d]),d in b.onEnd){var e=b.onEnd[d];e.call(this),delete b.onEnd[d]}this.emitEvent("transitionEnd",[this])}},h.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(m,this,!1),this.isTransitioning=!1},h.prototype._removeStyles=function(a){var b={};for(var c in a)b[c]="";this.css(b)};var s={transitionProperty:"",transitionDuration:""};return h.prototype.removeTransitionStyles=function(){this.css(s)},h.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},h.prototype.remove=function(){if(!i||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();var a=this;this.on("transitionEnd",function(){return a.removeElem(),!0}),this.hide()},h.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var a=this.layout.options;this.transition({from:a.hiddenStyle,to:a.visibleStyle,isCleaning:!0})},h.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var a=this.layout.options;this.transition({from:a.visibleStyle,to:a.hiddenStyle,isCleaning:!0,onTransitionEnd:{opacity:function(){this.isHidden&&this.css({display:"none"})}}})},h.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},h}var f=a.getComputedStyle,g=f?function(a){return f(a,null)}:function(a){return a.currentStyle};"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],e):(a.Outlayer={},a.Outlayer.Item=e(a.EventEmitter,a.getSize,a.getStyleProperty))}(window),function(a){function b(a,b){for(var c in b)a[c]=b[c];return a}function c(a){return"[object Array]"===l.call(a)}function d(a){var b=[];if(c(a))b=a;else if(a&&"number"==typeof a.length)for(var d=0,e=a.length;e>d;d++)b.push(a[d]);else b.push(a);return b}function e(a,b){var c=n(b,a);-1!==c&&b.splice(c,1)}function f(a){return a.replace(/(.)([A-Z])/g,function(a,b,c){return b+"-"+c}).toLowerCase()}function g(c,g,l,n,o,p){function q(a,c){if("string"==typeof a&&(a=h.querySelector(a)),!a||!m(a))return void(i&&i.error("Bad "+this.constructor.namespace+" element: "+a));this.element=a,this.options=b({},this.constructor.defaults),this.option(c);var d=++r;this.element.outlayerGUID=d,s[d]=this,this._create(),this.options.isInitLayout&&this.layout()}var r=0,s={};return q.namespace="outlayer",q.Item=p,q.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},b(q.prototype,l.prototype),q.prototype.option=function(a){b(this.options,a)},q.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),b(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},q.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},q.prototype._itemize=function(a){for(var b=this._filterFindItemElements(a),c=this.constructor.Item,d=[],e=0,f=b.length;f>e;e++){var g=b[e],h=new c(g,this);d.push(h)}return d},q.prototype._filterFindItemElements=function(a){a=d(a);for(var b=this.options.itemSelector,c=[],e=0,f=a.length;f>e;e++){var g=a[e];if(m(g))if(b){o(g,b)&&c.push(g);for(var h=g.querySelectorAll(b),i=0,j=h.length;j>i;i++)c.push(h[i])}else c.push(g)}return c},q.prototype.getItemElements=function(){for(var a=[],b=0,c=this.items.length;c>b;b++)a.push(this.items[b].element);return a},q.prototype.layout=function(){this._resetLayout(),this._manageStamps();var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,a),this._isLayoutInited=!0},q.prototype._init=q.prototype.layout,q.prototype._resetLayout=function(){this.getSize()},q.prototype.getSize=function(){this.size=n(this.element)},q.prototype._getMeasurement=function(a,b){var c,d=this.options[a];d?("string"==typeof d?c=this.element.querySelector(d):m(d)&&(c=d),this[a]=c?n(c)[b]:d):this[a]=0},q.prototype.layoutItems=function(a,b){a=this._getItemsForLayout(a),this._layoutItems(a,b),this._postLayout()},q.prototype._getItemsForLayout=function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.isIgnored||b.push(e)}return b},q.prototype._layoutItems=function(a,b){function c(){d.emitEvent("layoutComplete",[d,a])}var d=this;if(!a||!a.length)return void c();this._itemsOn(a,"layout",c);for(var e=[],f=0,g=a.length;g>f;f++){var h=a[f],i=this._getItemLayoutPosition(h);i.item=h,i.isInstant=b||h.isLayoutInstant,e.push(i)}this._processLayoutQueue(e)},q.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},q.prototype._processLayoutQueue=function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];this._positionItem(d.item,d.x,d.y,d.isInstant)}},q.prototype._positionItem=function(a,b,c,d){d?a.goTo(b,c):a.moveTo(b,c)},q.prototype._postLayout=function(){this.resizeContainer()},q.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var a=this._getContainerSize();a&&(this._setContainerMeasure(a.width,!0),this._setContainerMeasure(a.height,!1))}},q.prototype._getContainerSize=k,q.prototype._setContainerMeasure=function(a,b){if(void 0!==a){var c=this.size;c.isBorderBox&&(a+=b?c.paddingLeft+c.paddingRight+c.borderLeftWidth+c.borderRightWidth:c.paddingBottom+c.paddingTop+c.borderTopWidth+c.borderBottomWidth),a=Math.max(a,0),this.element.style[b?"width":"height"]=a+"px"}},q.prototype._itemsOn=function(a,b,c){function d(){return e++,e===f&&c.call(g),!0}for(var e=0,f=a.length,g=this,h=0,i=a.length;i>h;h++){var j=a[h];j.on(b,d)}},q.prototype.ignore=function(a){var b=this.getItem(a);b&&(b.isIgnored=!0)},q.prototype.unignore=function(a){var b=this.getItem(a);b&&delete b.isIgnored},q.prototype.stamp=function(a){if(a=this._find(a)){this.stamps=this.stamps.concat(a);for(var b=0,c=a.length;c>b;b++){var d=a[b];this.ignore(d)}}},q.prototype.unstamp=function(a){if(a=this._find(a))for(var b=0,c=a.length;c>b;b++){var d=a[b];e(d,this.stamps),this.unignore(d)}},q.prototype._find=function(a){return a?("string"==typeof a&&(a=this.element.querySelectorAll(a)),a=d(a)):void 0},q.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var a=0,b=this.stamps.length;b>a;a++){var c=this.stamps[a];this._manageStamp(c)}}},q.prototype._getBoundingRect=function(){var a=this.element.getBoundingClientRect(),b=this.size;this._boundingRect={left:a.left+b.paddingLeft+b.borderLeftWidth,top:a.top+b.paddingTop+b.borderTopWidth,right:a.right-(b.paddingRight+b.borderRightWidth),bottom:a.bottom-(b.paddingBottom+b.borderBottomWidth)}},q.prototype._manageStamp=k,q.prototype._getElementOffset=function(a){var b=a.getBoundingClientRect(),c=this._boundingRect,d=n(a),e={left:b.left-c.left-d.marginLeft,top:b.top-c.top-d.marginTop,right:c.right-b.right-d.marginRight,bottom:c.bottom-b.bottom-d.marginBottom};return e},q.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},q.prototype.bindResize=function(){this.isResizeBound||(c.bind(a,"resize",this),this.isResizeBound=!0)},q.prototype.unbindResize=function(){this.isResizeBound&&c.unbind(a,"resize",this),this.isResizeBound=!1},q.prototype.onresize=function(){function a(){b.resize(),delete b.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var b=this;this.resizeTimeout=setTimeout(a,100)},q.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},q.prototype.needsResizeLayout=function(){var a=n(this.element),b=this.size&&a;return b&&a.innerWidth!==this.size.innerWidth},q.prototype.addItems=function(a){var b=this._itemize(a);return b.length&&(this.items=this.items.concat(b)),b},q.prototype.appended=function(a){var b=this.addItems(a);b.length&&(this.layoutItems(b,!0),this.reveal(b))},q.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){var c=this.items.slice(0);this.items=b.concat(c),this._resetLayout(),this._manageStamps(),this.layoutItems(b,!0),this.reveal(b),this.layoutItems(c)}},q.prototype.reveal=function(a){var b=a&&a.length;if(b)for(var c=0;b>c;c++){var d=a[c];d.reveal()}},q.prototype.hide=function(a){var b=a&&a.length;if(b)for(var c=0;b>c;c++){var d=a[c];d.hide()}},q.prototype.getItem=function(a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.element===a)return d}},q.prototype.getItems=function(a){if(a&&a.length){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c],f=this.getItem(e);f&&b.push(f)}return b}},q.prototype.remove=function(a){a=d(a);var b=this.getItems(a);if(b&&b.length){this._itemsOn(b,"remove",function(){this.emitEvent("removeComplete",[this,b])});for(var c=0,f=b.length;f>c;c++){var g=b[c];g.remove(),e(g,this.items)}}},q.prototype.destroy=function(){var a=this.element.style;a.height="",a.position="",a.width="";for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];d.destroy()}this.unbindResize(),delete this.element.outlayerGUID,j&&j.removeData(this.element,this.constructor.namespace)},q.data=function(a){var b=a&&a.outlayerGUID;return b&&s[b]},q.create=function(a,c){function d(){q.apply(this,arguments)}return Object.create?d.prototype=Object.create(q.prototype):b(d.prototype,q.prototype),d.prototype.constructor=d,d.defaults=b({},q.defaults),b(d.defaults,c),d.prototype.settings={},d.namespace=a,d.data=q.data,d.Item=function(){p.apply(this,arguments)},d.Item.prototype=new p,g(function(){for(var b=f(a),c=h.querySelectorAll(".js-"+b),e="data-"+b+"-options",g=0,k=c.length;k>g;g++){var l,m=c[g],n=m.getAttribute(e);try{l=n&&JSON.parse(n)}catch(o){i&&i.error("Error parsing "+e+" on "+m.nodeName.toLowerCase()+(m.id?"#"+m.id:"")+": "+o);continue}var p=new d(m,l);j&&j.data(m,a,p)}}),j&&j.bridget&&j.bridget(a,d),d},q.Item=p,q}var h=a.document,i=a.console,j=a.jQuery,k=function(){},l=Object.prototype.toString,m="object"==typeof HTMLElement?function(a){return a instanceof HTMLElement}:function(a){return a&&"object"==typeof a&&1===a.nodeType&&"string"==typeof a.nodeName},n=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1};"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],g):a.Outlayer=g(a.eventie,a.docReady,a.EventEmitter,a.getSize,a.matchesSelector,a.Outlayer.Item)}(window),function(a){function b(a,b){var d=a.create("masonry");return d.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var a=this.cols;for(this.colYs=[];a--;)this.colYs.push(0);this.maxY=0},d.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var a=this.items[0],c=a&&a.element;this.columnWidth=c&&b(c).outerWidth||this.containerWidth}this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},d.prototype.getContainerWidth=function(){var a=this.options.isFitWidth?this.element.parentNode:this.element,c=b(a);this.containerWidth=c&&c.innerWidth},d.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth%this.columnWidth,d=b&&1>b?"round":"ceil",e=Math[d](a.size.outerWidth/this.columnWidth);e=Math.min(e,this.cols);for(var f=this._getColGroup(e),g=Math.min.apply(Math,f),h=c(f,g),i={x:this.columnWidth*h,y:g},j=g+a.size.outerHeight,k=this.cols+1-f.length,l=0;k>l;l++)this.colYs[h+l]=j;return i},d.prototype._getColGroup=function(a){if(2>a)return this.colYs;for(var b=[],c=this.cols+1-a,d=0;c>d;d++){var e=this.colYs.slice(d,d+a);b[d]=Math.max.apply(Math,e)}return b},d.prototype._manageStamp=function(a){var c=b(a),d=this._getElementOffset(a),e=this.options.isOriginLeft?d.left:d.right,f=e+c.outerWidth,g=Math.floor(e/this.columnWidth);g=Math.max(0,g);var h=Math.floor(f/this.columnWidth);h-=f%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var i=(this.options.isOriginTop?d.top:d.bottom)+c.outerHeight,j=g;h>=j;j++)this.colYs[j]=Math.max(i,this.colYs[j])},d.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var a={height:this.maxY};return this.options.isFitWidth&&(a.width=this._getContainerFitWidth()),a},d.prototype._getContainerFitWidth=function(){for(var a=0,b=this.cols;--b&&0===this.colYs[b];)a++;return(this.cols-a)*this.columnWidth-this.gutter},d.prototype.needsResizeLayout=function(){var a=this.containerWidth;return this.getContainerWidth(),a!==this.containerWidth},d}var c=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++){var e=a[c];if(e===b)return c}return-1};"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],b):a.Masonry=b(a.Outlayer,a.getSize)}(window);;
/*!
Chosen, a Select Box Enhancer for jQuery and Prototype
by Patrick Filler for Harvest, http://getharvest.com

Version 1.3.0
Full source at https://github.com/harvesthq/chosen
Copyright (c) 2011-2014 Harvest http://getharvest.com

MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md
This file is generated by `grunt build`, do not edit it by hand.
*/

(function() {
  var $, AbstractChosen, Chosen, SelectParser, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SelectParser = (function() {
    function SelectParser() {
      this.options_index = 0;
      this.parsed = [];
    }

    SelectParser.prototype.add_node = function(child) {
      if (child.nodeName.toUpperCase() === "OPTGROUP") {
        return this.add_group(child);
      } else {
        return this.add_option(child);
      }
    };

    SelectParser.prototype.add_group = function(group) {
      var group_position, option, _i, _len, _ref, _results;
      group_position = this.parsed.length;
      this.parsed.push({
        array_index: group_position,
        group: true,
        label: this.escapeExpression(group.label),
        children: 0,
        disabled: group.disabled,
        classes: group.className
      });
      _ref = group.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        _results.push(this.add_option(option, group_position, group.disabled));
      }
      return _results;
    };

    SelectParser.prototype.add_option = function(option, group_position, group_disabled) {
      if (option.nodeName.toUpperCase() === "OPTION") {
        if (option.text !== "") {
          if (group_position != null) {
            this.parsed[group_position].children += 1;
          }
          this.parsed.push({
            array_index: this.parsed.length,
            options_index: this.options_index,
            value: option.value,
            text: option.text,
            html: option.innerHTML,
            selected: option.selected,
            disabled: group_disabled === true ? group_disabled : option.disabled,
            group_array_index: group_position,
            classes: option.className,
            style: option.style.cssText
          });
        } else {
          this.parsed.push({
            array_index: this.parsed.length,
            options_index: this.options_index,
            empty: true
          });
        }
        return this.options_index += 1;
      }
    };

    SelectParser.prototype.escapeExpression = function(text) {
      var map, unsafe_chars;
      if ((text == null) || text === false) {
        return "";
      }
      if (!/[\&\<\>\"\'\`]/.test(text)) {
        return text;
      }
      map = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
      };
      unsafe_chars = /&(?!\w+;)|[\<\>\"\'\`]/g;
      return text.replace(unsafe_chars, function(chr) {
        return map[chr] || "&amp;";
      });
    };

    return SelectParser;

  })();

  SelectParser.select_to_array = function(select) {
    var child, parser, _i, _len, _ref;
    parser = new SelectParser();
    _ref = select.childNodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      parser.add_node(child);
    }
    return parser.parsed;
  };

  AbstractChosen = (function() {
    function AbstractChosen(form_field, options) {
      this.form_field = form_field;
      this.options = options != null ? options : {};
      if (!AbstractChosen.browser_is_supported()) {
        return;
      }
      this.is_multiple = this.form_field.multiple;
      this.set_default_text();
      this.set_default_values();
      this.setup();
      this.set_up_html();
      this.register_observers();
      this.on_ready();
    }

    AbstractChosen.prototype.set_default_values = function() {
      var _this = this;
      this.click_test_action = function(evt) {
        return _this.test_active_click(evt);
      };
      this.activate_action = function(evt) {
        return _this.activate_field(evt);
      };
      this.active_field = false;
      this.mouse_on_container = false;
      this.results_showing = false;
      this.result_highlighted = null;
      this.allow_single_deselect = (this.options.allow_single_deselect != null) && (this.form_field.options[0] != null) && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : false;
      this.disable_search_threshold = this.options.disable_search_threshold || 0;
      this.disable_search = this.options.disable_search || false;
      this.enable_split_word_search = this.options.enable_split_word_search != null ? this.options.enable_split_word_search : true;
      this.group_search = this.options.group_search != null ? this.options.group_search : true;
      this.search_contains = this.options.search_contains || false;
      this.single_backstroke_delete = this.options.single_backstroke_delete != null ? this.options.single_backstroke_delete : true;
      this.max_selected_options = this.options.max_selected_options || Infinity;
      this.inherit_select_classes = this.options.inherit_select_classes || false;
      this.font_select = this.options.font_select || false;
      this.display_selected_options = this.options.display_selected_options != null ? this.options.display_selected_options : true;
      return this.display_disabled_options = this.options.display_disabled_options != null ? this.options.display_disabled_options : true;
    };

    AbstractChosen.prototype.set_default_text = function() {
      if (this.form_field.getAttribute("data-placeholder")) {
        this.default_text = this.form_field.getAttribute("data-placeholder");
      } else if (this.is_multiple) {
        this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text;
      } else {
        this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text;
      }
      return this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text;
    };

    AbstractChosen.prototype.mouse_enter = function() {
      return this.mouse_on_container = true;
    };

    AbstractChosen.prototype.mouse_leave = function() {
      return this.mouse_on_container = false;
    };

    AbstractChosen.prototype.input_focus = function(evt) {
      var _this = this;
      if (this.is_multiple) {
        if (!this.active_field) {
          return setTimeout((function() {
            return _this.container_mousedown();
          }), 50);
        }
      } else {
        if (!this.active_field) {
          return this.activate_field();
        }
      }
    };

    AbstractChosen.prototype.input_blur = function(evt) {
      var _this = this;
      if (!this.mouse_on_container) {
        this.active_field = false;
        return setTimeout((function() {
          return _this.blur_test();
        }), 100);
      }
    };

    AbstractChosen.prototype.results_option_build = function(options) {
      var content, data, _i, _len, _ref;
      content = '';
      _ref = this.results_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        data = _ref[_i];
        if (data.group) {
          content += this.result_add_group(data);
        } else {
          content += this.result_add_option(data);
        }
        if (options != null ? options.first : void 0) {
          if (data.selected && this.is_multiple) {
            this.choice_build(data);
          } else if (data.selected && !this.is_multiple) {
            this.single_set_selected_text(data.text);
          }
        }
      }
      return content;
    };

    AbstractChosen.prototype.result_add_option = function(option) {
      var classes, option_el;
      if (!option.search_match) {
        return '';
      }
      if (!this.include_option_in_results(option)) {
        return '';
      }
      classes = [];
      if (!option.disabled && !(option.selected && this.is_multiple)) {
        classes.push("active-result");
      }
      if (option.disabled && !(option.selected && this.is_multiple)) {
        classes.push("disabled-result");
      }
      if (option.selected) {
        classes.push("result-selected");
      }
      if (option.group_array_index != null) {
        classes.push("group-option");
      }
      if (option.classes !== "") {
        classes.push(option.classes);
      }
      option_el = document.createElement("li");
      option_el.className = classes.join(" ");
      option_el.style.cssText = option.style;
      option_el.setAttribute("data-option-array-index", option.array_index);
      option_el.innerHTML = option.search_text;
      if (this.font_select) {
      	$(option_el).css('font-family',option.text)
      }
      return this.outerHTML(option_el);
    };

    AbstractChosen.prototype.result_add_group = function(group) {
      var classes, group_el;
      if (!(group.search_match || group.group_match)) {
        return '';
      }
      if (!(group.active_options > 0)) {
        return '';
      }
      classes = [];
      classes.push("group-result");
      if (group.classes) {
        classes.push(group.classes);
      }
      group_el = document.createElement("li");
      group_el.className = classes.join(" ");
      group_el.innerHTML = group.search_text;
      return this.outerHTML(group_el);
    };

    AbstractChosen.prototype.results_update_field = function() {
      this.set_default_text();
      if (!this.is_multiple) {
        this.results_reset_cleanup();
      }
      this.result_clear_highlight();
      this.results_build();
      if (this.results_showing) {
        return this.winnow_results();
      }
    };

    AbstractChosen.prototype.reset_single_select_options = function() {
      var result, _i, _len, _ref, _results;
      _ref = this.results_data;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        result = _ref[_i];
        if (result.selected) {
          _results.push(result.selected = false);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    AbstractChosen.prototype.results_toggle = function() {
      if (this.results_showing) {
        return this.results_hide();
      } else {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.results_search = function(evt) {
      if (this.results_showing) {
        return this.winnow_results();
      } else {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.winnow_results = function() {
      var escapedSearchText, option, regex, results, results_group, searchText, startpos, text, zregex, _i, _len, _ref;
      this.no_results_clear();
      results = 0;
      searchText = this.get_search_text();
      escapedSearchText = searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      zregex = new RegExp(escapedSearchText, 'i');
      regex = this.get_search_regex(escapedSearchText);
      _ref = this.results_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        option.search_match = false;
        results_group = null;
        if (this.include_option_in_results(option)) {
          if (option.group) {
            option.group_match = false;
            option.active_options = 0;
          }
          if ((option.group_array_index != null) && this.results_data[option.group_array_index]) {
            results_group = this.results_data[option.group_array_index];
            if (results_group.active_options === 0 && results_group.search_match) {
              results += 1;
            }
            results_group.active_options += 1;
          }
          if (!(option.group && !this.group_search)) {
            option.search_text = option.group ? option.label : option.text;
            option.search_match = this.search_string_match(option.search_text, regex);
            if (option.search_match && !option.group) {
              results += 1;
            }
            if (option.search_match) {
              if (searchText.length) {
                startpos = option.search_text.search(zregex);
                text = option.search_text.substr(0, startpos + searchText.length) + '</em>' + option.search_text.substr(startpos + searchText.length);
                option.search_text = text.substr(0, startpos) + '<em>' + text.substr(startpos);
              }
              if (results_group != null) {
                results_group.group_match = true;
              }
            } else if ((option.group_array_index != null) && this.results_data[option.group_array_index].search_match) {
              option.search_match = true;
            }
          }
        }
      }
      this.result_clear_highlight();
      if (results < 1 && searchText.length) {
        this.update_results_content("");
        return this.no_results(searchText);
      } else {
        this.update_results_content(this.results_option_build());
        return this.winnow_results_set_highlight();
      }
    };

    AbstractChosen.prototype.get_search_regex = function(escaped_search_string) {
      var regex_anchor;
      regex_anchor = this.search_contains ? "" : "^";
      return new RegExp(regex_anchor + escaped_search_string, 'i');
    };

    AbstractChosen.prototype.search_string_match = function(search_string, regex) {
      var part, parts, _i, _len;
      if (regex.test(search_string)) {
        return true;
      } else if (this.enable_split_word_search && (search_string.indexOf(" ") >= 0 || search_string.indexOf("[") === 0)) {
        parts = search_string.replace(/\[|\]/g, "").split(" ");
        if (parts.length) {
          for (_i = 0, _len = parts.length; _i < _len; _i++) {
            part = parts[_i];
            if (regex.test(part)) {
              return true;
            }
          }
        }
      }
    };

    AbstractChosen.prototype.choices_count = function() {
      var option, _i, _len, _ref;
      if (this.selected_option_count != null) {
        return this.selected_option_count;
      }
      this.selected_option_count = 0;
      _ref = this.form_field.options;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        if (option.selected) {
          this.selected_option_count += 1;
        }
      }
      return this.selected_option_count;
    };

    AbstractChosen.prototype.choices_click = function(evt) {
      evt.preventDefault();
      if (!(this.results_showing || this.is_disabled)) {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.keyup_checker = function(evt) {
      var stroke, _ref;
      stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;
      this.search_field_scale();
      switch (stroke) {
        case 8:
          if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) {
            return this.keydown_backstroke();
          } else if (!this.pending_backstroke) {
            this.result_clear_highlight();
            return this.results_search();
          }
          break;
        case 13:
          evt.preventDefault();
          if (this.results_showing) {
            return this.result_select(evt);
          }
          break;
        case 27:
          if (this.results_showing) {
            this.results_hide();
          }
          return true;
        case 9:
        case 38:
        case 40:
        case 16:
        case 91:
        case 17:
          break;
        default:
          return this.results_search();
      }
    };

    AbstractChosen.prototype.clipboard_event_checker = function(evt) {
      var _this = this;
      return setTimeout((function() {
        return _this.results_search();
      }), 50);
    };

    AbstractChosen.prototype.container_width = function() {
      if (this.options.width != null) {
        return this.options.width;
      } else {
        return "" + this.form_field.offsetWidth + "px";
      }
    };

    AbstractChosen.prototype.include_option_in_results = function(option) {
      if (this.is_multiple && (!this.display_selected_options && option.selected)) {
        return false;
      }
      if (!this.display_disabled_options && option.disabled) {
        return false;
      }
      if (option.empty) {
        return false;
      }
      return true;
    };

    AbstractChosen.prototype.search_results_touchstart = function(evt) {
      this.touch_started = true;
      return this.search_results_mouseover(evt);
    };

    AbstractChosen.prototype.search_results_touchmove = function(evt) {
      this.touch_started = false;
      return this.search_results_mouseout(evt);
    };

    AbstractChosen.prototype.search_results_touchend = function(evt) {
      if (this.touch_started) {
        return this.search_results_mouseup(evt);
      }
    };

    AbstractChosen.prototype.outerHTML = function(element) {
      var tmp;
      if (element.outerHTML) {
        return element.outerHTML;
      }
      tmp = document.createElement("div");
      tmp.appendChild(element);
      return tmp.innerHTML;
    };

    AbstractChosen.browser_is_supported = function() {
      if (window.navigator.appName === "Microsoft Internet Explorer") {
        return document.documentMode >= 8;
      }
      if (/iP(od|hone)/i.test(window.navigator.userAgent)) {
        return false;
      }
      if (/Android/i.test(window.navigator.userAgent)) {
        if (/Mobile/i.test(window.navigator.userAgent)) {
          return false;
        }
      }
      return true;
    };

    AbstractChosen.default_multiple_text = "Select Some Options";

    AbstractChosen.default_single_text = "Select an Option";

    AbstractChosen.default_no_result_text = "No results match";

    return AbstractChosen;

  })();

  $ = jQuery;

  $.fn.extend({
    chosen: function(options) {
      if (!AbstractChosen.browser_is_supported()) {
        return this;
      }
      return this.each(function(input_field) {
        var $this, chosen;
        $this = $(this);
        chosen = $this.data('chosen');
        if (options === 'destroy' && chosen instanceof Chosen) {
          chosen.destroy();
        } else if (!(chosen instanceof Chosen)) {
          $this.data('chosen', new Chosen(this, options));
        }
      });
    }
  });

  Chosen = (function(_super) {
    __extends(Chosen, _super);

    function Chosen() {
      _ref = Chosen.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Chosen.prototype.setup = function() {
      this.form_field_jq = $(this.form_field);
      this.current_selectedIndex = this.form_field.selectedIndex;
      return this.is_rtl = this.form_field_jq.hasClass("chosen-rtl");
    };

    Chosen.prototype.set_up_html = function() {
      var container_classes, container_props;
      container_classes = ["chosen-container"];
      container_classes.push("chosen-container-" + (this.is_multiple ? "multi" : "single"));
      if (this.inherit_select_classes && this.form_field.className) {
        container_classes.push(this.form_field.className);
      }
      if (this.is_rtl) {
        container_classes.push("chosen-rtl");
      }
      container_props = {
        'class': container_classes.join(' '),
        'style': "width: " + (this.container_width()) + ";",
        'title': this.form_field.title
      };
      if (this.form_field.id.length) {
        container_props.id = this.form_field.id.replace(/[^\w]/g, '_') + "_chosen";
      }
      this.container = $("<div />", container_props);
      if (this.is_multiple) {
        this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>');
      } else {
        this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>');
      }
      this.form_field_jq.hide().after(this.container);
      this.dropdown = this.container.find('div.chosen-drop').first();
      this.search_field = this.container.find('input').first();
      this.search_results = this.container.find('ul.chosen-results').first();
      this.search_field_scale();
      this.search_no_results = this.container.find('li.no-results').first();
      if (this.is_multiple) {
        this.search_choices = this.container.find('ul.chosen-choices').first();
        this.search_container = this.container.find('li.search-field').first();
      } else {
        this.search_container = this.container.find('div.chosen-search').first();
        this.selected_item = this.container.find('.chosen-single').first();
      }
      this.results_build();
      this.set_tab_index();
      return this.set_label_behavior();
    };

    Chosen.prototype.on_ready = function() {
      return this.form_field_jq.trigger("chosen:ready", {
        chosen: this
      });
    };

    Chosen.prototype.register_observers = function() {
      var _this = this;
      this.container.bind('touchstart.chosen', function(evt) {
        _this.container_mousedown(evt);
      });
      this.container.bind('touchend.chosen', function(evt) {
        _this.container_mouseup(evt);
      });
      this.container.bind('mousedown.chosen', function(evt) {
        _this.container_mousedown(evt);
      });
      this.container.bind('mouseup.chosen', function(evt) {
        _this.container_mouseup(evt);
      });
      this.container.bind('mouseenter.chosen', function(evt) {
        _this.mouse_enter(evt);
      });
      this.container.bind('mouseleave.chosen', function(evt) {
        _this.mouse_leave(evt);
      });
      this.search_results.bind('mouseup.chosen', function(evt) {
        _this.search_results_mouseup(evt);
      });
      this.search_results.bind('mouseover.chosen', function(evt) {
        _this.search_results_mouseover(evt);
      });
      this.search_results.bind('mouseout.chosen', function(evt) {
        _this.search_results_mouseout(evt);
      });
      this.search_results.bind('mousewheel.chosen DOMMouseScroll.chosen', function(evt) {
        _this.search_results_mousewheel(evt);
      });
      this.search_results.bind('touchstart.chosen', function(evt) {
        _this.search_results_touchstart(evt);
      });
      this.search_results.bind('touchmove.chosen', function(evt) {
        _this.search_results_touchmove(evt);
      });
      this.search_results.bind('touchend.chosen', function(evt) {
        _this.search_results_touchend(evt);
      });
      this.form_field_jq.bind("chosen:updated.chosen", function(evt) {
        _this.results_update_field(evt);
      });
      this.form_field_jq.bind("chosen:activate.chosen", function(evt) {
        _this.activate_field(evt);
      });
      this.form_field_jq.bind("chosen:open.chosen", function(evt) {
        _this.container_mousedown(evt);
      });
      this.form_field_jq.bind("chosen:close.chosen", function(evt) {
        _this.input_blur(evt);
      });
      this.search_field.bind('blur.chosen', function(evt) {
        _this.input_blur(evt);
      });
      this.search_field.bind('keyup.chosen', function(evt) {
        _this.keyup_checker(evt);
      });
      this.search_field.bind('keydown.chosen', function(evt) {
        _this.keydown_checker(evt);
      });
      this.search_field.bind('focus.chosen', function(evt) {
        _this.input_focus(evt);
      });
      this.search_field.bind('cut.chosen', function(evt) {
        _this.clipboard_event_checker(evt);
      });
      this.search_field.bind('paste.chosen', function(evt) {
        _this.clipboard_event_checker(evt);
      });
      if (this.is_multiple) {
        return this.search_choices.bind('click.chosen', function(evt) {
          _this.choices_click(evt);
        });
      } else {
        return this.container.bind('click.chosen', function(evt) {
          evt.preventDefault();
        });
      }
    };

    Chosen.prototype.destroy = function() {
      $(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action);
      if (this.search_field[0].tabIndex) {
        this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex;
      }
      this.container.remove();
      this.form_field_jq.removeData('chosen');
      return this.form_field_jq.show();
    };

    Chosen.prototype.search_field_disabled = function() {
      this.is_disabled = this.form_field_jq[0].disabled;
      if (this.is_disabled) {
        this.container.addClass('chosen-disabled');
        this.search_field[0].disabled = true;
        if (!this.is_multiple) {
          this.selected_item.unbind("focus.chosen", this.activate_action);
        }
        return this.close_field();
      } else {
        this.container.removeClass('chosen-disabled');
        this.search_field[0].disabled = false;
        if (!this.is_multiple) {
          return this.selected_item.bind("focus.chosen", this.activate_action);
        }
      }
    };

    Chosen.prototype.container_mousedown = function(evt) {
      if (!this.is_disabled) {
        if (evt && evt.type === "mousedown" && !this.results_showing) {
          evt.preventDefault();
        }
        if (!((evt != null) && ($(evt.target)).hasClass("search-choice-close"))) {
          if (!this.active_field) {
            if (this.is_multiple) {
              this.search_field.val("");
            }
            $(this.container[0].ownerDocument).bind('click.chosen', this.click_test_action);
            this.results_show();
          } else if (!this.is_multiple && evt && (($(evt.target)[0] === this.selected_item[0]) || $(evt.target).parents("a.chosen-single").length)) {
            evt.preventDefault();
            this.results_toggle();
          }
          return this.activate_field();
        }
      }
    };

    Chosen.prototype.container_mouseup = function(evt) {
      if (evt.target.nodeName === "ABBR" && !this.is_disabled) {
        return this.results_reset(evt);
      }
    };

    Chosen.prototype.search_results_mousewheel = function(evt) {
      var delta;
      if (evt.originalEvent) {
        delta = evt.originalEvent.deltaY || -evt.originalEvent.wheelDelta || evt.originalEvent.detail;
      }
      if (delta != null) {
        evt.preventDefault();
        if (evt.type === 'DOMMouseScroll') {
          delta = delta * 40;
        }
        return this.search_results.scrollTop(delta + this.search_results.scrollTop());
      }
    };

    Chosen.prototype.blur_test = function(evt) {
      if (!this.active_field && this.container.hasClass("chosen-container-active")) {
        return this.close_field();
      }
    };

    Chosen.prototype.close_field = function() {
      $(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action);
      this.active_field = false;
      this.results_hide();
      this.container.removeClass("chosen-container-active");
      this.clear_backstroke();
      this.show_search_field_default();
      return this.search_field_scale();
    };

    Chosen.prototype.activate_field = function() {
      this.container.addClass("chosen-container-active");
      this.active_field = true;
      this.search_field.val(this.search_field.val());
      return this.search_field.focus();
    };

    Chosen.prototype.test_active_click = function(evt) {
      var active_container;
      active_container = $(evt.target).closest('.chosen-container');
      if (active_container.length && this.container[0] === active_container[0]) {
        return this.active_field = true;
      } else {
        return this.close_field();
      }
    };

    Chosen.prototype.results_build = function() {
      this.parsing = true;
      this.selected_option_count = null;
      this.results_data = SelectParser.select_to_array(this.form_field);
      if (this.is_multiple) {
        this.search_choices.find("li.search-choice").remove();
      } else if (!this.is_multiple) {
        this.single_set_selected_text();
        if (this.disable_search || this.form_field.options.length <= this.disable_search_threshold) {
          this.search_field[0].readOnly = true;
          this.container.addClass("chosen-container-single-nosearch");
        } else {
          this.search_field[0].readOnly = false;
          this.container.removeClass("chosen-container-single-nosearch");
        }
      }
      this.update_results_content(this.results_option_build({
        first: true
      }));
      this.search_field_disabled();
      this.show_search_field_default();
      this.search_field_scale();
      return this.parsing = false;
    };

    Chosen.prototype.result_do_highlight = function(el) {
      var high_bottom, high_top, maxHeight, visible_bottom, visible_top;
      if (el.length) {
        this.result_clear_highlight();
        this.result_highlight = el;
        this.result_highlight.addClass("highlighted");
        maxHeight = parseInt(this.search_results.css("maxHeight"), 10);
        visible_top = this.search_results.scrollTop();
        visible_bottom = maxHeight + visible_top;
        high_top = this.result_highlight.position().top + this.search_results.scrollTop();
        high_bottom = high_top + this.result_highlight.outerHeight();
        if (high_bottom >= visible_bottom) {
          return this.search_results.scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);
        } else if (high_top < visible_top) {
          return this.search_results.scrollTop(high_top);
        }
      }
    };

    Chosen.prototype.result_clear_highlight = function() {
      if (this.result_highlight) {
        this.result_highlight.removeClass("highlighted");
      }
      return this.result_highlight = null;
    };

    Chosen.prototype.results_show = function() {
      if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
        this.form_field_jq.trigger("chosen:maxselected", {
          chosen: this
        });
        return false;
      }
      this.container.addClass("chosen-with-drop");
      this.results_showing = true;
      this.search_field.focus();
      this.search_field.val(this.search_field.val());
      this.winnow_results();
      return this.form_field_jq.trigger("chosen:showing_dropdown", {
        chosen: this
      });
    };

    Chosen.prototype.update_results_content = function(content) {
      return this.search_results.html(content);
    };

    Chosen.prototype.results_hide = function() {
      if (this.results_showing) {
        this.result_clear_highlight();
        this.container.removeClass("chosen-with-drop");
        this.form_field_jq.trigger("chosen:hiding_dropdown", {
          chosen: this
        });
      }
      return this.results_showing = false;
    };

    Chosen.prototype.set_tab_index = function(el) {
      var ti;
      if (this.form_field.tabIndex) {
        ti = this.form_field.tabIndex;
        this.form_field.tabIndex = -1;
        return this.search_field[0].tabIndex = ti;
      }
    };

    Chosen.prototype.set_label_behavior = function() {
      var _this = this;
      this.form_field_label = this.form_field_jq.parents("label");
      if (!this.form_field_label.length && this.form_field.id.length) {
        this.form_field_label = $("label[for='" + this.form_field.id + "']");
      }
      if (this.form_field_label.length > 0) {
        return this.form_field_label.bind('click.chosen', function(evt) {
          if (_this.is_multiple) {
            return _this.container_mousedown(evt);
          } else {
            return _this.activate_field();
          }
        });
      }
    };

    Chosen.prototype.show_search_field_default = function() {
      if (this.is_multiple && this.choices_count() < 1 && !this.active_field) {
        this.search_field.val(this.default_text);
        return this.search_field.addClass("default");
      } else {
        this.search_field.val("");
        return this.search_field.removeClass("default");
      }
    };

    Chosen.prototype.search_results_mouseup = function(evt) {
      var target;
      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
      if (target.length) {
        this.result_highlight = target;
        this.result_select(evt);
        return this.search_field.focus();
      }
    };

    Chosen.prototype.search_results_mouseover = function(evt) {
      var target;
      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
      if (target) {
        return this.result_do_highlight(target);
      }
    };

    Chosen.prototype.search_results_mouseout = function(evt) {
      if ($(evt.target).hasClass("active-result" || $(evt.target).parents('.active-result').first())) {
        return this.result_clear_highlight();
      }
    };

    Chosen.prototype.choice_build = function(item) {
      var choice, close_link,
        _this = this;
      choice = $('<li />', {
        "class": "search-choice"
      }).html("<span>" + item.html + "</span>");
      if (item.disabled) {
        choice.addClass('search-choice-disabled');
      } else {
        close_link = $('<a />', {
          "class": 'search-choice-close',
          'data-option-array-index': item.array_index
        });
        close_link.bind('click.chosen', function(evt) {
          return _this.choice_destroy_link_click(evt);
        });
        choice.append(close_link);
      }
      return this.search_container.before(choice);
    };

    Chosen.prototype.choice_destroy_link_click = function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if (!this.is_disabled) {
        return this.choice_destroy($(evt.target));
      }
    };

    Chosen.prototype.choice_destroy = function(link) {
      if (this.result_deselect(link[0].getAttribute("data-option-array-index"))) {
        this.show_search_field_default();
        if (this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1) {
          this.results_hide();
        }
        link.parents('li').first().remove();
        return this.search_field_scale();
      }
    };

    Chosen.prototype.results_reset = function() {
      this.reset_single_select_options();
      this.form_field.options[0].selected = true;
      this.single_set_selected_text();
      this.show_search_field_default();
      this.results_reset_cleanup();
      this.form_field_jq.trigger("change");
      if (this.active_field) {
        return this.results_hide();
      }
    };

    Chosen.prototype.results_reset_cleanup = function() {
      this.current_selectedIndex = this.form_field.selectedIndex;
      return this.selected_item.find("abbr").remove();
    };

    Chosen.prototype.result_select = function(evt) {
      var high, item;
      if (this.result_highlight) {
        high = this.result_highlight;
        this.result_clear_highlight();
        if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
          this.form_field_jq.trigger("chosen:maxselected", {
            chosen: this
          });
          return false;
        }
        if (this.is_multiple) {
          high.removeClass("active-result");
        } else {
          this.reset_single_select_options();
        }
        item = this.results_data[high[0].getAttribute("data-option-array-index")];
        item.selected = true;
        this.form_field.options[item.options_index].selected = true;
        this.selected_option_count = null;
        if (this.is_multiple) {
          this.choice_build(item);
        } else {
          this.single_set_selected_text(item.text);
        }
        if (!((evt.metaKey || evt.ctrlKey) && this.is_multiple)) {
          this.results_hide();
        }
        this.search_field.val("");
        if (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) {
          this.form_field_jq.trigger("change", {
            'selected': this.form_field.options[item.options_index].value
          });
        }
        this.current_selectedIndex = this.form_field.selectedIndex;
        return this.search_field_scale();
      }
    };

    Chosen.prototype.single_set_selected_text = function(text) {
      if (text == null) {
        text = this.default_text;
      }
      if (text === this.default_text) {
        this.selected_item.addClass("chosen-default");
      } else {
        this.single_deselect_control_build();
        this.selected_item.removeClass("chosen-default");
      }
      return this.selected_item.find("span").text(text);
    };

    Chosen.prototype.result_deselect = function(pos) {
      var result_data;
      result_data = this.results_data[pos];
      if (!this.form_field.options[result_data.options_index].disabled) {
        result_data.selected = false;
        this.form_field.options[result_data.options_index].selected = false;
        this.selected_option_count = null;
        this.result_clear_highlight();
        if (this.results_showing) {
          this.winnow_results();
        }
        this.form_field_jq.trigger("change", {
          deselected: this.form_field.options[result_data.options_index].value
        });
        this.search_field_scale();
        return true;
      } else {
        return false;
      }
    };

    Chosen.prototype.single_deselect_control_build = function() {
      if (!this.allow_single_deselect) {
        return;
      }
      if (!this.selected_item.find("abbr").length) {
        this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>");
      }
      return this.selected_item.addClass("chosen-single-with-deselect");
    };

    Chosen.prototype.get_search_text = function() {
      if (this.search_field.val() === this.default_text) {
        return "";
      } else {
        return $('<div/>').text($.trim(this.search_field.val())).html();
      }
    };

    Chosen.prototype.winnow_results_set_highlight = function() {
      var do_high, selected_results;
      selected_results = !this.is_multiple ? this.search_results.find(".result-selected.active-result") : [];
      do_high = selected_results.length ? selected_results.first() : this.search_results.find(".active-result").first();
      if (do_high != null) {
        return this.result_do_highlight(do_high);
      }
    };

    Chosen.prototype.no_results = function(terms) {
      var no_results_html;
      no_results_html = $('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>');
      no_results_html.find("span").first().html(terms);
      this.search_results.append(no_results_html);
      return this.form_field_jq.trigger("chosen:no_results", {
        chosen: this
      });
    };

    Chosen.prototype.no_results_clear = function() {
      return this.search_results.find(".no-results").remove();
    };

    Chosen.prototype.keydown_arrow = function() {
      var next_sib;
      if (this.results_showing && this.result_highlight) {
        next_sib = this.result_highlight.nextAll("li.active-result").first();
        if (next_sib) {
          return this.result_do_highlight(next_sib);
        }
      } else {
        return this.results_show();
      }
    };

    Chosen.prototype.keyup_arrow = function() {
      var prev_sibs;
      if (!this.results_showing && !this.is_multiple) {
        return this.results_show();
      } else if (this.result_highlight) {
        prev_sibs = this.result_highlight.prevAll("li.active-result");
        if (prev_sibs.length) {
          return this.result_do_highlight(prev_sibs.first());
        } else {
          if (this.choices_count() > 0) {
            this.results_hide();
          }
          return this.result_clear_highlight();
        }
      }
    };

    Chosen.prototype.keydown_backstroke = function() {
      var next_available_destroy;
      if (this.pending_backstroke) {
        this.choice_destroy(this.pending_backstroke.find("a").first());
        return this.clear_backstroke();
      } else {
        next_available_destroy = this.search_container.siblings("li.search-choice").last();
        if (next_available_destroy.length && !next_available_destroy.hasClass("search-choice-disabled")) {
          this.pending_backstroke = next_available_destroy;
          if (this.single_backstroke_delete) {
            return this.keydown_backstroke();
          } else {
            return this.pending_backstroke.addClass("search-choice-focus");
          }
        }
      }
    };

    Chosen.prototype.clear_backstroke = function() {
      if (this.pending_backstroke) {
        this.pending_backstroke.removeClass("search-choice-focus");
      }
      return this.pending_backstroke = null;
    };

    Chosen.prototype.keydown_checker = function(evt) {
      var stroke, _ref1;
      stroke = (_ref1 = evt.which) != null ? _ref1 : evt.keyCode;
      this.search_field_scale();
      if (stroke !== 8 && this.pending_backstroke) {
        this.clear_backstroke();
      }
      switch (stroke) {
        case 8:
          this.backstroke_length = this.search_field.val().length;
          break;
        case 9:
          if (this.results_showing && !this.is_multiple) {
            this.result_select(evt);
          }
          this.mouse_on_container = false;
          break;
        case 13:
          if (this.results_showing) {
            evt.preventDefault();
          }
          break;
        case 32:
          if (this.disable_search) {
            evt.preventDefault();
          }
          break;
        case 38:
          evt.preventDefault();
          this.keyup_arrow();
          break;
        case 40:
          evt.preventDefault();
          this.keydown_arrow();
          break;
      }
    };

    Chosen.prototype.search_field_scale = function() {
      var div, f_width, h, style, style_block, styles, w, _i, _len;
      if (this.is_multiple) {
        h = 0;
        w = 0;
        style_block = "position:absolute; left: -1000px; top: -1000px; display:none;";
        styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
        for (_i = 0, _len = styles.length; _i < _len; _i++) {
          style = styles[_i];
          style_block += style + ":" + this.search_field.css(style) + ";";
        }
        div = $('<div />', {
          'style': style_block
        });
        div.text(this.search_field.val());
        $('body').append(div);
        w = div.width() + 25;
        div.remove();
        f_width = this.container.outerWidth();
        if (w > f_width - 10) {
          w = f_width - 10;
        }
        return this.search_field.css({
          'width': w + 'px'
        });
      }
    };

    return Chosen;

  })(AbstractChosen);

}).call(this);;
/**
 * Swiper 3.0.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: February 13, 2015
 */
!function(){"use strict";function e(e){e.fn.swiper=function(t){var a;return e(this).each(function(){var e=new Swiper(this,t);a||(a=e)}),a}}window.Swiper=function(e,a){function r(){return"horizontal"===f.params.direction}function i(e){var t,a,r=function(){"undefined"!=typeof f&&null!==f&&(void 0!==f.imagesLoaded&&f.imagesLoaded++,f.imagesLoaded===f.imagesToLoad.length&&(f.update(),f.params.onImagesReady&&f.params.onImagesReady(f)))};e.complete?r():(a=e.currentSrc||e.getAttribute("src"),a?(t=new Image,t.onload=r,t.onerror=r,t.src=a):r())}function s(){f.autoplayTimeoutId=setTimeout(function(){f.params.loop?(f.fixLoop(),f._slideNext()):f.isEnd?a.autoplayStopOnLast?f.stopAutoplay():f._slideTo(0):f._slideNext()},f.params.autoplay)}function n(e,t){var a=h(e.target);if(!a.is(t))if("string"==typeof t)a=a.parents(t);else if(t.nodeType){var r;return a.parents().each(function(e,a){a===t&&(r=t)}),r?t:void 0}return 0===a.length?void 0:a[0]}function o(e,t){t=t||{};var a=window.MutationObserver||window.WebkitMutationObserver,r=new a(function(e){e.forEach(function(){f.onResize()})});r.observe(e,{attributes:"undefined"==typeof t.attributes?!0:t.attributes,childList:"undefined"==typeof t.childList?!0:t.childList,characterData:"undefined"==typeof t.characterData?!0:t.characterData}),f.observers.push(r)}function l(e){var t=e.keyCode||e.charCode;if(!(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey)){if(document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||"textarea"===document.activeElement.nodeName.toLowerCase()))return!1;if(37===t||39===t||38===t||40===t){var a=!1;if(f.container.parents(".swiper-slide").length>0&&0===f.container.parents(".swiper-slide-active").length)return;for(var i={left:window.pageXOffset,top:window.pageYOffset},s=window.innerWidth,n=window.innerHeight,o=f.container.offset(),l=[[o.left,o.top],[o.left+f.width,o.top],[o.left,o.top+f.height],[o.left+f.width,o.top+f.height]],d=0;d<l.length;d++){var p=l[d];p[0]>=i.left&&p[0]<=i.left+s&&p[1]>=i.top&&p[1]<=i.top+n&&(a=!0)}if(!a)return}r()?((37===t||39===t)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),39===t&&f.slideNext(),37===t&&f.slidePrev()):((38===t||40===t)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),40===t&&f.slideNext(),38===t&&f.slidePrev())}}function d(e){var t=f._wheelEvent,a=0;if(e.detail)a=-e.detail;else if("mousewheel"===t)if(f.params.mousewheelForceToAxis)if(r()){if(!(Math.abs(e.wheelDeltaX)>Math.abs(e.wheelDeltaY)))return;a=e.wheelDeltaX}else{if(!(Math.abs(e.wheelDeltaY)>Math.abs(e.wheelDeltaX)))return;a=e.wheelDeltaY}else a=e.wheelDelta;else if("DOMMouseScroll"===t)a=-e.detail;else if("wheel"===t)if(f.params.mousewheelForceToAxis)if(r()){if(!(Math.abs(e.deltaX)>Math.abs(e.deltaY)))return;a=-e.deltaX}else{if(!(Math.abs(e.deltaY)>Math.abs(e.deltaX)))return;a=-e.deltaY}else a=Math.abs(e.deltaX)>Math.abs(e.deltaY)?-e.deltaX:-e.deltaY;if(f.params.freeMode){var i=f.getWrapperTranslate()+a;if(i>0&&(i=0),i<f.maxTranslate()&&(i=f.maxTranslate()),f.setWrapperTransition(0),f.setWrapperTranslate(i),f.updateProgress(),f.updateActiveIndex(),0===i||i===f.maxTranslate())return}else(new Date).getTime()-f._lastWheelScrollTime>60&&(0>a?f.slideNext():f.slidePrev()),f._lastWheelScrollTime=(new Date).getTime();return f.params.autoplay&&f.stopAutoplay(),e.preventDefault?e.preventDefault():e.returnValue=!1,!1}var p={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},scrollbar:null,scrollbarHide:!0,keyboardControl:!1,mousewheelControl:!1,mousewheelForceToAxis:!1,hashnav:!1,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,pagination:null,paginationClickable:!1,paginationHide:!1,resistance:!0,resistanceRatio:.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,releaseFormElements:!0,slideToClickedSlide:!1,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationHiddenClass:"swiper-pagination-hidden",observer:!1,observeParents:!1};a=a||{};for(var u in p)if("undefined"==typeof a[u])a[u]=p[u];else if("object"==typeof a[u])for(var c in p[u])"undefined"==typeof a[u][c]&&(a[u][c]=p[u][c]);var f=this;f.params=a;var h;if(h="undefined"==typeof t?window.Dom7||window.Zepto||window.jQuery:t,h&&(f.container=h(e),0!==f.container.length)){if(f.container.length>1)return void f.container.each(function(){new Swiper(this,a)});f.container[0].swiper=f,f.container.data("swiper",f),f.container.addClass("swiper-container-"+f.params.direction),f.params.freeMode&&f.container.addClass("swiper-container-free-mode"),["cube","coverflow"].indexOf(f.params.effect)>=0&&(f.support.transforms3d?(f.params.watchSlidesProgress=!0,f.container.addClass("swiper-container-3d")):f.params.effect="slide"),"slide"!==f.params.effect&&f.container.addClass("swiper-container-"+f.params.effect),"cube"===f.params.effect&&(f.params.resistanceRatio=0,f.params.slidesPerView=1,f.params.slidesPerColumn=1,f.params.slidesPerGroup=1,f.params.centeredSlides=!1,f.params.spaceBetween=0),"fade"===f.params.effect&&(f.params.watchSlidesProgress=!0,f.params.spaceBetween=0),f.params.grabCursor&&f.support.touch&&(f.params.grabCursor=!1),f.wrapper=f.container.children("."+f.params.wrapperClass),f.params.pagination&&(f.paginationContainer=h(f.params.pagination),f.params.paginationClickable&&f.paginationContainer.addClass("swiper-pagination-clickable")),f.rtl=r()&&("rtl"===f.container[0].dir.toLowerCase()||"rtl"===f.container.css("direction")),f.rtl&&f.container.addClass("swiper-container-rtl"),f.rtl&&(f.wrongRTL="-webkit-box"===f.wrapper.css("display")),f.translate=0,f.progress=0,f.velocity=0,f.lockSwipeToNext=function(){f.params.allowSwipeToNext=!1},f.lockSwipeToPrev=function(){f.params.allowSwipeToPrev=!1},f.lockSwipes=function(){f.params.allowSwipeToNext=f.params.allowSwipeToPrev=!1},f.unlockSwipeToNext=function(){f.params.allowSwipeToNext=!0},f.unlockSwipeToPrev=function(){f.params.allowSwipeToPrev=!0},f.unlockSwipes=function(){f.params.allowSwipeToNext=f.params.allowSwipeToPrev=!0},f.params.slidesPerColumn>1&&f.container.addClass("swiper-container-multirow"),f.params.grabCursor&&(f.container[0].style.cursor="move",f.container[0].style.cursor="-webkit-grab",f.container[0].style.cursor="-moz-grab",f.container[0].style.cursor="grab"),f.imagesToLoad=[],f.imagesLoaded=0,f.preloadImages=function(){f.imagesToLoad=f.container.find("img");for(var e=0;e<f.imagesToLoad.length;e++)i(f.imagesToLoad[e])},f.autoplayTimeoutId=void 0,f.autoplaying=!1,f.autoplayPaused=!1,f.startAutoplay=function(){return"undefined"!=typeof f.autoplayTimeoutId?!1:void(f.params.autoplay&&(f.autoplaying||(f.autoplaying=!0,f.params.onAutoplayStart&&f.params.onAutoplayStart(f),s())))},f.stopAutoplay=function(){f.autoplayTimeoutId&&(f.autoplayTimeoutId&&clearTimeout(f.autoplayTimeoutId),f.autoplaying=!1,f.autoplayTimeoutId=void 0,f.params.onAutoplayStop&&f.params.onAutoplayStop(f))},f.pauseAutoplay=function(e){f.autoplayPaused||(f.autoplayTimeoutId&&clearTimeout(f.autoplayTimeoutId),f.autoplayPaused=!0,0===e?(f.autoplayPaused=!1,s()):f.wrapper.transitionEnd(function(){f.autoplayPaused=!1,s()}))},f.updateContainerSize=function(){f.width=f.container[0].clientWidth,f.height=f.container[0].clientHeight,f.size=r()?f.width:f.height},f.updateSlidesSize=function(){f.slides=f.wrapper.children("."+f.params.slideClass),f.snapGrid=[],f.slidesGrid=[],f.slidesSizesGrid=[];var e,t=f.params.spaceBetween,a=0,i=0,s=0;"string"==typeof t&&t.indexOf("%")>=0&&(t=parseFloat(t.replace("%",""))/100*f.size),f.virtualWidth=-t,f.slides.css(f.rtl?{marginLeft:"",marginTop:""}:{marginRight:"",marginBottom:""});var n;f.params.slidesPerColumn>1&&(n=Math.floor(f.slides.length/f.params.slidesPerColumn)===f.slides.length/f.params.slidesPerColumn?f.slides.length:Math.ceil(f.slides.length/f.params.slidesPerColumn)*f.params.slidesPerColumn);var o;for(e=0;e<f.slides.length;e++){o=0;var l=f.slides.eq(e);if(f.params.slidesPerColumn>1){var d,p,u,c,h=f.params.slidesPerColumn;"column"===f.params.slidesPerColumnFill?(p=Math.floor(e/h),u=e-p*h,d=p+u*n/h,l.css({"-webkit-box-ordinal-group":d,"-moz-box-ordinal-group":d,"-ms-flex-order":d,"-webkit-order":d,order:d})):(c=n/h,u=Math.floor(e/c),p=e-u*c),l.css({"margin-top":0!==u&&f.params.spaceBetween&&f.params.spaceBetween+"px"}).attr("data-swiper-column",p).attr("data-swiper-row",u)}"none"!==l.css("display")&&("auto"===f.params.slidesPerView?o=r()?l.outerWidth(!0):l.outerHeight(!0):(o=(f.size-(f.params.slidesPerView-1)*t)/f.params.slidesPerView,r()?f.slides[e].style.width=o+"px":f.slides[e].style.height=o+"px"),f.slides[e].swiperSlideSize=o,f.slidesSizesGrid.push(o),f.params.centeredSlides?(a=a+o/2+i/2+t,0===e&&(a=a-f.size/2-t),Math.abs(a)<.001&&(a=0),s%f.params.slidesPerGroup===0&&f.snapGrid.push(a),f.slidesGrid.push(a)):(s%f.params.slidesPerGroup===0&&f.snapGrid.push(a),f.slidesGrid.push(a),a=a+o+t),f.virtualWidth+=o+t,i=o,s++)}f.virtualWidth=Math.max(f.virtualWidth,f.size);var m;if(f.rtl&&f.wrongRTL&&("slide"===f.params.effect||"coverflow"===f.params.effect)&&f.wrapper.css({width:f.virtualWidth+f.params.spaceBetween+"px"}),f.params.slidesPerColumn>1&&(f.virtualWidth=(o+f.params.spaceBetween)*n,f.virtualWidth=Math.ceil(f.virtualWidth/f.params.slidesPerColumn)-f.params.spaceBetween,f.wrapper.css({width:f.virtualWidth+f.params.spaceBetween+"px"}),f.params.centeredSlides)){for(m=[],e=0;e<f.snapGrid.length;e++)f.snapGrid[e]<f.virtualWidth+f.snapGrid[0]&&m.push(f.snapGrid[e]);f.snapGrid=m}if(!f.params.centeredSlides){for(m=[],e=0;e<f.snapGrid.length;e++)f.snapGrid[e]<=f.virtualWidth-f.size&&m.push(f.snapGrid[e]);f.snapGrid=m,Math.floor(f.virtualWidth-f.size)>Math.floor(f.snapGrid[f.snapGrid.length-1])&&f.snapGrid.push(f.virtualWidth-f.size)}0===f.snapGrid.length&&(f.snapGrid=[0]),0!==f.params.spaceBetween&&f.slides.css(r()?f.rtl?{marginLeft:t+"px"}:{marginRight:t+"px"}:{marginBottom:t+"px"}),f.params.watchSlidesProgress&&f.updateSlidesOffset()},f.updateSlidesOffset=function(){for(var e=0;e<f.slides.length;e++)f.slides[e].swiperSlideOffset=r()?f.slides[e].offsetLeft:f.slides[e].offsetTop},f.update=function(){f.updateContainerSize(),f.updateSlidesSize(),f.updateProgress(),f.updatePagination(),f.updateClasses()},f.minTranslate=function(){return-f.snapGrid[0]},f.maxTranslate=function(){return-f.snapGrid[f.snapGrid.length-1]},f.updateSlidesProgress=function(e){if("undefined"==typeof e&&(e=f.translate||0),0!==f.slides.length){"undefined"==typeof f.slides[0].swiperSlideOffset&&f.updateSlidesOffset();var t=f.params.centeredSlides?-e+f.size/2:-e;f.rtl&&(t=f.params.centeredSlides?e-f.size/2:e);{f.container[0].getBoundingClientRect(),r()?"left":"top",r()?"right":"bottom"}f.slides.removeClass(f.params.slideVisibleClass);for(var a=0;a<f.slides.length;a++){var i=f.slides[a],s=f.params.centeredSlides===!0?i.swiperSlideSize/2:0,n=(t-i.swiperSlideOffset-s)/(i.swiperSlideSize+f.params.spaceBetween);if(f.params.watchVisibility){var o=-(t-i.swiperSlideOffset-s),l=o+f.slidesSizesGrid[a],d=o>=0&&o<f.size||l>0&&l<=f.size||0>=o&&l>=f.size;d&&f.slides.eq(a).addClass(f.params.slideVisibleClass)}i.progress=f.rtl?-n:n}}},f.updateProgress=function(e){"undefined"==typeof e&&(e=f.translate||0),f.progress=(e-f.minTranslate())/(f.maxTranslate()-f.minTranslate()),f.isBeginning=f.isEnd=!1,f.progress<=0&&(f.isBeginning=!0,f.params.onReachBeginning&&f.params.onReachBeginning(f)),f.progress>=1&&(f.isEnd=!0,f.params.onReachEnd&&f.params.onReachEnd(f)),f.params.watchSlidesProgress&&f.updateSlidesProgress(e),f.params.onProgress&&f.params.onProgress(f,f.progress)},f.updateActiveIndex=function(){var e,t,a,r=f.rtl?f.translate:-f.translate;for(t=0;t<f.slidesGrid.length;t++)"undefined"!=typeof f.slidesGrid[t+1]?r>=f.slidesGrid[t]&&r<f.slidesGrid[t+1]-(f.slidesGrid[t+1]-f.slidesGrid[t])/2?e=t:r>=f.slidesGrid[t]&&r<f.slidesGrid[t+1]&&(e=t+1):r>=f.slidesGrid[t]&&(e=t);(0>e||"undefined"==typeof e)&&(e=0),a=Math.floor(e/f.params.slidesPerGroup),a>=f.snapGrid.length&&(a=f.snapGrid.length-1),e!==f.activeIndex&&(f.snapIndex=a,f.previousIndex=f.activeIndex,f.activeIndex=e,f.updateClasses())},f.updateClasses=function(){f.slides.removeClass(f.params.slideActiveClass+" "+f.params.slideNextClass+" "+f.params.slidePrevClass);var e=f.slides.eq(f.activeIndex);if(e.addClass(f.params.slideActiveClass),e.next("."+f.params.slideClass).addClass(f.params.slideNextClass),e.prev("."+f.params.slideClass).addClass(f.params.slidePrevClass),f.bullets&&f.bullets.length>0){f.bullets.removeClass(f.params.bulletActiveClass);var t;f.params.loop?(t=f.activeIndex-f.loopedSlides,t>f.slides.length-1-2*f.loopedSlides&&(t-=f.slides.length-2*f.loopedSlides)):t="undefined"!=typeof f.snapIndex?f.snapIndex:f.activeIndex||0,f.bullets.eq(t).addClass(f.params.bulletActiveClass)}f.params.loop||(f.params.prevButton&&(f.isBeginning?h(f.params.prevButton).addClass(f.params.buttonDisabledClass):h(f.params.prevButton).removeClass(f.params.buttonDisabledClass)),f.params.nextButton&&(f.isEnd?h(f.params.nextButton).addClass(f.params.buttonDisabledClass):h(f.params.nextButton).removeClass(f.params.buttonDisabledClass)))},f.updatePagination=function(){if(f.params.pagination&&f.paginationContainer&&f.paginationContainer.length>0){for(var e="",t=f.params.loop?f.slides.length-2*f.loopedSlides:f.snapGrid.length,a=0;t>a;a++)e+='<span class="'+f.params.bulletClass+'"></span>';f.paginationContainer.html(e),f.bullets=f.paginationContainer.find("."+f.params.bulletClass)}},f.onResize=function(){f.updateContainerSize(),f.updateSlidesSize(),f.updateProgress(),f.updateClasses(),"auto"===f.params.slidesPerView&&f.updatePagination(),f.isEnd?f.slideTo(f.slides.length-1,0,!1,!0):f.slideTo(f.activeIndex,0,!1,!0),f.params.scrollbar&&f.scrollbar&&f.scrollbar.init()};var m=["mousedown","mousemove","mouseup"];window.navigator.pointerEnabled?m=["pointerdown","pointermove","pointerup"]:window.navigator.msPointerEnabled&&(m=["MSPointerDown","MSPointerMove","MSPointerUp"]),f.touchEvents={start:f.support.touch||!f.params.simulateTouch?"touchstart":m[0],move:f.support.touch||!f.params.simulateTouch?"touchmove":m[1],end:f.support.touch||!f.params.simulateTouch?"touchend":m[2]},(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===f.params.touchEventsTarget?f.container:f.wrapper).addClass("swiper-wp8-"+f.params.direction),f.events=function(e){var t=e?"off":"on",a=e?"removeEventListener":"addEventListener",r="container"===f.params.touchEventsTarget?f.container:f.wrapper,i=f.support.touch?r:h(document),s=f.params.nested?!0:!1;r[0][a](f.touchEvents.start,f.onTouchStart,!1),i[0][a](f.touchEvents.move,f.onTouchMove,s),i[0][a](f.touchEvents.end,f.onTouchEnd,!1),window[a]("resize",f.onResize),f.params.nextButton&&h(f.params.nextButton)[t]("click",f.onClickNext),f.params.prevButton&&h(f.params.prevButton)[t]("click",f.onClickPrev),f.params.pagination&&f.params.paginationClickable&&h(f.paginationContainer)[t]("click","."+f.params.bulletClass,f.onClickIndex),(f.params.preventClicks||f.params.preventClicksPropagation)&&r[0][a]("click",f.preventClicks,!0)},f.attachEvents=function(){f.events()},f.detachEvents=function(){f.events(!0)},f.allowClick=!0,f.preventClicks=function(e){f.allowClick||(f.params.preventClicks&&e.preventDefault(),f.params.preventClicksPropagation&&(e.stopPropagation(),e.stopImmediatePropagation()))},f.onClickNext=function(e){e.preventDefault(),f.slideNext()},f.onClickPrev=function(e){e.preventDefault(),f.slidePrev()},f.onClickIndex=function(e){e.preventDefault();var t=h(this).index()*f.params.slidesPerGroup;f.params.loop&&(t+=f.loopedSlides),f.slideTo(t)},f.updateClickedSlide=function(e){var t=n(e,"."+f.params.slideClass);if(!t)return f.clickedSlide=void 0,void(f.clickedIndex=void 0);if(f.clickedSlide=t,f.clickedIndex=h(t).index(),f.params.slideToClickedSlide&&void 0!==f.clickedIndex&&f.clickedIndex!==f.activeIndex){var a,r=f.clickedIndex;if(f.params.loop)if(a=h(f.clickedSlide).attr("data-swiper-slide-index"),r>f.slides.length-f.params.slidesPerView)f.fixLoop(),r=f.wrapper.children("."+f.params.slideClass+'[data-swiper-slide-index="'+a+'"]').eq(0).index(),setTimeout(function(){f.slideTo(r)},0);else if(r<f.params.slidesPerView-1){f.fixLoop();var i=f.wrapper.children("."+f.params.slideClass+'[data-swiper-slide-index="'+a+'"]');r=i.eq(i.length-1).index(),setTimeout(function(){f.slideTo(r)},0)}else f.slideTo(r);else f.slideTo(r)}};var g,v,w,T,b,S,x,y={},C={};f.animating=!1;var M,E,P=Date.now(),k=[],z="input, select, textarea, button";if(f.onTouchStart=function(e){if(e.originalEvent&&(e=e.originalEvent),!("mousedown"===e.type&&"which"in e&&3===e.which||f.params.noSwiping&&n(e,"."+f.params.noSwipingClass)||f.params.swipeHandler&&!n(e,f.params.swipeHandler))){if(g=!0,v=!1,T=void 0,y.x=C.x="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,y.y=C.y="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY,w=Date.now(),f.allowClick=!0,f.updateContainerSize(),f.swipeDirection=void 0,f.params.threshold>0&&(x=!1),"touchstart"!==e.type){var t=!0;h(e.target).is(z)&&(t=!1),document.activeElement&&h(document.activeElement).is(z)&&document.activeElement.blur(),t&&e.preventDefault()}f.params.onTouchStart&&f.params.onTouchStart(f,e)}},f.onTouchMove=function(e){if(e.originalEvent&&(e=e.originalEvent),!e.preventedByNestedSwiper){if(f.params.onlyExternal)return v=!0,void(f.allowClick=!1);if(f.params.onTouchMove&&f.params.onTouchMove(f,e),f.allowClick=!1,g&&!(e.targetTouches&&e.targetTouches.length>1)){C.x="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,C.y="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY;var t=180*Math.atan2(Math.abs(C.y-y.y),Math.abs(C.x-y.x))/Math.PI;if("undefined"==typeof T&&(T=r()?t>f.params.touchAngle:90-t>f.params.touchAngle),T)return void(g=!1);f.params.onSliderMove&&f.params.onSliderMove(f,e),e.preventDefault(),f.params.touchMoveStopPropagation&&!f.params.nested&&e.stopPropagation(),v||(a.loop&&f.fixLoop(),S="cube"===f.params.effect?(f.rtl?-f.translate:f.translate)||0:f.getWrapperTranslate(),f.setWrapperTransition(0),f.animating&&f.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),f.params.autoplay&&f.autoplaying&&(f.params.autoplayDisableOnInteraction?f.stopAutoplay():f.pauseAutoplay()),E=!1,f.params.grabCursor&&(f.container[0].style.cursor="move",f.container[0].style.cursor="-webkit-grabbing",f.container[0].style.cursor="-moz-grabbin",f.container[0].style.cursor="grabbing")),v=!0;var i=r()?C.x-y.x:C.y-y.y;i*=f.params.touchRatio,f.rtl&&(i=-i),f.swipeDirection=i>0?"prev":"next",b=i+S;var s=!0;if(i>0&&b>f.minTranslate()?(s=!1,f.params.resistance&&(b=f.minTranslate()-1+Math.pow(-f.minTranslate()+S+i,f.params.resistanceRatio))):0>i&&b<f.maxTranslate()&&(s=!1,f.params.resistance&&(b=f.maxTranslate()+1-Math.pow(f.maxTranslate()-S-i,f.params.resistanceRatio))),s&&(e.preventedByNestedSwiper=!0),!f.params.allowSwipeToNext&&"next"===f.swipeDirection&&S>b&&(b=S),!f.params.allowSwipeToPrev&&"prev"===f.swipeDirection&&b>S&&(b=S),f.params.followFinger){if(f.params.threshold>0){if(!(Math.abs(i)>f.params.threshold||x))return void(b=S);if(!x)return x=!0,y.x=C.x,y.y=C.y,void(b=S)}(f.params.freeMode||f.params.watchSlidesProgress)&&f.updateActiveIndex(),f.params.freeMode&&(0===k.length&&k.push({position:y[r()?"x":"y"],time:w}),k.push({position:C[r()?"x":"y"],time:(new Date).getTime()})),f.updateProgress(b),f.setWrapperTranslate(b)}}}},f.onTouchEnd=function(e){if(e.originalEvent&&(e=e.originalEvent),g){f.params.onTouchEnd&&f.params.onTouchEnd(f,e),f.params.grabCursor&&v&&g&&(f.container[0].style.cursor="move",f.container[0].style.cursor="-webkit-grab",f.container[0].style.cursor="-moz-grab",f.container[0].style.cursor="grab");var t=Date.now(),a=t-w;f.allowClick&&(f.updateClickedSlide(e),f.params.onTap&&f.params.onTap(f,e),300>a&&t-P>300&&(M&&clearTimeout(M),M=setTimeout(function(){f&&(f.params.paginationHide&&f.paginationContainer.length>0&&!h(e.target).hasClass(f.params.bulletClass)&&f.paginationContainer.toggleClass(f.params.paginationHiddenClass),f.params.onClick&&f.params.onClick(f,e))},300)),300>a&&300>t-P&&(M&&clearTimeout(M),f.params.onDoubleTap&&f.params.onDoubleTap(f,e))),P=Date.now(),setTimeout(function(){f&&f.allowClick&&(f.allowClick=!0)},0);var i=r()?C.x-y.x:C.y-y.y;if(!g||!v||!f.swipeDirection||0===i||b===S)return void(g=v=!1);g=v=!1;var s;if(s=f.params.followFinger?f.rtl?f.translate:-f.translate:-b,f.params.freeMode){if(s<-f.minTranslate())return void f.slideTo(f.activeIndex);if(s>-f.maxTranslate())return void f.slideTo(f.slides.length-1);if(f.params.freeModeMomentum){if(k.length>1){var n=k.pop(),o=k.pop(),l=n.position-o.position,d=n.time-o.time;f.velocity=l/d,f.velocity=f.velocity/2,Math.abs(f.velocity)<.02&&(f.velocity=0),(d>150||a>300)&&(f.velocity=0)}else f.velocity=0;k.length=0;var p,u=1e3*f.params.freeModeMomentumRatio,c=f.velocity*u,m=f.translate+c,T=!1,x=20*Math.abs(f.velocity)*f.params.freeModeMomentumBounceRatio;m<f.maxTranslate()&&(f.params.freeModeMomentumBounce?(m+f.maxTranslate()<-x&&(m=f.maxTranslate()-x),p=f.maxTranslate(),T=!0,E=!0):m=f.maxTranslate()),m>f.minTranslate()&&(f.params.freeModeMomentumBounce?(m-f.minTranslate()>x&&(m=f.minTranslate()+x),p=f.minTranslate(),T=!0,E=!0):m=f.minTranslate()),0!==f.velocity&&(u=Math.abs((m-f.translate)/f.velocity)),f.params.freeModeMomentumBounce&&T?(f.updateProgress(p),f.setWrapperTranslate(m),f.setWrapperTransition(u),f.onTransitionStart(),f.animating=!0,f.wrapper.transitionEnd(function(){E&&(f.params.onMomentumBounce&&f.params.onMomentumBounce(f),f.setWrapperTranslate(p),f.setWrapperTransition(f.params.speed),f.wrapper.transitionEnd(function(){f.onTransitionEnd()}))})):f.velocity?(f.updateProgress(m),f.setWrapperTranslate(m),f.setWrapperTransition(u),f.onTransitionStart(),f.animating||(f.animating=!0,f.wrapper.transitionEnd(function(){f.onTransitionEnd()}))):f.updateProgress(m),f.updateActiveIndex()}return void((!f.params.freeModeMomentum||a>=f.params.longSwipesMs)&&(f.updateProgress(),f.updateActiveIndex()))}var z,D=0,I=f.slidesSizesGrid[0];for(z=0;z<f.slidesGrid.length;z+=f.params.slidesPerGroup)"undefined"!=typeof f.slidesGrid[z+f.params.slidesPerGroup]?s>=f.slidesGrid[z]&&s<f.slidesGrid[z+f.params.slidesPerGroup]&&(D=z,I=f.slidesGrid[z+f.params.slidesPerGroup]-f.slidesGrid[z]):s>=f.slidesGrid[z]&&(D=z,I=f.slidesGrid[f.slidesGrid.length-1]-f.slidesGrid[f.slidesGrid.length-2]);var G=(s-f.slidesGrid[D])/I;if(a>f.params.longSwipesMs){if(!f.params.longSwipes)return void f.slideTo(f.activeIndex);"next"===f.swipeDirection&&f.slideTo(G>=f.params.longSwipesRatio?D+f.params.slidesPerGroup:D),"prev"===f.swipeDirection&&f.slideTo(G>1-f.params.longSwipesRatio?D+f.params.slidesPerGroup:D)}else{if(!f.params.shortSwipes)return void f.slideTo(f.activeIndex);"next"===f.swipeDirection&&f.slideTo(D+f.params.slidesPerGroup),"prev"===f.swipeDirection&&f.slideTo(D)}}},f._slideTo=function(e,t){return f.slideTo(e,t,!0,!0)},f.slideTo=function(e,t,a,i){"undefined"==typeof a&&(a=!0),"undefined"==typeof e&&(e=0),0>e&&(e=0),f.snapIndex=Math.floor(e/f.params.slidesPerGroup),f.snapIndex>=f.snapGrid.length&&(f.snapIndex=f.snapGrid.length-1);var s=-f.snapGrid[f.snapIndex];f.params.autoplay&&f.autoplaying&&(i||!f.params.autoplayDisableOnInteraction?f.pauseAutoplay(t):f.stopAutoplay()),f.updateProgress(s);for(var n=0;n<f.slidesGrid.length;n++)-s>=f.slidesGrid[n]&&(e=n);if("undefined"==typeof t&&(t=f.params.speed),f.previousIndex=f.activeIndex||0,f.activeIndex=e,s===f.translate)return f.updateClasses(),!1;a&&f.onTransitionStart();r()?s:0,r()?0:s;0===t?(f.setWrapperTransition(0),f.setWrapperTranslate(s),a&&f.onTransitionEnd()):(f.setWrapperTransition(t),f.setWrapperTranslate(s),f.animating||(f.animating=!0,f.wrapper.transitionEnd(function(){a&&f.onTransitionEnd()}))),f.updateClasses()},f.onTransitionStart=function(){f.params.onTransitionStart&&f.params.onTransitionStart(f),f.params.onSlideChangeStart&&f.activeIndex!==f.previousIndex&&f.params.onSlideChangeStart(f)},f.onTransitionEnd=function(){f.animating=!1,f.setWrapperTransition(0),f.params.onTransitionEnd&&f.params.onTransitionEnd(f),f.params.onSlideChangeEnd&&f.activeIndex!==f.previousIndex&&f.params.onSlideChangeEnd(f)},f.slideNext=function(e,t,a){if(f.params.loop){if(f.animating)return!1;f.fixLoop();{f.container[0].clientLeft}return f.slideTo(f.activeIndex+f.params.slidesPerGroup,t,e,a)}return f.slideTo(f.activeIndex+f.params.slidesPerGroup,t,e,a)},f._slideNext=function(e){return f.slideNext(!0,e,!0)},f.slidePrev=function(e,t,a){if(f.params.loop){if(f.animating)return!1;f.fixLoop();{f.container[0].clientLeft}return f.slideTo(f.activeIndex-1,t,e,a)}return f.slideTo(f.activeIndex-1,t,e,a)},f._slidePrev=function(e){return f.slidePrev(!0,e,!0)},f.slideReset=function(e,t){return f.slideTo(f.activeIndex,t,e)},f.setWrapperTransition=function(e,t){f.wrapper.transition(e),f.params.onSetTransition&&f.params.onSetTransition(f,e),"slide"!==f.params.effect&&f.effects[f.params.effect]&&f.effects[f.params.effect].setTransition(e),f.params.scrollbar&&f.scrollbar&&f.scrollbar.setTransition(e),f.params.control&&f.controller&&f.controller.setTransition(e,t)},f.setWrapperTranslate=function(e,t,a){var i=0,s=0,n=0;r()?i=f.rtl?-e:e:s=e,f.wrapper.transform(f.support.transforms3d?"translate3d("+i+"px, "+s+"px, "+n+"px)":"translate("+i+"px, "+s+"px)"),f.translate=r()?i:s,t&&f.updateActiveIndex(),"slide"!==f.params.effect&&f.effects[f.params.effect]&&f.effects[f.params.effect].setTranslate(f.translate),f.params.scrollbar&&f.scrollbar&&f.scrollbar.setTranslate(f.translate),f.params.control&&f.controller&&f.controller.setTranslate(f.translate,a),f.params.hashnav&&f.hashnav&&f.hashnav.setHash(),f.params.onSetTranslate&&f.params.onSetTranslate(f,f.translate)},f.getTranslate=function(e,t){var a,r,i,s;return"undefined"==typeof t&&(t="x"),i=window.getComputedStyle(e,null),window.WebKitCSSMatrix?s=new WebKitCSSMatrix("none"===i.webkitTransform?"":i.webkitTransform):(s=i.MozTransform||i.OTransform||i.MsTransform||i.msTransform||i.transform||i.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),a=s.toString().split(",")),"x"===t&&(r=window.WebKitCSSMatrix?s.m41:parseFloat(16===a.length?a[12]:a[4])),"y"===t&&(r=window.WebKitCSSMatrix?s.m42:parseFloat(16===a.length?a[13]:a[5])),f.rtl&&r&&(r=-r),r||0},f.getWrapperTranslate=function(e){return"undefined"==typeof e&&(e=r()?"x":"y"),f.getTranslate(f.wrapper[0],e)},f.observers=[],f.initObservers=function(){if(f.params.observeParents)for(var e=f.container.parents(),t=0;t<e.length;t++)o(e[t]);o(f.container[0],{childList:!1}),o(f.wrapper[0],{attributes:!1})},f.disconnectObservers=function(){for(var e=0;e<f.observers.length;e++)f.observers[e].disconnect();f.observers=[]},f.createLoop=function(){f.wrapper.children("."+f.params.slideClass+"."+f.params.slideDuplicateClass).remove();var e=f.wrapper.children("."+f.params.slideClass);f.loopedSlides=parseInt(f.params.loopedSlides||f.params.slidesPerView,10),f.loopedSlides=f.loopedSlides+f.params.loopAdditionalSlides,f.loopedSlides>e.length&&(f.loopedSlides=e.length);var t,a=[],r=[];for(e.each(function(t,i){var s=h(this);t<f.loopedSlides&&r.push(i),t<e.length&&t>=e.length-f.loopedSlides&&a.push(i),s.attr("data-swiper-slide-index",t)}),t=0;t<r.length;t++)f.wrapper.append(h(r[t].cloneNode(!0)).addClass(f.params.slideDuplicateClass));for(t=a.length-1;t>=0;t--)f.wrapper.prepend(h(a[t].cloneNode(!0)).addClass(f.params.slideDuplicateClass))},f.deleteLoop=function(){f.wrapper.children("."+f.params.slideClass+"."+f.params.slideDuplicateClass).remove()},f.fixLoop=function(){var e;f.activeIndex<f.loopedSlides?(e=f.slides.length-3*f.loopedSlides+f.activeIndex,e+=f.loopedSlides,f.slideTo(e,0,!1,!0)):("auto"===f.params.slidesPerView&&f.activeIndex>=2*f.loopedSlides||f.activeIndex>f.slides.length-2*f.params.slidesPerView)&&(e=-f.slides.length+f.activeIndex+f.loopedSlides,e+=f.loopedSlides,f.slideTo(e,0,!1,!0))},f.appendSlide=function(e){if(f.params.loop&&f.deleteLoop(),"object"==typeof e&&e.length)for(var t=0;t<e.length;t++)e[t]&&f.wrapper.append(e[t]);else f.wrapper.append(e);f.params.loop&&f.createLoop(),f.params.observer&&f.support.observer||f.update()},f.prependSlide=function(e){f.params.loop&&f.deleteLoop();var t=f.activeIndex+1;if("object"==typeof e&&e.length){for(var a=0;a<e.length;a++)e[a]&&f.wrapper.prepend(e[a]);t=f.activeIndex+e.length}else f.wrapper.prepend(e);f.params.loop&&f.createLoop(),f.params.observer&&f.support.observer||f.update(),f.slideTo(t,0,!1)},f.effects={fade:{setTranslate:function(){for(var e=0;e<f.slides.length;e++){var t=f.slides.eq(e),a=t[0].swiperSlideOffset,i=-a-f.translate,s=0;r()||(s=i,i=0),t.css({opacity:1+Math.min(Math.max(t[0].progress,-1),0)}).transform("translate3d("+i+"px, "+s+"px, 0px)")}},setTransition:function(e){f.slides.transition(e)}},cube:{setTranslate:function(){var e,t=0;f.params.cube.shadow&&(r()?(e=f.wrapper.find(".swiper-cube-shadow"),0===e.length&&(e=h('<div class="swiper-cube-shadow"></div>'),f.wrapper.append(e)),e.css({height:f.width+"px"})):(e=f.container.find(".swiper-cube-shadow"),0===e.length&&(e=h('<div class="swiper-cube-shadow"></div>'),f.container.append(e))));for(var a=0;a<f.slides.length;a++){var i=f.slides.eq(a),s=90*a,n=Math.floor(s/360);f.rtl&&(s=-s,n=Math.floor(-s/360));var o=Math.max(Math.min(i[0].progress,1),-1),l=0,d=0,p=0;a%4===0?(l=4*-n*f.size,p=0):(a-1)%4===0?(l=0,p=4*-n*f.size):(a-2)%4===0?(l=f.size+4*n*f.size,p=f.size):(a-3)%4===0&&(l=-f.size,p=3*f.size+4*f.size*n),f.rtl&&(l=-l),r()||(d=l,l=0);var u="rotateX("+(r()?0:-s)+"deg) rotateY("+(r()?s:0)+"deg) translate3d("+l+"px, "+d+"px, "+p+"px)";if(1>=o&&o>-1&&(t=90*a+90*o,f.rtl&&(t=90*-a-90*o)),i.transform(u),f.params.cube.slideShadows){var c=i.find(r()?".swiper-slide-shadow-left":".swiper-slide-shadow-top"),m=i.find(r()?".swiper-slide-shadow-right":".swiper-slide-shadow-bottom");0===c.length&&(c=h('<div class="swiper-slide-shadow-'+(r()?"left":"top")+'"></div>'),i.append(c)),0===m.length&&(m=h('<div class="swiper-slide-shadow-'+(r()?"right":"bottom")+'"></div>'),i.append(m));{i[0].progress}c.length&&(c[0].style.opacity=-i[0].progress),m.length&&(m[0].style.opacity=i[0].progress)}}if(f.wrapper.css({"-webkit-transform-origin":"50% 50% -"+f.size/2+"px","-moz-transform-origin":"50% 50% -"+f.size/2+"px","-ms-transform-origin":"50% 50% -"+f.size/2+"px","transform-origin":"50% 50% -"+f.size/2+"px"}),f.params.cube.shadow)if(r())e.transform("translate3d(0px, "+(f.width/2+f.params.cube.shadowOffset)+"px, "+-f.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+f.params.cube.shadowScale+")");else{var g=Math.abs(t)-90*Math.floor(Math.abs(t)/90),v=1.5-(Math.sin(2*g*Math.PI/360)/2+Math.cos(2*g*Math.PI/360)/2),w=f.params.cube.shadowScale,T=f.params.cube.shadowScale/v,b=f.params.cube.shadowOffset;e.transform("scale3d("+w+", 1, "+T+") translate3d(0px, "+(f.height/2+b)+"px, "+-f.height/2/T+"px) rotateX(-90deg)")}var S=f.isSafari||f.isUiWebView?-f.size/2:0;f.wrapper.transform("translate3d(0px,0,"+S+"px) rotateX("+(r()?0:t)+"deg) rotateY("+(r()?-t:0)+"deg)")
},setTransition:function(e){f.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),f.params.cube.shadow&&!r()&&f.container.find(".swiper-cube-shadow").transition(e)}},coverflow:{setTranslate:function(){for(var e=f.translate,t=r()?-e+f.width/2:-e+f.height/2,a=r()?f.params.coverflow.rotate:-f.params.coverflow.rotate,i=f.params.coverflow.depth,s=0,n=f.slides.length;n>s;s++){var o=f.slides.eq(s),l=f.slidesSizesGrid[s],d=o[0].swiperSlideOffset,p=(t-d-l/2)/l*f.params.coverflow.modifier,u=r()?a*p:0,c=r()?0:a*p,m=-i*Math.abs(p),g=r()?0:f.params.coverflow.stretch*p,v=r()?f.params.coverflow.stretch*p:0;Math.abs(v)<.001&&(v=0),Math.abs(g)<.001&&(g=0),Math.abs(m)<.001&&(m=0),Math.abs(u)<.001&&(u=0),Math.abs(c)<.001&&(c=0);var w="translate3d("+v+"px,"+g+"px,"+m+"px)  rotateX("+c+"deg) rotateY("+u+"deg)";if(o.transform(w),o[0].style.zIndex=-Math.abs(Math.round(p))+1,f.params.coverflow.slideShadows){var T=o.find(r()?".swiper-slide-shadow-left":".swiper-slide-shadow-top"),b=o.find(r()?".swiper-slide-shadow-right":".swiper-slide-shadow-bottom");0===T.length&&(T=h('<div class="swiper-slide-shadow-'+(r()?"left":"top")+'"></div>'),o.append(T)),0===b.length&&(b=h('<div class="swiper-slide-shadow-'+(r()?"right":"bottom")+'"></div>'),o.append(b)),T.length&&(T[0].style.opacity=p>0?p:0),b.length&&(b[0].style.opacity=-p>0?-p:0)}}if(window.navigator.pointerEnabled||window.navigator.msPointerEnabled){var S=f.wrapper.style;S.perspectiveOrigin=t+"px 50%"}},setTransition:function(e){f.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}}},f.scrollbar={init:function(){if(f.params.scrollbar){var e=f.scrollbar;e.track=h(f.params.scrollbar),e.drag=e.track.find(".swiper-scrollbar-drag"),0===e.drag.length&&(e.drag=h('<div class="swiper-scrollbar-drag"></div>'),e.track.append(e.drag)),e.drag[0].style.width="",e.drag[0].style.height="",e.trackSize=r()?e.track[0].offsetWidth:e.track[0].offsetHeight,e.divider=f.size/f.virtualWidth,e.moveDivider=e.divider*(e.trackSize/f.size),e.dragSize=e.trackSize*e.divider,r()?e.drag[0].style.width=e.dragSize+"px":e.drag[0].style.height=e.dragSize+"px",e.track[0].style.display=e.divider>=1?"none":"",f.params.scrollbarHide&&(e.track[0].style.opacity=0)}},setTranslate:function(){if(f.params.scrollbar){var e,t=f.scrollbar,a=(f.translate||0,t.dragSize);e=(t.trackSize-t.dragSize)*f.progress,f.rtl&&r()?(e=-e,e>0?(a=t.dragSize-e,e=0):-e+t.dragSize>t.trackSize&&(a=t.trackSize+e)):0>e?(a=t.dragSize+e,e=0):e+t.dragSize>t.trackSize&&(a=t.trackSize-e),r()?(t.drag.transform("translate3d("+e+"px, 0, 0)"),t.drag[0].style.width=a+"px"):(t.drag.transform("translate3d(0px, "+e+"px, 0)"),t.drag[0].style.height=a+"px"),f.params.scrollbarHide&&(clearTimeout(t.timeout),t.track[0].style.opacity=1,t.timeout=setTimeout(function(){t.track[0].style.opacity=0,t.track.transition(400)},1e3))}},setTransition:function(e){f.params.scrollbar&&f.scrollbar.drag.transition(e)}},f.controller={setTranslate:function(e,t){var a,r,i=f.params.control;if(f.isArray(i))for(var s=0;s<i.length;s++)i[s]!==t&&i[s]instanceof Swiper&&(e=i[s].rtl&&"horizontal"===i[s].params.direction?-f.translate:f.translate,a=(i[s].maxTranslate()-i[s].minTranslate())/(f.maxTranslate()-f.minTranslate()),r=(e-f.minTranslate())*a+i[s].minTranslate(),f.params.controlInverse&&(r=i[s].maxTranslate()-r),i[s].updateProgress(r),i[s].setWrapperTranslate(r,!1,f),i[s].updateActiveIndex());else i instanceof Swiper&&t!==i&&(e=i.rtl&&"horizontal"===i.params.direction?-f.translate:f.translate,a=(i.maxTranslate()-i.minTranslate())/(f.maxTranslate()-f.minTranslate()),r=(e-f.minTranslate())*a+i.minTranslate(),f.params.controlInverse&&(r=i.maxTranslate()-r),i.updateProgress(r),i.setWrapperTranslate(r,!1,f),i.updateActiveIndex())},setTransition:function(e,t){var a=f.params.control;if(f.isArray(a))for(var r=0;r<a.length;r++)a[r]!==t&&a[r]instanceof Swiper&&a[r].setWrapperTransition(e,f);else a instanceof Swiper&&t!==a&&a.setWrapperTransition(e,f)}},f.hashnav={init:function(){if(f.params.hashnav){f.hashnav.initialized=!0;var e=document.location.hash.replace("#","");if(e)for(var t=0,a=0,r=f.slides.length;r>a;a++){var i=f.slides.eq(a),s=i.attr("data-hash");if(s===e&&!i.hasClass(f.params.slideDuplicateClass)){var n=i.index();f._slideTo(n,t)}}}},setHash:function(){f.hashnav.initialized&&f.params.hashnav&&(document.location.hash=f.slides.eq(f.activeIndex).attr("data-hash")||"")}},f.disableKeyboardControl=function(){h(document).off("keydown",l)},f.enableKeyboardControl=function(){h(document).on("keydown",l)},f._wheelEvent=!1,f._lastWheelScrollTime=(new Date).getTime(),f.params.mousewheelControl){if(void 0!==document.onmousewheel&&(f._wheelEvent="mousewheel"),!f._wheelEvent)try{new WheelEvent("wheel"),f._wheelEvent="wheel"}catch(D){}f._wheelEvent||(f._wheelEvent="DOMMouseScroll")}return f.disableMousewheelControl=function(){return f._wheelEvent?(f.container.off(f._wheelEvent,d),!0):!1},f.enableMousewheelControl=function(){return f._wheelEvent?(f.container.on(f._wheelEvent,d),!0):!1},f.init=function(){f.params.loop&&f.createLoop(),f.updateContainerSize(),f.updateSlidesSize(),f.updatePagination(),f.params.scrollbar&&f.scrollbar&&f.scrollbar.init(),"slide"!==f.params.effect&&f.effects[f.params.effect]&&(f.params.loop||f.updateProgress(),f.effects[f.params.effect].setTranslate()),f.params.loop?f.slideTo(f.params.initialSlide+f.loopedSlides,0,!1):f.slideTo(f.params.initialSlide,0,!1),f.attachEvents(),f.params.observer&&f.support.observer&&f.initObservers(),f.params.updateOnImagesReady&&f.preloadImages(),f.params.autoplay&&f.startAutoplay(),f.params.keyboardControl&&f.enableKeyboardControl&&f.enableKeyboardControl(),f.params.mousewheelControl&&f.enableMousewheelControl&&f.enableMousewheelControl(),f.params.hashnav&&f.hashnav&&f.hashnav.init()},f.destroy=function(e){f.detachEvents(),f.disconnectObservers(),f.params.keyboardControl&&f.disableKeyboard&&f.disableKeyboard(),f.params.mousewheelControl&&f.disableMousewheel&&f.disableMousewheel(),f.params.onDestroy&&f.params.onDestroy(),e!==!1&&(f=null)},f.init(),f}},Swiper.prototype={isSafari:function(){var e=navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var e=document.createElement("div").style;return"webkitPerspective"in e||"MozPerspective"in e||"OPerspective"in e||"MsPerspective"in e||"perspective"in e}(),flexbox:function(){for(var e=document.createElement("div").style,t="WebkitBox msFlexbox MsFlexbox WebkitFlex MozBox fles".split(" "),a=0;a<t.length;a++)if(t[a]in e)return!0}(),observer:function(){return"MutationObserver"in window||"WebkitMutationObserver"in window}()}};for(var t=(function(){var e=function(e){var t=this,a=0;for(a=0;a<e.length;a++)t[a]=e[a];return t.length=e.length,this},t=function(t,a){var r=[],i=0;if(t&&!a&&t instanceof e)return t;if(t)if("string"==typeof t){var s,n,o=t.trim();if(o.indexOf("<")>=0&&o.indexOf(">")>=0){var l="div";for(0===o.indexOf("<li")&&(l="ul"),0===o.indexOf("<tr")&&(l="tbody"),(0===o.indexOf("<td")||0===o.indexOf("<th"))&&(l="tr"),0===o.indexOf("<tbody")&&(l="table"),0===o.indexOf("<option")&&(l="select"),n=document.createElement(l),n.innerHTML=t,i=0;i<n.childNodes.length;i++)r.push(n.childNodes[i])}else for(s=a||"#"!==t[0]||t.match(/[ .<>:~]/)?(a||document).querySelectorAll(t):[document.getElementById(t.split("#")[1])],i=0;i<s.length;i++)s[i]&&r.push(s[i])}else if(t.nodeType||t===window||t===document)r.push(t);else if(t.length>0&&t[0].nodeType)for(i=0;i<t.length;i++)r.push(t[i]);return new e(r)};return e.prototype={addClass:function(e){if("undefined"==typeof e)return this;for(var t=e.split(" "),a=0;a<t.length;a++)for(var r=0;r<this.length;r++)this[r].classList.add(t[a]);return this},removeClass:function(e){for(var t=e.split(" "),a=0;a<t.length;a++)for(var r=0;r<this.length;r++)this[r].classList.remove(t[a]);return this},hasClass:function(e){return this[0]?this[0].classList.contains(e):!1},toggleClass:function(e){for(var t=e.split(" "),a=0;a<t.length;a++)for(var r=0;r<this.length;r++)this[r].classList.toggle(t[a]);return this},attr:function(e,t){if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(var a=0;a<this.length;a++)if(2===arguments.length)this[a].setAttribute(e,t);else for(var r in e)this[a][r]=e[r],this[a].setAttribute(r,e[r]);return this},removeAttr:function(e){for(var t=0;t<this.length;t++)this[t].removeAttribute(e)},data:function(e,t){if("undefined"==typeof t){if(this[0]){var a=this[0].getAttribute("data-"+e);return a?a:this[0].dom7ElementDataStorage&&e in this[0].dom7ElementDataStorage?this[0].dom7ElementDataStorage[e]:void 0}return void 0}for(var r=0;r<this.length;r++){var i=this[r];i.dom7ElementDataStorage||(i.dom7ElementDataStorage={}),i.dom7ElementDataStorage[e]=t}return this},transform:function(e){for(var t=0;t<this.length;t++){var a=this[t].style;a.webkitTransform=a.MsTransform=a.msTransform=a.MozTransform=a.OTransform=a.transform=e}return this},transition:function(e){"string"!=typeof e&&(e+="ms");for(var t=0;t<this.length;t++){var a=this[t].style;a.webkitTransitionDuration=a.MsTransitionDuration=a.msTransitionDuration=a.MozTransitionDuration=a.OTransitionDuration=a.transitionDuration=e}return this},on:function(e,a,r,i){function s(e){var i=e.target;if(t(i).is(a))r.call(i,e);else for(var s=t(i).parents(),n=0;n<s.length;n++)t(s[n]).is(a)&&r.call(s[n],e)}var n,o,l=e.split(" ");for(n=0;n<this.length;n++)if("function"==typeof a||a===!1)for("function"==typeof a&&(r=arguments[1],i=arguments[2]||!1),o=0;o<l.length;o++)this[n].addEventListener(l[o],r,i);else for(o=0;o<l.length;o++)this[n].dom7LiveListeners||(this[n].dom7LiveListeners=[]),this[n].dom7LiveListeners.push({listener:r,liveListener:s}),this[n].addEventListener(l[o],s,i);return this},off:function(e,t,a,r){for(var i=e.split(" "),s=0;s<i.length;s++)for(var n=0;n<this.length;n++)if("function"==typeof t||t===!1)"function"==typeof t&&(a=arguments[1],r=arguments[2]||!1),this[n].removeEventListener(i[s],a,r);else if(this[n].dom7LiveListeners)for(var o=0;o<this[n].dom7LiveListeners.length;o++)this[n].dom7LiveListeners[o].listener===a&&this[n].removeEventListener(i[s],this[n].dom7LiveListeners[o].liveListener,r);return this},once:function(e,t,a,r){function i(n){a(n),s.off(e,t,i,r)}var s=this;"function"==typeof t&&(t=!1,a=arguments[1],r=arguments[2]),s.on(e,t,i,r)},trigger:function(e,t){for(var a=0;a<this.length;a++){var r;try{r=new CustomEvent(e,{detail:t,bubbles:!0,cancelable:!0})}catch(i){r=document.createEvent("Event"),r.initEvent(e,!0,!0),r.detail=t}this[a].dispatchEvent(r)}return this},transitionEnd:function(e){function t(s){if(s.target===this)for(e.call(this,s),a=0;a<r.length;a++)i.off(r[a],t)}var a,r=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],i=this;if(e)for(a=0;a<r.length;a++)i.on(r[a],t);return this},width:function(){return this[0]===window?window.innerWidth:this.length>0?parseFloat(this.css("width")):null},outerWidth:function(e){return this.length>0?e?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null},height:function(){return this[0]===window?window.innerHeight:this.length>0?parseFloat(this.css("height")):null},outerHeight:function(e){return this.length>0?e?this[0].offsetHeight+parseFloat(this.css("margin-top"))+parseFloat(this.css("margin-bottom")):this[0].offsetHeight:null},offset:function(){if(this.length>0){var e=this[0],t=e.getBoundingClientRect(),a=document.body,r=e.clientTop||a.clientTop||0,i=e.clientLeft||a.clientLeft||0,s=window.pageYOffset||e.scrollTop,n=window.pageXOffset||e.scrollLeft;return{top:t.top+s-r,left:t.left+n-i}}return null},css:function(e,t){var a;if(1===arguments.length){if("string"!=typeof e){for(a=0;a<this.length;a++)for(var r in e)this[a].style[r]=e[r];return this}if(this[0])return window.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(a=0;a<this.length;a++)this[a].style[e]=t;return this}return this},each:function(e){for(var t=0;t<this.length;t++)e.call(this[t],t,this[t]);return this},html:function(e){if("undefined"==typeof e)return this[0]?this[0].innerHTML:void 0;for(var t=0;t<this.length;t++)this[t].innerHTML=e;return this},is:function(a){if(!this[0])return!1;var r,i;if("string"==typeof a){var s=this[0];if(s===document)return a===document;if(s===window)return a===window;if(s.matches)return s.matches(a);if(s.webkitMatchesSelector)return s.webkitMatchesSelector(a);if(s.mozMatchesSelector)return s.mozMatchesSelector(a);if(s.msMatchesSelector)return s.msMatchesSelector(a);for(r=t(a),i=0;i<r.length;i++)if(r[i]===this[0])return!0;return!1}if(a===document)return this[0]===document;if(a===window)return this[0]===window;if(a.nodeType||a instanceof e){for(r=a.nodeType?[a]:a,i=0;i<r.length;i++)if(r[i]===this[0])return!0;return!1}return!1},index:function(){if(this[0]){for(var e=this[0],t=0;null!==(e=e.previousSibling);)1===e.nodeType&&t++;return t}return void 0},eq:function(t){if("undefined"==typeof t)return this;var a,r=this.length;return t>r-1?new e([]):0>t?(a=r+t,new e(0>a?[]:[this[a]])):new e([this[t]])},append:function(t){var a,r;for(a=0;a<this.length;a++)if("string"==typeof t){var i=document.createElement("div");for(i.innerHTML=t;i.firstChild;)this[a].appendChild(i.firstChild)}else if(t instanceof e)for(r=0;r<t.length;r++)this[a].appendChild(t[r]);else this[a].appendChild(t);return this},prepend:function(t){var a,r;for(a=0;a<this.length;a++)if("string"==typeof t){var i=document.createElement("div");for(i.innerHTML=t,r=i.childNodes.length-1;r>=0;r--)this[a].insertBefore(i.childNodes[r],this[a].childNodes[0])}else if(t instanceof e)for(r=0;r<t.length;r++)this[a].insertBefore(t[r],this[a].childNodes[0]);else this[a].insertBefore(t,this[a].childNodes[0]);return this},insertBefore:function(e){for(var a=t(e),r=0;r<this.length;r++)if(1===a.length)a[0].parentNode.insertBefore(this[r],a[0]);else if(a.length>1)for(var i=0;i<a.length;i++)a[i].parentNode.insertBefore(this[r].cloneNode(!0),a[i])},insertAfter:function(e){for(var a=t(e),r=0;r<this.length;r++)if(1===a.length)a[0].parentNode.insertBefore(this[r],a[0].nextSibling);else if(a.length>1)for(var i=0;i<a.length;i++)a[i].parentNode.insertBefore(this[r].cloneNode(!0),a[i].nextSibling)},next:function(a){return new e(this.length>0?a?this[0].nextElementSibling&&t(this[0].nextElementSibling).is(a)?[this[0].nextElementSibling]:[]:this[0].nextElementSibling?[this[0].nextElementSibling]:[]:[])},nextAll:function(a){var r=[],i=this[0];if(!i)return new e([]);for(;i.nextElementSibling;){var s=i.nextElementSibling;a?t(s).is(a)&&r.push(s):r.push(s),i=s}return new e(r)},prev:function(a){return new e(this.length>0?a?this[0].previousElementSibling&&t(this[0].previousElementSibling).is(a)?[this[0].previousElementSibling]:[]:this[0].previousElementSibling?[this[0].previousElementSibling]:[]:[])},prevAll:function(a){var r=[],i=this[0];if(!i)return new e([]);for(;i.previousElementSibling;){var s=i.previousElementSibling;a?t(s).is(a)&&r.push(s):r.push(s),i=s}return new e(r)},parent:function(e){for(var a=[],r=0;r<this.length;r++)e?t(this[r].parentNode).is(e)&&a.push(this[r].parentNode):a.push(this[r].parentNode);return t(t.unique(a))},parents:function(e){for(var a=[],r=0;r<this.length;r++)for(var i=this[r].parentNode;i;)e?t(i).is(e)&&a.push(i):a.push(i),i=i.parentNode;return t(t.unique(a))},find:function(t){for(var a=[],r=0;r<this.length;r++)for(var i=this[r].querySelectorAll(t),s=0;s<i.length;s++)a.push(i[s]);return new e(a)},children:function(a){for(var r=[],i=0;i<this.length;i++)for(var s=this[i].childNodes,n=0;n<s.length;n++)a?1===s[n].nodeType&&t(s[n]).is(a)&&r.push(s[n]):1===s[n].nodeType&&r.push(s[n]);return new e(t.unique(r))},remove:function(){for(var e=0;e<this.length;e++)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this},add:function(){var e,a,r=this;for(e=0;e<arguments.length;e++){var i=t(arguments[e]);for(a=0;a<i.length;a++)r[r.length]=i[a],r.length++}return r}},t.fn=e.prototype,t.unique=function(e){for(var t=[],a=0;a<e.length;a++)-1===t.indexOf(e[a])&&t.push(e[a]);return t},t}()),a=["jQuery","Zepto","Dom7"],r=0;r<a.length;r++)window[a[r]]&&e(window[a[r]]);var i;i="undefined"==typeof t?window.Dom7||window.Zepto||window.jQuery:t,i&&("transitionEnd"in i.fn||($.fn.transitionEnd=function(e){function t(s){if(s.target===this)for(e.call(this,s),a=0;a<r.length;a++)i.off(r[a],t)}var a,r=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],i=this;if(e)for(a=0;a<r.length;a++)i.on(r[a],t);return this}),"transform"in i.fn||($.fn.transform=function(e){for(var t=0;t<this.length;t++){var a=this[t].style;a.webkitTransform=a.MsTransform=a.msTransform=a.MozTransform=a.OTransform=a.transform=e}return this}),"transition"in i.fn||($.fn.transition=function(e){"string"!=typeof e&&(e+="ms");for(var t=0;t<this.length;t++){var a=this[t].style;a.webkitTransitionDuration=a.MsTransitionDuration=a.msTransitionDuration=a.MozTransitionDuration=a.OTransitionDuration=a.transitionDuration=e}return this}))}(),"undefined"!=typeof module?module.exports=Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return Swiper});
//# sourceMappingURL=maps/swiper.min.js.map;
var console = console || {};
var self = self || {};
var aw;
var Swiper = Swiper || {};
var Drupal = Drupal || {};

jQuery.extend(
	jQuery.expr[':'],
	{
		/// check that a field's value property has a particular value
		'field-value': function (el, indx, args) {
			var a, v = jQuery(el).val();
			if ( (a = args[3]) ) {
				switch ( a.charAt(0) ) {
					/// begins with
					case '^':
						return v.substring(0,a.length-1) === a.substring(1,a.length);
					/// ends with
					case '$':
						return v.substr(v.length-a.length-1,v.length) ===
							a.substring(1,a.length);
					/// contains
					case '*': return v.indexOf(a.substring(1,a.length)) !== -1;
					/// equals
					case '=': return v === a.substring(1,a.length);
					/// not equals
					case '!': return v !== a.substring(1,a.length);
					/// equals
					default: return v === a;
				}
			}
			else {
				return !!v;
			}
		}
	}
);

// Using the closure to map jQuery to $.
(function ($) {

	aw = (function(){


		var convertToSlug =	function(Text)
		{
				return Text
						.toLowerCase()
						.replace(/ /g,'-')
						.replace(/[^\w-]+/g,'')
						;
		};


		var gallery = (function(){
			return {
				init:function(){
					/*$('.images').masonry({
						itemSelector: '.item'
					});*/

					$('.images .link').colorbox({
						rel:'gal',
						maxHeight:'80%',
						maxWidth:'90%',
						title: function(){
							//console.log($(this).closest('.link').find('.description').html());
							return $(this).closest('.link').find('.description').html();
						},
						href: function(){
							return $(this).find('a').attr('href');
						}
					});
				},
				/*reInit:function(){
					$('.images').masonry();
				}*/
			};
		}());

		var carousel = (function(){
			var next = function($carousel){
					var $slides = $carousel.children();
					var $current = $carousel.find('.active');
					var $prev = $carousel.find('.prev');
					$current.addClass('prev');
					$prev.removeClass('prev');
					if($current.is(':last-child')){
						$current.removeClass('active');
							$slides.first().addClass('active');
					} else {
						$current.removeClass('active').next().addClass('active');
					}
				};
			return {
				init:function(){
					$('[data-widget*="carousel"]').each(function(){
						var $carousel = $(this);
						var $slides = $carousel.children();

						if($slides.length > 1){
							$carousel.addClass('carousel');
							$slides.addClass('slide');
							$slides.first().addClass('active');
							$slides.last().addClass('prev');
							$slides.find('.active').removeClass('active').next().addClass('active');

							setInterval(function(){
								next($carousel);
							}, 4000);

							$carousel.on('click', function(){
								next($carousel);
							});
						}
					});
				}
			};
		}());

		var swiper = (function(){

			return{
				init:function(){
					var swiper;
					swiper = new Swiper('.sya-swiper-container', {
							pagination: '.swiper-pagination',
							effect: 'coverflow',
							grabCursor: true,
							centeredSlides: true,
							slidesPerView: 'auto',
							autoplay: 10000,
							keyboardControl: true,
							paginationClickable:true,
							loop: true,
							loopedSlides: 4,
							coverflow: {
									rotate: 50,
									stretch: 0,
									depth: 100,
									modifier: 1,
									slideShadows : false
							}
					});

					var artistswiper;
					artistswiper = new Swiper('.artist-swiper-container', {
							pagination: '.swiper-pagination',
							effect: 'fade',
							grabCursor: true,
							centeredSlides: true,
							slidesPerView: 'auto',
							autoplay: 4000,
							keyboardControl: true,
							paginationClickable:true,
							loop: true,
							loopedSlides: 4
					});
					$('.artist-swiper-container').on('click',function(){ artistswiper.slideNext(); });
				}
			};
		}());

		var admin = (function(){
			var credits = function(){

				var showFields = function($row){

					var $select = $row.find('.field-name-field-row-type select');
					var $creditFields = $row.find('.field-name-field-title, .field-name-field-text-details, .field-name-field-year, .field-name-field-credit-type');
					var $categoryField = $row.find('.field-name-field-text-category');
					var $detailFields = $row.find('.field-name-field-title, .field-name-field-text-details');
					var $removeBtn = $row.find('.btn-danger');


					$removeBtn.html('x').attr('title','Remove');

					$categoryField.hide();
					$creditFields.hide();
					$detailFields.hide();

					switch($select.val()){
						case 'category':
							$categoryField.show();
							$row.removeClass('detail-row');
							$row.addClass('category-row');
							break;
						case 'content':
							$creditFields.show();
							$row.removeClass('category-row');
							$row.removeClass('detail-row');
							break;
						case 'detail':
							$row.addClass('detail-row');
							$row.removeClass('category-row');
							$detailFields.show();
							break;
					}
				};


				return {
					init: function(){
						$('.field-name-field-credits .draggable').each(function(){showFields($(this));});

						$(document).on('change','.field-name-field-row-type select', function(){
							showFields($(this).closest('.draggable'));
						});

						$(document).on('ajaxComplete',function(){
							$('.field-name-field-credits .draggable').each(function(){showFields($(this));});
						});
					}
				};
			};

			var images = function(){

				var showFields = function($row){

					var $select = $row.find('.field-name-field-header-or-image select');
					var $contentFields = $row.find('.field-name-field-image, .field-name-field-details');
					var $categoryField = $row.find('.field-name-field-text-category');


					switch($select.val()){
						case 'category':
							$contentFields.hide();
							$categoryField.show();
							$row.addClass('category-row');
							break;
						case 'content':
							$categoryField.hide();
							$contentFields.show();
							break;
					}
				};

				return {
					init: function(){
						$('.field-name-field-images .draggable').each(function(){showFields($(this));});

						$(document).on('change','.field-name-field-header-or-image select', function(){
							showFields($(this).closest('.draggable'));
						});

						$(document).on('ajaxComplete',function(){
							$('.field-name-field-images .draggable').each(function(){showFields($(this));});
						});
					}
				};
			};

			var addPagePath = function(){
				return {
					init:function(){
						var $pageTitleInput = $('#user-profile-form input[name*="field_page_title"]');
						var $pathInput = $('#user-profile-form #edit-path');
						$pageTitleInput.on('keyup', function(){
							$pathInput.val(aw.convertToSlug($(this).val()));
						});
					}
				};
			};

			var selectFont = function(){
				return {
					init:function(){
						$(".select-font select").chosen({disable_search_threshold: 10, max_selected_options: 5, font_select:true});

						//assign selected font
						$(".select-font").each(function(){
							var $select = $(this).find('select');
							$(this).find('.chosen-single').css('font-family',$select.val());
						});

						$(".select-font select").on('change', function(){
							$(this).siblings('.chosen-container')
								.find('.chosen-single')
								.css('font-family',$(this).val());
						});

						/*$('body').on('click', '.select-font .chosen-container', function(){
							var $li = $(this).find('li');
							$li.each(function(){
								$(this).css('font-family',$(this).html());
							});
						});*/

					}
				};
			};

			var demoSite = function(){
				var $demoSite = $('.demo-site'),
					cache = {};

				var update = function(){
					//set layout
					var $header	= $demoSite.find('#demo-header'),
						$content	= $demoSite.find('#demo-content'),
						$wrapper	= $demoSite.find('.structure-wrapper'),
						$layoutDiv = $demoSite.find('#demo-layout'),
						$links = $content.find('a'),
						$headerText = $header.find('.header-text'),
						$navigation = $header.find('.artist-navigation'),
						//$innerHeader = $header.find('.artist-header'),
						$navLinks = $header.find('.artist-navigation .item'),
						$embeddedNavLinks = $header.find('.nav-embedded .item'),
						$title = $header.find('.title'),
						$h1 = $content.find('h1'),
						$blurb = $header.find('.blurb'),
						$headers = $content.find('h1'),
						$bg1Img = $('input.bg-img-hidden-field_bg1_img'),
						$bg2Img = $('input.bg-img-hidden-field_bg2_img'),
						$selectedNavStyle = $('input[name="profile_artist_site_fonts_and_colours[field_navigation_style][und]"]:checked'),
						$selectedLayout = $('input[name="profile_artist_site_fonts_and_colours[field_layout][und]"]:checked'),
						$selectedbgstyle = $('input[name="profile_artist_site_fonts_and_colours[field_bg_style][und]"]:checked'),
						$selectedNavJustify = $('input[name="profile_artist_site_fonts_and_colours[field_nav_justify][und]"]:checked'),
						$formPosition = $('#edit-profile-artist-site-fonts-and-colours-field-navigation-position-und'),
						$formStyle = $('#edit-profile-artist-site-fonts-and-colours-field-navigation-style-und'),
						$formFontTitle = $('#edit-profile-artist-site-fonts-and-colours-field-title-font-und'),
						$formFontHeader = $('#edit-profile-artist-site-fonts-and-colours-field-header-font-und'),
						$formFontMain = $('#edit-profile-artist-site-fonts-and-colours-field-main-font-und'),
						$formFontNav = $('#edit-profile-artist-site-fonts-and-colours-field-navigation-font-und'),
						$formColorBg = $('#edit-profile-artist-site-fonts-and-colours-field-color-background-und-0-rgb'),
						$formColorFont = $('#edit-profile-artist-site-fonts-and-colours-field-font-color-und-0-rgb'),
						$formColorPrimary = $('#edit-profile-artist-site-fonts-and-colours-field-primary-colour-und-0-rgb'),
						$formColorSecondary = $('#edit-profile-artist-site-fonts-and-colours-field-secondary-colour-und-0-rgb'),
						$formColorSecondaryFont = $('#edit-profile-artist-site-fonts-and-colours-field-secondary-font-color-und-0-rgb'),
						$formColorTertiary = $('#edit-profile-artist-site-fonts-and-colours-field-tertiary-colour-und-0-rgb'),
						$bg1Repeat = $('#edit-profile-artist-site-fonts-and-colours-field-bg1-repeat-und'),
						$bg1Stretch = $('#edit-profile-artist-site-fonts-and-colours-field-bg1-stretch-und'),
						$bg1XPos = $('#edit-profile-artist-site-fonts-and-colours-field-bg1-pos-x-und'),
						$bg1YPos = $('#edit-profile-artist-site-fonts-and-colours-field-bg1-pos-y-und'),
						$bg1Opacity = $('#edit-profile-artist-site-fonts-and-colours-field-bg1-opacity-und-0-value'),
						$bg2Repeat = $('#edit-profile-artist-site-fonts-and-colours-field-bg2-repeat-und'),
						$bg2Stretch = $('#edit-profile-artist-site-fonts-and-colours-field-bg2-stretch-und'),
						$bg2XPos = $('#edit-profile-artist-site-fonts-and-colours-field-bg2-pos-x-und'),
						$bg2YPos = $('#edit-profile-artist-site-fonts-and-colours-field-bg2-pos-y-und'),
						$bg2Opacity = $('#edit-profile-artist-site-fonts-and-colours-field-bg2-opacity-und-0-value'),
						$bgOpacity = $('#edit-profile-artist-site-fonts-and-colours-field-bg-opacity-und'),
						overrideVals = ['nav_text','nav_text_h','nav_bg','nav_bg_h','nav_border','nav_border_h','headers','bg2','link','link_hover','border','blurb','title','title_h'],
						overrides, colors, backgrounds, bgOpacity;
						
					/*function getAdvancedColorBool(type){
						var value_dashed = type.split('_').join('-');
						return $('#edit-profile-artist-site-fonts-and-colours-field-bool-color-'+value_dashed+'-und');
					}
					function getAdvancedColorInput(type){
						var value_dashed = type.split('_').join('-');
						return $('#edit-profile-artist-site-fonts-and-colours-field-color-'+value_dashed+'-und-0-rgb');
					}*/
					function getAdvancedColorSet(type){
						var value_dashed = type.split('_').join('-');
						return $('#edit-profile-artist-site-fonts-and-colours-field-bool-color-'+value_dashed+
							', #edit-profile-artist-site-fonts-and-colours-field-color-'+value_dashed);
					}

					function getOverrides(){
						var overrides = [];
						$.each(overrideVals, function(index, value){
						var value_dashed = value.split('_').join('-'),
								boolSelector = '#edit-profile-artist-site-fonts-and-colours-field-bool-color-'+value_dashed+'-und',
								colorSelector = '#edit-profile-artist-site-fonts-and-colours-field-color-'+value_dashed+'-und-0-rgb';
							overrides[value] = $(boolSelector).is(':checked') ? $(colorSelector).val() : false;
						});
						return overrides;
					}

					function hexToRgba(hex, percent) {

						var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
							r = parseInt(result[1], 16),
							g = parseInt(result[2], 16),
							b = parseInt(result[3], 16),
							a = (percent * 0.01);

						return "rgba(" + r + "," + g + "," + b + "," + a + ")";
					}

					function dependencies(){
						//hide currently unused
						getAdvancedColorSet('border').hide();
						getAdvancedColorSet('nav_border').hide();
						getAdvancedColorSet('nav_border_h').hide();

						//hide social links
						$('#edit-profile-artist-site-fonts-and-colours-field-nav-social').hide();

						//hide justify options when nav = sidebar
						if($selectedLayout.val() === 'sidebar'){
							$('#edit-profile-artist-site-fonts-and-colours-field-nav-justify').hide();
							cache.layout = $selectedNavJustify.val();
							console.log(cache.layout);
							$('#edit-profile-artist-site-fonts-and-colours-field-nav-justify-und-none').prop('checked',true);
						} else if("layout" in cache){
							$('#edit-profile-artist-site-fonts-and-colours-field-nav-justify').show();
							$('input[name="profile_artist_site_fonts_and_colours[field_nav_justify][und]"][value="'+cache.layout+'"]').prop('checked',true);
							delete cache.layout;
						}

						if($selectedbgstyle.val() === 'simple'){
							getAdvancedColorSet('bg2').hide();
							$('#edit-profile-artist-site-fonts-and-colours-field-tertiary-colour').hide();
							$('#edit-profile-artist-site-fonts-and-colours-field-secondary-font-color').hide();
						} else if($selectedbgstyle.val() === 'boxed-page') {
							getAdvancedColorSet('bg2').show();
							$('#edit-profile-artist-site-fonts-and-colours-field-tertiary-colour').hide();
							$('#edit-profile-artist-site-fonts-and-colours-field-secondary-font-color').show();
						}	else {
							getAdvancedColorSet('bg2').show();
							$('#edit-profile-artist-site-fonts-and-colours-field-tertiary-colour').show();
							$('#edit-profile-artist-site-fonts-and-colours-field-secondary-font-color').show();
						}

						//hide bg image opacity while not in use
						$('.field-name-field-bg1-opacity').hide();
						$('.field-name-field-bg2-opacity').hide();


						if($selectedbgstyle.val().indexOf('boxed') !== 0) {
							$('#edit-profile-artist-site-fonts-and-colours-field-bg-opacity').hide();
						} else {
							$('#edit-profile-artist-site-fonts-and-colours-field-bg-opacity').show();
						}

						//hide secondary background for simple nav
						if($selectedbgstyle.val() === 'simple'){
							$('.group-bg2-img').hide();
						} else {
							$('.group-bg2-img').show();
						}
					}

					function applyBgImg($el, bg){
						$el.css('background-image', 'url('+bg.img+')')
							.css('background-repeat', bg.repeat)
							.css('background-size', bg.stretch)
							.css('background-position-x', bg.xPos)
							.css('background-position-y', bg.yPos);

					}

					overrides = getOverrides();

					bgOpacity = $selectedbgstyle.val().indexOf('boxed') !== 0 ? 100 : $bgOpacity.val();
					
					colors = {
						bg1 : hexToRgba($formColorBg.val(), bgOpacity),
						font1 : $formColorFont.val(),
						primary : $formColorPrimary.val(),
						secondary : $formColorSecondary.val(),
						tertiary : $formColorTertiary.val(),
						font2 : $formColorSecondaryFont.val()
					};

					colors.bg2 = overrides.bg2 ? overrides.bg2 : colors.primary;
					colors.border = overrides.border ? overrides.border : colors.secondary;
					colors.header = overrides.headers ? overrides.headers : colors.font1;
					colors.link = overrides.link ? overrides.link : colors.primary;
					colors.link_h = overrides.link_hover ? overrides.link_hover : colors.secondary;
					colors.title = overrides.title ? overrides.title : false;
					colors.title_h = overrides.title_h ? overrides.title_h : false;
					colors.blurb = overrides.blurb ? overrides.blurb  : false;
					colors.nav_text = overrides.nav_text ? overrides.nav_text : false;
					colors.nav_text_h = overrides.nav_text_h ? overrides.nav_text_h : false;
					colors.nav_bg = overrides.nav_bg ? overrides.nav_bg : false;
					colors.nav_bg_h = overrides.nav_bg_h ? overrides.nav_bg_h : false;
					colors.nav_border = overrides.nav_border ? overrides.nav_border : false;
					colors.nav_border_h = overrides.nav_border_h ? overrides.nav_border_h : false;

					backgrounds = [
						{
							img : !!$bg1Img.val() ? $bg1Img.val() : 'none',
							stretch : $bg1Stretch.val(),
							repeat : $bg1Repeat.val(),
							xPos : $bg1XPos.val(),
							yPos : $bg1YPos.val(),
							opacity : $bg1Opacity.val()
						},
						{
							img : !!$bg2Img.val() ? $bg2Img.val() : 'none',
							stretch : $bg2Stretch.val(),
							repeat : $bg2Repeat.val(),
							xPos : $bg2XPos.val(),
							yPos : $bg2YPos.val(),
							opacity : $bg2Opacity.val()
						}
					];

					if($formPosition.val()==='_none'){
						$formPosition.val('top');
					}
					if($formStyle.val()==='_none'){
						$formStyle.val('button');
					}

					if($formFontTitle.val()==='_none'){
						$formFontTitle.val('Lato');
					}
					if($formFontHeader.val()==='_none'){
						$formFontHeader.val('Lato');
					}
					if($formFontMain.val()==='_none'){
						$formFontMain.val('Lato');
					}

					selectFont().init();


					function colorHeader(type){
						switch(type){
							case 'simple':
								$header.css('background-color',colors.bg1)
									.css('color', colors.font1);
								$blurb.css('color',$formColorFont.val());
								$title.find('a').css('color', colors.title ? colors.title : colors.primary)
									.hover(function(){
										$(this).css('color', colors.title_h ? colors.title_h : colors.secondary);
									},function(){
										$(this).css('color', colors.title ? colors.title : colors.primary);
									});

									if($selectedNavStyle.val() === 'links'){
										$navigation.css('background', 'transparent');

										$navLinks.css('background', 'transparent')
											.css('color',  colors.nav_text ? colors.nav_text : colors.primary)
											.hover(function(){
												$(this).css('color',  colors.nav_text_h ? colors.nav_text_h : colors.secondary)
													.css('background',  'transparent');
											}, function(){
												$(this).css('color',  colors.nav_text ? colors.nav_text : colors.primary)
													.css('background',  'transparent');
											});

										$embeddedNavLinks.css('color',  colors.nav_text ? colors.nav_text : '#fff')
											.css('background', colors.primary)
											.hover(function(){
												$(this).css('color',  colors.nav_text_h ? colors.nav_text_h : colors.secondary)
													.css('background',  colors.primary);
											}, function(){
												$(this).css('color',  colors.nav_text ? colors.nav_text : '#fff')
													.css('background',  colors.primary);
											});

									}
									else if($selectedNavStyle.val() === 'button'){
										$navigation.css('background', 'transparent');
										$navLinks.css('background', colors.nav_bg ? colors.nav_bg : colors.primary)
											.css('color', colors.nav_text ? colors.nav_text : '#ffffff')
											.hover(function(){
												$(this).css('background', colors.nav_bg_h ? colors.nav_bg_h : colors.secondary)
													.css('color', colors.nav_text_h ? colors.nav_text_h : '#ffffff');
											}, function(){
												$(this).css('background', colors.nav_bg ? colors.nav_bg : colors.primary)
													.css('color', colors.nav_text ? colors.nav_text : '#ffffff');
											});

										$embeddedNavLinks.css('color',  colors.nav_text ? colors.nav_text : '#fff')
											.css('background', colors.primary)
											.hover(function(){
												$(this).css('color',  colors.nav_text_h ? colors.nav_text_h : '#fff')
													.css('background',  colors.secondary);
											}, function(){
												$(this).css('color',  colors.nav_text ? colors.nav_text : '#fff')
													.css('background',  colors.primary);
											});
									}
									else if($selectedNavStyle.val() === 'bar'){
										$navigation.css('background', colors.nav_bg ? colors.nav_bg : colors.primary);
										$navLinks.css('background', colors.nav_bg ? colors.nav_bg : colors.primary)
											.css('color', colors.nav_text ? colors.nav_text : '#ffffff')
											.hover(function(){
												$(this).css('background', colors.nav_bg_h ? colors.nav_bg_h : 'transparent')
													.css('color', colors.nav_text_h ? colors.nav_text_h : colors.secondary);
											}, function(){
												$(this).css('background', colors.nav_bg ? colors.nav_bg : colors.primary)
													.css('color', colors.nav_text ? colors.nav_text : '#ffffff');
											});

										$embeddedNavLinks.css('color',  colors.nav_text ? colors.nav_text : '#fff')
											.css('background', colors.primary)
											.hover(function(){
												$(this).css('color',  colors.nav_text_h ? colors.nav_text_h : colors.secondary)
													.css('background',  colors.primary);
											}, function(){
												$(this).css('color',  colors.nav_text ? colors.nav_text : '#fff')
													.css('background',  colors.primary);
											});
									}

								break;
							case 'background':
								$blurb.css('color',$formColorSecondaryFont.val());
								$title.find('a').css('color', colors.title ? colors.title : colors.secondary)
									.hover(function(){
										$(this).css('color', colors.title_h ? colors.title_h : colors.tertiary);
									},function(){
										$(this).css('color', colors.title ? colors.title : colors.secondary);
									});
								if($selectedNavStyle.val() === 'links'){
									$navigation.css('background', 'transparent');
									$navLinks.css('background', 'transparent')
										.css('color',  colors.nav_text ? colors.nav_text : colors.font2)
										.hover(function(){
											$(this).css('color',  colors.nav_text_h ? colors.nav_text_h : colors.secondary)
												.css('background',  'transparent');
										}, function(){
											$(this).css('color',  colors.nav_text ? colors.nav_text : colors.font2)
												.css('background',  'transparent');
										});

										$embeddedNavLinks.css('color',  colors.nav_text ? colors.nav_text : '#fff')
											.css('background', colors.emb_nav_bg ? colors.emb_nav_bg : colors.secondary)
											.hover(function(){
												$(this).css('color',  colors.nav_text_h ? colors.nav_text_h : colors.tertiary)
													.css('background',   colors.emb_nav_bg_h ? colors.emb_nav_bg_h : colors.secondary);
											}, function(){
												$(this).css('color',  colors.nav_text ? colors.nav_text : '#fff')
													.css('background',   colors.emb_nav_bg ? colors.emb_nav_bg : colors.secondary);
											});
								}
								else if($selectedNavStyle.val() === 'button'){
										$navigation.css('background', 'transparent');
										$navLinks.css('background', colors.nav_bg ? colors.nav_bg : colors.secondary)
											.css('color', colors.nav_text ? colors.nav_text : '#ffffff')
											.hover(function(){
												$(this).css('background', colors.nav_bg_h ? colors.nav_bg_h : colors.tertiary)
													.css('color', colors.nav_text_h ? colors.nav_text_h : '#ffffff');
											}, function(){
												$(this).css('background', colors.nav_bg ? colors.nav_bg : colors.secondary)
													.css('color', colors.nav_text ? colors.nav_text : '#ffffff');
											});

										$embeddedNavLinks.css('color',  colors.nav_text ? colors.nav_text : '#fff')
											.css('background', colors.emb_nav_bg ? colors.emb_nav_bg : colors.secondary)
											.hover(function(){
												$(this).css('color',  colors.nav_text_h ? colors.nav_text_h : '#fff')
													.css('background',   colors.emb_nav_bg_h ? colors.emb_nav_bg_h : colors.tertiary);
											}, function(){
												$(this).css('color',  colors.nav_text ? colors.nav_text : '#fff')
													.css('background',   colors.emb_nav_bg ? colors.emb_nav_bg : colors.secondary);
											});

								}
								else if($selectedNavStyle.val() === 'bar'){
										$navigation.css('background', colors.nav_bg ? colors.nav_bg : colors.secondary);
										$navLinks.css('background', colors.nav_bg ? colors.nav_bg : colors.secondary)
											.css('color', colors.nav_text ? colors.nav_text : '#ffffff')
											.hover(function(){
												$(this).css('color', colors.nav_text_h ? colors.nav_text_h : colors.tertiary);
											}, function(){
												$(this).css('color', colors.nav_text ? colors.nav_text : '#ffffff');
											});

										$embeddedNavLinks.css('color',  colors.nav_text ? colors.nav_text : '#fff')
											.css('background', colors.emb_nav_bg ? colors.emb_nav_bg : colors.secondary)
											.hover(function(){
												$(this).css('color',  colors.nav_text_h ? colors.nav_text_h : colors.tertiary)
													.css('background',   colors.emb_nav_bg_h ? colors.emb_nav_bg_h : colors.secondary);
											}, function(){
												$(this).css('color',  colors.nav_text ? colors.nav_text : '#fff')
													.css('background',   colors.emb_nav_bg ? colors.emb_nav_bg : colors.secondary);
											});

								}
								break;
						}
					}


					//set layout
					//TODO
					$layoutDiv.attr('class','');


					//nav-style
					$layoutDiv.addClass('nav-style-'+$selectedNavStyle.val());
					if($selectedNavStyle.val()==='links'){
						colors.emb_nav_bg = colors.nav_bg;
						colors.emb_nav_bg_h = colors.nav_bg_h;
						colors.nav_bg = 'transparent';
						colors.nav_bg_h = 'transparent';
					}

					
					//nav-justify
					$layoutDiv.addClass('nav-justify-'+$selectedNavJustify.val());
					if($selectedNavJustify.val()==='none' && $selectedNavStyle.val()!=='bar' ){
						$headerText.append($navigation);
					} else {
						$header.append($navigation);
					}

					//set fonts
					$title.css('font-family', $formFontTitle.val());
					$h1.css('font-family', $formFontHeader.val());
					$demoSite.css('font-family', $formFontMain.val());
					$navLinks.css('font-family', $formFontNav.val());
					$blurb.css('font-family', $formFontMain.val());
					
					$links.css('color', colors.link ? colors.link : colors.primary);
					$links.hover(function(){
						$(this).css('color', colors.link_h ? colors.link_h : colors.secondary);
					},function(){
						$(this).css('color', colors.link ? colors.link : colors.primary);
					});

					//layout
					$layoutDiv.addClass('layout-'+$selectedLayout.val());


					//bg-style
					$layoutDiv.addClass('bg-'+$selectedbgstyle.val());
					switch($selectedbgstyle.val()){
						case 'simple':

							//header
							colorHeader('simple');

							$layoutDiv.css('background-color',colors.bg1)
								.css('background-image','none');
							$header.css('background-color','transparent')
								.css('background-image','none');
							$wrapper.css('background-color','transparent')
								.css('background-image','none');
							$content.css('background-color','transparent')
								.css('background-image','none');

							applyBgImg($layoutDiv, backgrounds[0]);

							//content area
							$content.css('color',colors.font1);
							$content.css('opacity',1);

							break;
						case 'boxed-content':
							$layoutDiv.css('background-color',colors.bg2 ? colors.bg2 : colors.primary);
							$layoutDiv.css('opacity',1);


							$header.css('background-color','transparent')
								.css('background-image','none');
							$content.css('background-color',colors.bg1)
								.css('color',colors.font1);
							$wrapper.css('background-color','transparent')
								.css('background-image','none');

							colorHeader('background');

							applyBgImg($layoutDiv, backgrounds[0]);
							applyBgImg($content, backgrounds[1]);


							break;
						case 'boxed-page':

							//content area
							$content.css('color',$formColorFont.val());

							//header
							colorHeader('simple');


							$layoutDiv.css('background-color',colors.bg2 ? colors.bg2 : colors.primary);
							
							$header.css('background-color','transparent')
								.css('background-image','none');
							$content.css('background-color','transparent')
								.css('background-image','none');
							$wrapper.css('background-color',colors.bg1)
								.css('background-image','none');

							applyBgImg($layoutDiv, backgrounds[0]);
							applyBgImg($wrapper, backgrounds[1]);

							break;
						case 'header-split':
							$layoutDiv.css('background-color','transparent');
							$header.css('background-color',colors.bg2 ? colors.bg2 : colors.primary);
							$content.css('background-color',colors.bg1);
							$wrapper.css('background-color','transparent');

							//content area
							$content.css('color',colors.font1);

							//header
							colorHeader('background');


							applyBgImg($header, backgrounds[0]);
							applyBgImg($content, backgrounds[1]);

							break;
					}

					//other color overrides
					if(colors.header){
						$headers.css('color', colors.header);
					}
					if(colors.blurb){
						$blurb.css('color', colors.blurb);
					}

					dependencies();
				};

				function enableColorPickers(){
					var $parent, $sibling, $color;
					if($('.group-colors-advanced').length){
						$('.group-colors-advanced .form-checkbox').each(function(){
							$parent = $(this).closest('.field-type-list-boolean');
							$sibling = $parent.next('.field-type-color-field-rgb');
							$color = $sibling.find('input');
							if($(this).is(':checked')){
								$color.spectrum('enable');
								$sibling.removeClass('form-disabled');
							} else {
								$color.spectrum('disable');
								$sibling.addClass('form-disabled');
							}
						});

						$('.group-colors-advanced .form-checkbox').on('change',function(){
							$parent = $(this).closest('.field-type-list-boolean');
							$sibling = $parent.next('.field-type-color-field-rgb');
							$color = $sibling.find('input');
							if($(this).is(':checked')){
								$color.spectrum('enable');
								$sibling.removeClass('form-disabled');

							} else {
								$color.spectrum('disable');
								$sibling.addClass('form-disabled');
							}
						});
					}
				}

				function showHideAdvanced(){
						if(!$('#group_colors_advanced .checkbox input:checked').length){
							$('#group_colors_advanced').collapse('hide');
						}
				}

				return {
					init :function(){
						if($demoSite.length){
							update();
							enableColorPickers();
							$('form').on('change', function(){
								update();
							});
							showHideAdvanced();
							$(document).ajaxSuccess(function() {
								$('form').change();
							});
						}
					}
				};
			};

			var editNavigation = function(){
				var $table = $('#nav-items-table'),
					newRowNumber=0,
					newSections = {},
					deleteSections = [];

				function updateNewSections(){
					$('input.nav-item-new-sections').val(JSON.stringify(newSections));
						console.log(newSections);
				}

				function newSection(){
					var $sectionRow,
						sectionRow;
					


					//todo need to incorporate into Drupal better
					sectionRow = '<tr class="draggable tabledrag-root odd nav-section new-section">'+
						'<td>Section</td>'+
						'<td><label for="av-section-name">Name in navigation</label>'+
						'<input class="form-control form-text nav-section-name" type="text" id="nav-section-name" name="nav-section-name" value="" size="60" maxlength="128">'+
						'</td>'+
						'<td>'+
						'<input type="checkbox" id="nav-section-show" name="nav-section-show" value="1" checked="checked" class="form-checkbox">'+
						'<label for="nav-section-show">Show in Navigation</label>'+
						'<button class="btn btn-danger form-submit btn-delete" id="edit-navigation-delete" name="op" value="Remove Section" type="button">Remove Section</button>'+
						'</td>'+
						'<td class="tabledrag-hide" style="display: none;">'+
						'<label for="nav-section-weight">Weight</label>'+
						'<input class="nav-item-weight form-control form-text nav-section-weight" type="text" id="nav-section-weight" name="nav-section-weight" value="10" size="3" maxlength="128">'+
						'<label for="nav-section-parent">parent</label>'+
						'<input class="nav-item-parent form-control form-text" type="text" id="nav-section-parent" name="nav-section-parent" value="0" size="3" maxlength="128">'+
						'<label for="nav-section-id">id</label>'+
						'<input class="nav-item-sid form-control form-text" type="text" id="nav-section-id" name="nav-section-id" value="9" size="3" maxlength="128">'+
						'</td><td></td>'+
						'</tr>';

					$sectionRow = $(sectionRow).data('id',newRowNumber);


					$sectionRow.find('input').each(function(){
						$(this).attr('id', $(this).attr('id')+'-'+newRowNumber);
						$(this).attr('name', $(this).attr('name')+'-'+newRowNumber);
					});
					$sectionRow.find('label').each(function(){
						$(this).attr('for', $(this).attr('for')+'-'+newRowNumber);
					});
					$sectionRow.find('input.nav-item-sid').val('section-'+newRowNumber);

					$sectionRow.find('.tabledrag-handle').remove();


					$table.find('tbody').append($sectionRow);
					Drupal.tableDrag['nav-items-table'].makeDraggable($('tbody tr:last-child').get()[0]);
					newSections[newRowNumber]={
						show:1,
						name:''
					};

					$sectionRow.find('.nav-section-name').on('keyup',function(){
						newSections[$sectionRow.data('id')].name = $(this).val();
					});

					//assign weights on submit
					$('#profile2-edit-navigation-form').on('submit',function(){
						$.each($('.nav-section-weight'),function(){
							var $parent = $(this).closest('tr');
							newSections[$parent.data('id')].weight = $(this).val();
						});

						updateNewSections();
					});

					updateNewSections();
					newRowNumber++;
				}

				//make sure order of items in table matches the assigned weights
				function assignWeights(){
					var newWeight = 1;
					$table.find('tbody > tr').each(function(){
						var $row = $(this),
							$weight = $row.find('.nav-item-weight'),
							parent = $row.find('.nav-item-parent').val();

						if(parent === '0') {
							$weight.val(newWeight);
							newWeight++;
						}
					});
				}

				return {
					init : function(){
						if($table.length){
							$('button.nav-add-section').click(function(){
								newSection();
							});

							//apply indentations
							$table.find('tbody tr').each(function(){
								if($(this).find('.nav-item-parent').val()!=='0'){
									$(this).find('td:first-child').prepend('<div class="indentation">&nbsp;</div>');
								}
							});

						$('#profile2-edit-navigation-form').on('submit',function(e){
							$('.nav-section').each(function(){
								var sid = $(this).find('.nav-item-sid').val();
								if($('input.nav-item-parent:field-value(='+sid+')').length){
								}
								else {
									$(this).addClass('error');
									$('#edit-nav-validation').show()
										.html("Every section needs to have a page connected to it. Please make sure each marked section is either removed or has pages added to it.");

									e.preventDefault();
								}
							});
						});

						//delete a section
						$('#profile2-edit-navigation-form').on('click','.btn-delete',function(){
							var $row = $(this).closest('tr'),
								weight = $row.find('.nav-item-weight').val(),
								sid = $row.find('.nav-item-sid').val(),
								$childrenSidInput = $('input.nav-item-parent:field-value(='+sid+')'),
								$children = $childrenSidInput.closest('tr');

							console.log(this);

							//assign children the current weight and remove parent
							$childrenSidInput.val(0);
							$children.find('.nav-item-weight').val(weight);

							//remove indentation
							$children.find('.indentation').remove();

							//remove row
							$row.remove();

							//add delete to hidden input but not for newly created sections
							if(!$row.hasClass('new-section')){
								deleteSections.push(sid);
								$('.nav-item-delete-sections').val(deleteSections.toString());
							}

							//update weights of all rows with no parents as the children are not parentless and need to
							//be reincorporated back into the table
							assignWeights();

						});

						}
					}
				};
			};

			var editFp = function(){
				var $form = $('#user-profile-form'),
					$imgMode = $('#edit-profile-artists-home-page-field-image-mode'),
					$imgPos = $('#edit-profile-artists-home-page-field-image-position'),
					$bannerPos = $('#edit-profile-artists-home-page-field-banner-position'),
					$bannerWidth = $('#edit-profile-artists-home-page-field-banner-width'),
					$imgHeight = $('#edit-profile-artists-home-page-field-image-height');

				function dependencies(){
					$imgMode.show();
					$imgPos.show();
					$bannerPos.show();
					$bannerWidth.show();
					$imgHeight.show();

					if($imgMode.find('select').val() === 'banner'){
						$imgPos.hide();
					}
					else {
						$bannerPos.hide();
					}
					if($imgMode.find('select').val() === 'carousel'){
						$imgHeight.hide();
					}
					if($imgMode.find('select').val() === 'standard'){
						$bannerWidth.hide();
						$imgHeight.hide();
					}
					if(($imgPos.find('select').val() === 'left' || $imgPos.find('select').val() === 'right') && $imgMode.find('select').val() !== 'banner'){
						$bannerWidth.hide();
						$bannerWidth.find('select').val('content');
					}
				}
				return {
					init:function(){
						dependencies();

						if($('.group-fp-images').length){
							$form.on('change', function(){
								dependencies();
							});
						}
					}
				};
			};


			return {
				init:function(){
					credits().init();
					images().init();
					addPagePath().init();
					demoSite().init();
					editNavigation().init();
					editFp().init();
				}
			};
		}());

		
		var navigation = (function(){
			return {
				init: function(){
					console.log('run tap 2');
					$('.section.item').on('click',function(){
						console.log('tap');
						var $embeddedNav = $(this).siblings('.nav-embedded');
						$embeddedNav.toggleClass('open');
					});


					$('.nav-embedded .close, .nav-embedded .tint').on('click',function(){
						console.log('tap');
						var $embeddedNav = $(this).closest('.nav-embedded');
						$embeddedNav.removeClass('open');
					});
	

				}
			};
		})();

		var noadmin = (function(){
			return {
				init: function(){/*
					if($('iframe.noadmin').length){
						$('iframe.noadmin').each(function(){
							$(this).load(function(){
								console.log('loaded',$(this).attr('class'));
							});
							console.log('noadmin class');
							$($(this).contents()).find('html').addClass('noadmin');
							console.log($($(this).contents()).find('body').addClass('noadmin'));
							console.log($($(this).contents()).find('body').attr('class'));
							//.addClass('noadmin');
						});
					}*/

					if(self!==top){
						$('html').addClass('noadmin');
					}
				}
			};
		})();

		return {
			init:function(){
				gallery.init();
				admin.init();
				noadmin.init();
				carousel.init();
				swiper.init();
				navigation.init();

				//scroll click code to fix later
				$('a.scrollclick').on('click', function(e){
					e.preventDefault();
						var offset = $($(this).attr('href')).position().top - $('.navbar-fixed-top').outerHeight();
						$('html,body').animate({scrollTop: offset}, 300);

						//return false;
				});

				$(".justified-gallery").justifiedGallery({
					selector: '.justified-image > .link',
					margins: 10,
					border: 0,
					rowHeight: 200,
					lastRow: 'justify'
				});
			},
			galleryReInit: gallery.reInit,
			convertToSlug: convertToSlug
		};
	}());

	$(document).on('ready', function(){
		aw.init();
	});
	$(window).on('load', function(){
		//aw.galleryReInit();
	});
}(jQuery));;
/*! modernizr 3.0.0-alpha.4 (Custom Build) | MIT *
 * http://modernizr.com/download/#-flexbox !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,s,i,a;for(var l in C){if(e=[],n=C[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],a=i.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),g.push((o?"":"no-")+a.join("-"))}}function s(e){var n=x.className,t=Modernizr._config.classPrefix||"";if(_&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),_?x.className.baseVal=n:x.className=n)}function i(e,n){return!!~(""+e).indexOf(n)}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):_?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function l(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function f(e,n){return function(){return e.apply(n,arguments)}}function u(e,n,t){var o;for(var s in e)if(e[s]in n)return t===!1?e[s]:(o=n[e[s]],r(o,"function")?f(o,t||n):o);return!1}function d(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function p(){var e=n.body;return e||(e=a(_?"svg":"body"),e.fake=!0),e}function c(e,t,r,o){var s,i,l,f,u="modernizr",d=a("div"),c=p();if(parseInt(r,10))for(;r--;)l=a("div"),l.id=o?o[r]:u+(r+1),d.appendChild(l);return s=a("style"),s.type="text/css",s.id="s"+u,(c.fake?c:d).appendChild(s),c.appendChild(d),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),d.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",f=x.style.overflow,x.style.overflow="hidden",x.appendChild(c)),i=t(d,e),c.fake?(c.parentNode.removeChild(c),x.style.overflow=f,x.offsetHeight):d.parentNode.removeChild(d),!!i}function m(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(d(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];o--;)s.push("("+d(n[o])+":"+r+")");return s=s.join(" or "),c("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function h(e,n,o,s){function f(){d&&(delete N.style,delete N.modElem)}if(s=r(s,"undefined")?!1:s,!r(o,"undefined")){var u=m(e,o);if(!r(u,"undefined"))return u}for(var d,p,c,h,v,y=["modernizr","tspan"];!N.style;)d=!0,N.modElem=a(y.shift()),N.style=N.modElem.style;for(c=e.length,p=0;c>p;p++)if(h=e[p],v=N.style[h],i(h,"-")&&(h=l(h)),N.style[h]!==t){if(s||r(o,"undefined"))return f(),"pfx"==n?h:!0;try{N.style[h]=o}catch(g){}if(N.style[h]!=v)return f(),"pfx"==n?h:!0}return f(),!1}function v(e,n,t,o,s){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+b.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?h(a,n,o,s):(a=(e+" "+E.join(i+" ")+i).split(" "),u(a,n,t))}function y(e,n,r){return v(e,t,t,n,r)}var g=[],C=[],w={_version:"3.0.0-alpha.4",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){C.push({name:e,fn:n,options:t})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=w,Modernizr=new Modernizr;var x=n.documentElement,_="svg"===x.nodeName.toLowerCase(),S="Moz O ms Webkit",b=w._config.usePrefixes?S.split(" "):[];w._cssomPrefixes=b;var E=w._config.usePrefixes?S.toLowerCase().split(" "):[];w._domPrefixes=E;var z={elem:a("modernizr")};Modernizr._q.push(function(){delete z.elem});var N={style:z.elem.style};Modernizr._q.unshift(function(){delete N.style}),w.testAllProps=v,w.testAllProps=y,Modernizr.addTest("flexbox",y("flexBasis","1px",!0)),o(),s(g),delete w.addTest,delete w.addAsyncTest;for(var P=0;P<Modernizr._q.length;P++)Modernizr._q[P]();e.Modernizr=Modernizr}(window,document);;
/*!
 * Justified Gallery - v3.6.0
 * http://miromannino.github.io/Justified-Gallery/
 * Copyright (c) 2015 Miro Mannino
 * Licensed under the MIT license.
 */
!function(a){var b=function(b,c){this.settings=c,this.checkSettings(),this.imgAnalyzerTimeout=null,this.entries=null,this.buildingRow={entriesBuff:[],width:0,aspectRatio:0},this.lastAnalyzedIndex=-1,this.yield={every:2,flushed:0},this.border=c.border>=0?c.border:c.margins,this.maxRowHeight=this.retrieveMaxRowHeight(),this.suffixRanges=this.retrieveSuffixRanges(),this.offY=this.border,this.spinner={phase:0,timeSlot:150,$el:a('<div class="spinner"><span></span><span></span><span></span></div>'),intervalId:null},this.checkWidthIntervalId=null,this.galleryWidth=b.width(),this.$gallery=b};b.prototype.getSuffix=function(a,b){var c,d;for(c=a>b?a:b,d=0;d<this.suffixRanges.length;d++)if(c<=this.suffixRanges[d])return this.settings.sizeRangeSuffixes[this.suffixRanges[d]];return this.settings.sizeRangeSuffixes[this.suffixRanges[d-1]]},b.prototype.removeSuffix=function(a,b){return a.substring(0,a.length-b.length)},b.prototype.endsWith=function(a,b){return-1!==a.indexOf(b,a.length-b.length)},b.prototype.getUsedSuffix=function(a){for(var b in this.settings.sizeRangeSuffixes)if(this.settings.sizeRangeSuffixes.hasOwnProperty(b)){if(0===this.settings.sizeRangeSuffixes[b].length)continue;if(this.endsWith(a,this.settings.sizeRangeSuffixes[b]))return this.settings.sizeRangeSuffixes[b]}return""},b.prototype.newSrc=function(a,b,c){var d=a.match(this.settings.extension),e=null!=d?d[0]:"",f=a.replace(this.settings.extension,"");return f=this.removeSuffix(f,this.getUsedSuffix(f)),f+=this.getSuffix(b,c)+e},b.prototype.showImg=function(a,b){this.settings.cssAnimation?(a.addClass("entry-visible"),b&&b()):a.stop().fadeTo(this.settings.imagesAnimationDuration,1,b)},b.prototype.extractImgSrcFromImage=function(a){var b="undefined"!=typeof a.data("safe-src")?a.data("safe-src"):a.attr("src");return a.data("jg.originalSrc",b),b},b.prototype.imgFromEntry=function(a){var b=a.find("> img");return 0===b.length&&(b=a.find("> a > img")),0===b.length?null:b},b.prototype.captionFromEntry=function(a){var b=a.find("> .caption");return 0===b.length?null:b},b.prototype.displayEntry=function(b,c,d,e,f,g){b.width(e),b.height(g),b.css("top",d),b.css("left",c);var h=this.imgFromEntry(b);if(null!==h){h.css("width",e),h.css("height",f),h.css("margin-left",-e/2),h.css("margin-top",-f/2);var i=h.attr("src"),j=this.newSrc(i,e,f);h.one("error",function(){h.attr("src",h.data("jg.originalSrc"))});var k=function(){i!==j&&h.attr("src",j)};"skipped"===b.data("jg.loaded")?this.onImageEvent(i,a.proxy(function(){this.showImg(b,k),b.data("jg.loaded",!0)},this)):this.showImg(b,k)}else this.showImg(b);this.displayEntryCaption(b)},b.prototype.displayEntryCaption=function(b){var c=this.imgFromEntry(b);if(null!==c&&this.settings.captions){var d=this.captionFromEntry(b);if(null==d){var e=c.attr("alt");"undefined"==typeof e&&(e=b.attr("title")),"undefined"!=typeof e&&(d=a('<div class="caption">'+e+"</div>"),b.append(d),b.data("jg.createdCaption",!0))}null!==d&&(this.settings.cssAnimation||d.stop().fadeTo(0,this.settings.captionSettings.nonVisibleOpacity),this.addCaptionEventsHandlers(b))}else this.removeCaptionEventsHandlers(b)},b.prototype.onEntryMouseEnterForCaption=function(b){var c=this.captionFromEntry(a(b.currentTarget));this.settings.cssAnimation?c.addClass("caption-visible").removeClass("caption-hidden"):c.stop().fadeTo(this.settings.captionSettings.animationDuration,this.settings.captionSettings.visibleOpacity)},b.prototype.onEntryMouseLeaveForCaption=function(b){var c=this.captionFromEntry(a(b.currentTarget));this.settings.cssAnimation?c.removeClass("caption-visible").removeClass("caption-hidden"):c.stop().fadeTo(this.settings.captionSettings.animationDuration,this.settings.captionSettings.nonVisibleOpacity)},b.prototype.addCaptionEventsHandlers=function(b){var c=b.data("jg.captionMouseEvents");"undefined"==typeof c&&(c={mouseenter:a.proxy(this.onEntryMouseEnterForCaption,this),mouseleave:a.proxy(this.onEntryMouseLeaveForCaption,this)},b.on("mouseenter",void 0,void 0,c.mouseenter),b.on("mouseleave",void 0,void 0,c.mouseleave),b.data("jg.captionMouseEvents",c))},b.prototype.removeCaptionEventsHandlers=function(a){var b=a.data("jg.captionMouseEvents");"undefined"!=typeof b&&(a.off("mouseenter",void 0,b.mouseenter),a.off("mouseleave",void 0,b.mouseleave),a.removeData("jg.captionMouseEvents"))},b.prototype.prepareBuildingRow=function(a){var b,c,d,e,f,g=!0,h=0,i=this.galleryWidth-2*this.border-(this.buildingRow.entriesBuff.length-1)*this.settings.margins,j=i/this.buildingRow.aspectRatio,k=this.buildingRow.width/i>this.settings.justifyThreshold;if(a&&"hide"===this.settings.lastRow&&!k){for(b=0;b<this.buildingRow.entriesBuff.length;b++)c=this.buildingRow.entriesBuff[b],this.settings.cssAnimation?c.removeClass("entry-visible"):c.stop().fadeTo(0,0);return-1}for(a&&!k&&"nojustify"===this.settings.lastRow&&(g=!1),b=0;b<this.buildingRow.entriesBuff.length;b++)c=this.buildingRow.entriesBuff[b],d=c.data("jg.width")/c.data("jg.height"),g?(e=b===this.buildingRow.entriesBuff.length-1?i:j*d,f=j):(e=this.settings.rowHeight*d,f=this.settings.rowHeight),i-=Math.round(e),c.data("jg.jwidth",Math.round(e)),c.data("jg.jheight",Math.ceil(f)),(0===b||h>f)&&(h=f);return this.settings.fixedHeight&&h>this.settings.rowHeight&&(h=this.settings.rowHeight),{minHeight:h,justify:g}},b.prototype.clearBuildingRow=function(){this.buildingRow.entriesBuff=[],this.buildingRow.aspectRatio=0,this.buildingRow.width=0},b.prototype.flushRow=function(a){var b,c,d,e=this.settings,f=this.border;if(d=this.prepareBuildingRow(a),c=d.minHeight,a&&"hide"===e.lastRow&&-1===c)return void this.clearBuildingRow();this.maxRowHeight.percentage?this.maxRowHeight.value*e.rowHeight<c&&(c=this.maxRowHeight.value*e.rowHeight):this.maxRowHeight.value>0&&this.maxRowHeight.value<c&&(c=this.maxRowHeight.value);for(var g=0;g<this.buildingRow.entriesBuff.length;g++)b=this.buildingRow.entriesBuff[g],this.displayEntry(b,f,this.offY,b.data("jg.jwidth"),b.data("jg.jheight"),c),f+=b.data("jg.jwidth")+e.margins;this.$gallery.height(this.offY+c+this.border+(this.isSpinnerActive()?this.getSpinnerHeight():0)),(!a||c<=this.settings.rowHeight&&d.justify)&&(this.offY+=c+this.settings.margins,this.clearBuildingRow(),this.$gallery.trigger("jg.rowflush"))},b.prototype.checkWidth=function(){this.checkWidthIntervalId=setInterval(a.proxy(function(){var a=parseInt(this.$gallery.width(),10);this.galleryWidth!==a&&(this.galleryWidth=a,this.rewind(),this.startImgAnalyzer(!0))},this),this.settings.refreshTime)},b.prototype.isSpinnerActive=function(){return null!=this.spinner.intervalId},b.prototype.getSpinnerHeight=function(){return this.spinner.$el.innerHeight()},b.prototype.stopLoadingSpinnerAnimation=function(){clearInterval(this.spinner.intervalId),this.spinner.intervalId=null,this.$gallery.height(this.$gallery.height()-this.getSpinnerHeight()),this.spinner.$el.detach()},b.prototype.startLoadingSpinnerAnimation=function(){var a=this.spinner,b=a.$el.find("span");clearInterval(a.intervalId),this.$gallery.append(a.$el),this.$gallery.height(this.offY+this.getSpinnerHeight()),a.intervalId=setInterval(function(){a.phase<b.length?b.eq(a.phase).fadeTo(a.timeSlot,1):b.eq(a.phase-b.length).fadeTo(a.timeSlot,0),a.phase=(a.phase+1)%(2*b.length)},a.timeSlot)},b.prototype.rewind=function(){this.lastAnalyzedIndex=-1,this.offY=this.border,this.clearBuildingRow()},b.prototype.hideBuildingRowImages=function(){for(var a=0;a<this.buildingRow.entriesBuff.length;a++)this.settings.cssAnimation?this.buildingRow.entriesBuff[a].removeClass("entry-visible"):this.buildingRow.entriesBuff[a].stop().fadeTo(0,0)},b.prototype.updateEntries=function(b){return this.entries=this.$gallery.find(this.settings.selector).toArray(),0===this.entries.length?!1:(this.settings.filter?this.modifyEntries(this.filterArray,b):this.modifyEntries(this.resetFilters,b),a.isFunction(this.settings.sort)?this.modifyEntries(this.sortArray,b):this.settings.randomize&&this.modifyEntries(this.shuffleArray,b),!0)},b.prototype.insertToGallery=function(b){var c=this;a.each(b,function(){a(this).appendTo(c.$gallery)})},b.prototype.shuffleArray=function(a){var b,c,d;for(b=a.length-1;b>0;b--)c=Math.floor(Math.random()*(b+1)),d=a[b],a[b]=a[c],a[c]=d;return this.insertToGallery(a),a},b.prototype.sortArray=function(a){return a.sort(this.settings.sort),this.insertToGallery(a),a},b.prototype.resetFilters=function(b){for(var c=0;c<b.length;c++)a(b[c]).removeClass("jg-filtered");return b},b.prototype.filterArray=function(b){var c=this.settings;return"string"===a.type(c.filter)?b.filter(function(b){var d=a(b);return d.is(c.filter)?(d.removeClass("jg-filtered"),!0):(d.addClass("jg-filtered"),!1)}):a.isFunction(c.filter)?b.filter(c.filter):void 0},b.prototype.modifyEntries=function(a,b){var c=b?this.entries.splice(this.lastAnalyzedIndex+1,this.entries.length-this.lastAnalyzedIndex-1):this.entries;c=a.call(this,c),this.entries=b?this.entries.concat(c):c},b.prototype.destroy=function(){clearInterval(this.checkWidthIntervalId),a.each(this.entries,a.proxy(function(b,c){var d=a(c);d.css("width",""),d.css("height",""),d.css("top",""),d.css("left",""),d.data("jg.loaded",void 0),d.removeClass("jg-entry");var e=this.imgFromEntry(d);e.css("width",""),e.css("height",""),e.css("margin-left",""),e.css("margin-top",""),e.attr("src",e.data("jg.originalSrc")),e.data("jg.originalSrc",void 0),this.removeCaptionEventsHandlers(d);var f=this.captionFromEntry(d);d.data("jg.createdCaption")?(d.data("jg.createdCaption",void 0),null!=f&&f.remove()):null!=f&&f.fadeTo(0,1)},this)),this.$gallery.css("height",""),this.$gallery.removeClass("justified-gallery"),this.$gallery.data("jg.controller",void 0)},b.prototype.analyzeImages=function(b){for(var c=this.lastAnalyzedIndex+1;c<this.entries.length;c++){var d=a(this.entries[c]);if(d.data("jg.loaded")===!0||"skipped"===d.data("jg.loaded")){var e=this.galleryWidth-2*this.border-(this.buildingRow.entriesBuff.length-1)*this.settings.margins,f=d.data("jg.width")/d.data("jg.height");if(e/(this.buildingRow.aspectRatio+f)<this.settings.rowHeight&&(this.flushRow(!1),++this.yield.flushed>=this.yield.every))return void this.startImgAnalyzer(b);this.buildingRow.entriesBuff.push(d),this.buildingRow.aspectRatio+=f,this.buildingRow.width+=f*this.settings.rowHeight,this.lastAnalyzedIndex=c}else if("error"!==d.data("jg.loaded"))return}this.buildingRow.entriesBuff.length>0&&this.flushRow(!0),this.isSpinnerActive()&&this.stopLoadingSpinnerAnimation(),this.stopImgAnalyzerStarter(),this.$gallery.trigger(b?"jg.resize":"jg.complete")},b.prototype.stopImgAnalyzerStarter=function(){this.yield.flushed=0,null!==this.imgAnalyzerTimeout&&clearTimeout(this.imgAnalyzerTimeout)},b.prototype.startImgAnalyzer=function(a){var b=this;this.stopImgAnalyzerStarter(),this.imgAnalyzerTimeout=setTimeout(function(){b.analyzeImages(a)},.001)},b.prototype.onImageEvent=function(b,c,d){if(c||d){var e=new Image,f=a(e);c&&f.one("load",function(){f.off("load error"),c(e)}),d&&f.one("error",function(){f.off("load error"),d(e)}),e.src=b}},b.prototype.init=function(){var b=!1,c=!1,d=this;a.each(this.entries,function(e,f){var g=a(f),h=d.imgFromEntry(g);if(g.addClass("jg-entry"),g.data("jg.loaded")!==!0&&"skipped"!==g.data("jg.loaded"))if(null!==d.settings.rel&&g.attr("rel",d.settings.rel),null!==d.settings.target&&g.attr("target",d.settings.target),null!==h){var i=d.extractImgSrcFromImage(h);if(h.attr("src",i),d.settings.waitThumbnailsLoad===!1){var j=parseInt(h.attr("width"),10),k=parseInt(h.attr("height"),10);if(!isNaN(j)&&!isNaN(k))return g.data("jg.width",j),g.data("jg.height",k),g.data("jg.loaded","skipped"),c=!0,d.startImgAnalyzer(!1),!0}g.data("jg.loaded",!1),b=!0,d.isSpinnerActive()||d.startLoadingSpinnerAnimation(),d.onImageEvent(i,function(a){g.data("jg.width",a.width),g.data("jg.height",a.height),g.data("jg.loaded",!0),d.startImgAnalyzer(!1)},function(){g.data("jg.loaded","error"),d.startImgAnalyzer(!1)})}else g.data("jg.loaded",!0),g.data("jg.width",g.width()|g.css("width")|1),g.data("jg.height",g.height()|g.css("height")|1)}),b||c||this.startImgAnalyzer(!1),this.checkWidth()},b.prototype.checkOrConvertNumber=function(b,c){if("string"===a.type(b[c])&&(b[c]=parseFloat(b[c])),"number"!==a.type(b[c]))throw c+" must be a number";if(isNaN(b[c]))throw"invalid number for "+c},b.prototype.checkSizeRangesSuffixes=function(){if("object"!==a.type(this.settings.sizeRangeSuffixes))throw"sizeRangeSuffixes must be defined and must be an object";var b=[];for(var c in this.settings.sizeRangeSuffixes)this.settings.sizeRangeSuffixes.hasOwnProperty(c)&&b.push(c);for(var d={0:""},e=0;e<b.length;e++)if("string"===a.type(b[e]))try{var f=parseInt(b[e].replace(/^[a-z]+/,""),10);d[f]=this.settings.sizeRangeSuffixes[b[e]]}catch(g){throw"sizeRangeSuffixes keys must contains correct numbers ("+g+")"}else d[b[e]]=this.settings.sizeRangeSuffixes[b[e]];this.settings.sizeRangeSuffixes=d},b.prototype.retrieveMaxRowHeight=function(){var b={};if("string"===a.type(this.settings.maxRowHeight))this.settings.maxRowHeight.match(/^[0-9]+%$/)?(b.value=parseFloat(this.settings.maxRowHeight.match(/^([0-9])+%$/)[1])/100,b.percentage=!1):(b.value=parseFloat(this.settings.maxRowHeight),b.percentage=!0);else{if("number"!==a.type(this.settings.maxRowHeight))throw"maxRowHeight must be a number or a percentage";b.value=this.settings.maxRowHeight,b.percentage=!1}if(isNaN(b.value))throw"invalid number for maxRowHeight";return b.percentage?b.value<100&&(b.value=100):b.value>0&&b.value<this.settings.rowHeight&&(b.value=this.settings.rowHeight),b},b.prototype.checkSettings=function(){if(this.checkSizeRangesSuffixes(),this.checkOrConvertNumber(this.settings,"rowHeight"),this.checkOrConvertNumber(this.settings,"margins"),this.checkOrConvertNumber(this.settings,"border"),"nojustify"!==this.settings.lastRow&&"justify"!==this.settings.lastRow&&"hide"!==this.settings.lastRow)throw'lastRow must be "nojustify", "justify" or "hide"';if(this.checkOrConvertNumber(this.settings,"justifyThreshold"),this.settings.justifyThreshold<0||this.settings.justifyThreshold>1)throw"justifyThreshold must be in the interval [0,1]";if("boolean"!==a.type(this.settings.cssAnimation))throw"cssAnimation must be a boolean";if("boolean"!==a.type(this.settings.captions))throw"captions must be a boolean";if(this.checkOrConvertNumber(this.settings.captionSettings,"animationDuration"),this.checkOrConvertNumber(this.settings.captionSettings,"visibleOpacity"),this.settings.captionSettings.visibleOpacity<0||this.settings.captionSettings.visibleOpacity>1)throw"captionSettings.visibleOpacity must be in the interval [0, 1]";if(this.checkOrConvertNumber(this.settings.captionSettings,"nonVisibleOpacity"),this.settings.captionSettings.nonVisibleOpacity<0||this.settings.captionSettings.nonVisibleOpacity>1)throw"captionSettings.nonVisibleOpacity must be in the interval [0, 1]";if("boolean"!==a.type(this.settings.fixedHeight))throw"fixedHeight must be a boolean";if(this.checkOrConvertNumber(this.settings,"imagesAnimationDuration"),this.checkOrConvertNumber(this.settings,"refreshTime"),"boolean"!==a.type(this.settings.randomize))throw"randomize must be a boolean";if("string"!==a.type(this.settings.selector))throw"selector must be a string";if(this.settings.sort!==!1&&!a.isFunction(this.settings.sort))throw"sort must be false or a comparison function";if(this.settings.filter!==!1&&!a.isFunction(this.settings.sort)&&"string"!==a.type(this.settings.filter))throw"filter must be false, a string or a filter function"},b.prototype.retrieveSuffixRanges=function(){var a=[];for(var b in this.settings.sizeRangeSuffixes)this.settings.sizeRangeSuffixes.hasOwnProperty(b)&&a.push(parseInt(b,10));return a.sort(function(a,b){return a>b?1:b>a?-1:0}),a},b.prototype.updateSettings=function(b){this.settings=a.extend({},this.settings,b),this.checkSettings(),this.border=this.settings.border>=0?this.settings.border:this.settings.margins,this.maxRowHeight=this.retrieveMaxRowHeight(),this.suffixRanges=this.retrieveSuffixRanges()},a.fn.justifiedGallery=function(c){return this.each(function(d,e){var f=a(e);f.addClass("justified-gallery");var g=f.data("jg.controller");if("undefined"==typeof g){if("undefined"!=typeof c&&null!==c&&"object"!==a.type(c))throw"The argument must be an object";g=new b(f,a.extend({},a.fn.justifiedGallery.defaults,c)),f.data("jg.controller",g)}else if("norewind"===c)g.hideBuildingRowImages();else{if("destroy"===c)return void g.destroy();g.updateSettings(c),g.rewind()}g.updateEntries("norewind"===c)&&g.init()})},a.fn.justifiedGallery.defaults={sizeRangeSuffixes:{},rowHeight:120,maxRowHeight:"200%",margins:1,border:-1,lastRow:"nojustify",justifyThreshold:.75,fixedHeight:!1,waitThumbnailsLoad:!0,captions:!0,cssAnimation:!1,imagesAnimationDuration:500,captionSettings:{animationDuration:500,visibleOpacity:.7,nonVisibleOpacity:0},rel:null,target:null,extension:/\.[^.\\/]+$/,refreshTime:100,randomize:!1,sort:!1,filter:!1,selector:"> a, > div:not(.spinner)"}}(jQuery);;
