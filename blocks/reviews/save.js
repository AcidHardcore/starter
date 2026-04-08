import {
  useBlockProps,
  useInnerBlocksProps,
} from '@wordpress/block-editor'
import clsx from 'clsx'

export default function save ({ attributes, className }) {
  const { margin } = attributes

  const blockProps = useBlockProps.save({
    className: clsx(
      'reviews',
      margin,
      className
    ),
  })

  const innerBlockProps = useInnerBlocksProps.save({
    className: 'reviews__slider swiper-wrapper',
  })

  return (
    <div {...blockProps} >
        <div {...innerBlockProps} />

      <div className="swiper__controls">

        <div className="swiper__pagination"></div>

        <div className="swiper__arrows">
          <div className="swiper__arrow swiper__arrow--left">
            <i className="icon icon--arrow-left"></i>
          </div>
          <div className="swiper__arrow swiper__arrow--right">
            <i className="icon icon--arrow-right"></i>
          </div>
        </div>

      </div>
    </div>
  )
}
