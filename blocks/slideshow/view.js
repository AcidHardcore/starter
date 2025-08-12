import { Swiper } from 'swiper'
import {Navigation, Pagination} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/bundle'
import './swiper.scss'


document.addEventListener('DOMContentLoaded', function () {
  // Find all slideshow elements
  const slideshows = document.querySelectorAll('.slideshow')

  slideshows.forEach(slideshow => {
    const sliderElement = slideshow.querySelector('.slideshow__slider')
    const interval = slideshow.dataset.interval || 3

    if (sliderElement) {
      const slider = new Swiper(sliderElement, {
        modules: [Navigation, Pagination],
        spaceBetween: 30,
        loop: true, // Enable loop for better autoplay experience
        autoplay: {
          delay: parseInt(interval) * 1000,
          disableOnInteraction: false,
        },
        pagination: {
          el: slideshow.querySelector('.swiper-pagination'),
          clickable: true,
        },
        navigation: {
          nextEl: slideshow.querySelector('.swiper-button-next'),
          prevEl: slideshow.querySelector('.swiper-button-prev'),
        },
      })
    }
  })
})
