import {
  RichText,
  useBlockProps,
} from '@wordpress/block-editor'

export default function save({attributes}) {
  const {
    image_url,
    image_id,
    image_alt,
    image_width,
    image_height,
    image_srcset,
    image_sizes,
    image_loading,
    title,
    html
  } = attributes
  const blockProps = useBlockProps.save({
    className: 'swiper-slide slide',
  })



  return (
    <div {...blockProps}>
      {image_url && image_id && (
        <div
          className="image-container"
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
          <RichText.Content
            tagName="h4"
            value={title}
          />
          <RichText.Content
            tagName="p"
            value={html}
          />
        </div>
      )}
    </div>
  )
}
