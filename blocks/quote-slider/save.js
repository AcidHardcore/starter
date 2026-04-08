import {
  useBlockProps,
  useInnerBlocksProps,
} from '@wordpress/block-editor'
import clsx from 'clsx'

export default function save ({ attributes, className }) {
  const { margin } = attributes

  const blockProps = useBlockProps.save({
    className: clsx(
      'quotes-slider',
      className
    ),
  })

  const innerBlockProps = useInnerBlocksProps.save({
    className: 'quotes-slider__slider swiper-wrapper',
  })

  return (
    <div {...blockProps} >
      <div className="swiper">
        <div {...innerBlockProps} />
      </div>
      <div className="swiper__controls swiper__controls--middle">

        <div className="swiper__pagination"></div>

        <div className="swiper__arrows">
          <div className="swiper__arrow swiper__arrow--blue swiper__arrow--left">
            <i className="icon icon--arrow-left"></i>
          </div>
          <div className="swiper__arrow swiper__arrow--blue swiper__arrow--right">
            <i className="icon icon--arrow-right"></i>
          </div>
        </div>

      </div>
    </div>
  )
}
