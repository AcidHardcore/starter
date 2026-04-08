(function($){
  $(document).ready(function(){

    $('.people').once('sw-people').each(function() {
      const m = new PeopleSlider($(this));
    });

  });
})(jQuery);

class PeopleSlider {

  constructor($w){
    const _this = this;

    this.$w = $w;

    // Main slider
    this.$swiper = this.$w;
    this.swiper = new Swiper(this.$swiper.get(0), {
      loop: false,
      slidesPerView: 'auto',
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

    this.$w.data('sw-people-slider', this);
  }

}
