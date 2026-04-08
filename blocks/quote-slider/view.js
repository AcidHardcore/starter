(function($){
  $(document).ready(function(){

    $('.quotes-slider').once('sw-quotes-slider').each(function() {
      const m = new QuotesSlider($(this));
    });

  });
})(jQuery);

class QuotesSlider {

  constructor($w){
    const _this = this;

    this.$w = $w;

    // Main slider
    this.$swiper = this.$w.find('.swiper');
    this.swiper = new Swiper(this.$swiper.get(0), {
      loop: true,
      slidesPerView: 1,
      speed: 500,
      followFinger: true,
      navigation: {
        nextEl: this.$w.find('.swiper__arrow--right').get(0),
        prevEl: this.$w.find('.swiper__arrow--left').get(0),
      },
      pagination: {
        el: this.$w.find('.swiper__pagination').get(0),
        type: 'bullets',
      },
    });

    this.$w.data('sw-quotes-slider', this);
  }

}
