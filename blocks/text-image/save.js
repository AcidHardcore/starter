import {
  useBlockProps,
  useInnerBlocksProps,
}
  from '@wordpress/block-editor'

export default function save ({attributes}) {
  const {
    align,
    image_url,
    image_id,
    image_alt,
    image_width,
    image_height,
    image_srcset,
    image_sizes,
    image_loading,
  } = attributes

  const blockProps = useBlockProps.save({
    className: `text-image text-image--${align}`,
  })

  const innerBlockProps = useInnerBlocksProps.save({
    className: 'text-image__content',
  })

  const animationType = align === 'left' ? 'fadeRight' : 'fadeLeft'

  return (
    <div {...blockProps} data-scroll-section={true}>
      <div className="text-image__grid">
      <div {...innerBlockProps} />

        {image_url && image_id && (
          <div
            className="image-container"
            data-scroll-item="true"
            data-scroll-animation={animationType}
          >
            <img
              src={image_url}
              alt={image_alt}
              className={`wp-image-${image_id}`}
              srcSet={image_srcset}
              sizes={image_sizes}
              width={image_width}
              height={image_height}
              loading={image_loading}
              decoding="async"
            />
          </div>
        )}

      </div>
    </div>
  )
}
