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
      this.width = this.$element.width();
      this.height = this.$element.height();
      this.maxWidthCenter = this.maxWidth / 2;
      this.maxHeightCenter = this.maxHeight / 2;
      this.options = $.extend({}, defaults, options);
      this.init();
    };

    Plugin.prototype.init = function() {
      if (this.width > this.maxWidth && this.height > this.maxHeight) {
        //当宽高都超过外框时候，使用了移动中心点来达到图片居中，防止图片变形
        this.overflow();
      } else if (this.width > this.maxWidth && this.height < this.maxHeight) {
        //当高超出的时候将高设置成框高，然后移动宽到中心点
        this.overHight();
      } else if (this.width < this.maxWidth && this.height > this.maxHeight) {
        this.overWidth();
      } else if (this.width < this.maxWidth && this.height < this.maxHeight) {
        this.tooSmall();
      }
    };

    Plugin.prototype.overflow = function() {
      var centerWidth = this.width / 2;
      var centerHeight = this.height / 2;
      var maxCenterWidth = this.maxWidth / 2;
      var maxCenterHeight = this.maxHeight / 2;
      this.$element.css({
        'position': 'absolute',
        'left': -(centerWidth - maxCenterWidth),
        'top': -(centerHeight - maxCenterHeight)
      })
    };
    Plugin.prototype.overHight = function() {
      this.$element.css('height', this.maxHeight);
      var centerWidth = $(this.$element).width() / 2;
      var maxCenterWidth = this.maxWidth / 2;
      this.$element.css({
        'position': 'absolute',
        'left': -(centerWidth - maxCenterWidth)
      })
    };
    Plugin.prototype.overWidth = function() {
      this.$element.css('width', this.maxWidth);
      var centerHeight = $(this.$element).height() / 2;
      var maxCenterHeight = this.maxHeight / 2;
      this.$element.css({
        'position': 'absolute',
        'top': -(centerHeight - maxCenterHeight)
      })
    };
    Plugin.prototype.tooSmall = function() {
      var maxCenterWidth = this.maxWidth / 2;
      var maxCenterHeight = this.maxHeight / 2;
      if(this.maxHeight - this.height > this.maxWidth - this.width){
        this.$element.css('height',this.maxHeight);
        var centerWidth = $(this.$element).width() / 2;
        this.$element.css({
          'position':'absolute',
          'left':  -(centerWidth - maxCenterWidth)
        });

      }else{
        this.$element.css('width',this.maxHeight);
        var centerHeight = this.height / 2;
        this.$element.css({
          'position':'absolute',
          'top':  -(centerHeight - maxCenterHeight)
        });
      }
    };
    /*
     * 分成多种情况
     * 1.当图片宽高小于显示框时，应该先判断宽高哪个更远，宽里得远就扩大宽然后去掉多出来的高，反之扩大高去掉多余宽
     * 2.当图片宽高大于显示框的时候，直接将图片移动到图中心点
     */

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
    maxWidth: 700,
    maxHeight: 700
  });
