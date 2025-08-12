import {
  useBlockProps,
  useInnerBlocksProps,
} from '@wordpress/block-editor'

export default function save({ attributes }) {
  const { interval } = attributes
  const blockProps = useBlockProps.save({
    className: 'slideshow',
  })

  const innerBlockProps = useInnerBlocksProps.save({
    className: 'swiper-wrapper',
  })

  return (
    <section {...blockProps} data-scroll-section={true} data-interval={interval}>
      <div className="swiper slideshow__slider">
        <div {...innerBlockProps} />
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-pagination"></div>
      </div>
    </section>
  )
}
