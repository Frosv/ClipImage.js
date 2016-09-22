  //cut img
  (function($) {
    var pluginName = 'ClipImage';
    var defaults = {};

    function Plugin(element, options) {
      this.$window = $(window);
      this.$document = $(document);
      this.$element = $(element);
      this.maxWidth = options.maxWidth;
      this.maxHeight = options.maxHeight;
      this.width = this.$element.width();//当前图片宽，非100%之后
      this.height = this.$element.height();//当前图片高，非100%之后
      this.maxWidthCenter = this.maxWidth/2;
      this.maxHeightCenter = this.maxHeight/2;
      this.options = $.extend({}, defaults, options);
      this.init();
    };

    Plugin.prototype.init = function() {
      if(this.width > this.maxWidth && this.height > this.maxHeight){
        this.$element.css('width','100%');
        console.log(this.$element.height());
        var moveHeight = -((this.$element.height()/2) - this.maxHeightCenter);
        this.$element.css({
          'position':'absolute',
          'top': moveHeights
        });
      }
    };

    $.fn[pluginName] = function(options) {
      var args = Array.prototype.slice.call(arguments, 1);
      return this.each(function() {
        var $this = $(this),
          data = $this.data('plugin_' + pluginName);
        if (!data) {
          $this.data('plugin_' + pluginName, (data = new Plugin(this, options)));
        };
        if (typeof options === 'string') {
          data[options].apply(data, args);
        };
      });
    };

  })(jQuery);

  $('.js-cut-img img').refitImage({
    maxWidth: 264,
    maxHeight: 200
  });


