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
      this.width = this.$element.width(); //当前图片宽，非100%之后
      this.height = this.$element.height(); //当前图片高，非100%之后
      this.maxWidthCenter = this.maxWidth / 2;
      this.maxHeightCenter = this.maxHeight / 2;
      this.options = $.extend({}, defaults, options);
      this.init();
    };

    Plugin.prototype.init = function() {
      this.moveHeightWidth();
    };
    /*
     * 分成多种情况
     * 1.当图片宽高小于显示框时，应该先判断宽高哪个更远，宽里得远就扩大宽然后去掉多出来的高，反之扩大高去掉多余宽
     * 2.当图片宽高大于显示框的时候，判断宽高哪个远，近的拉近然后去掉多余的
     */
    Plugin.prototype.moveHeightWidth = function() {

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

  $('.img-box img').ClipImage({
    maxWidth: 200,
    maxHeight: 300
  });
