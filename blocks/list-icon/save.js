import {
  RichText,
  useBlockProps,
} from '@wordpress/block-editor'

import clsx from 'clsx'

export default function save ({ attributes, className }) {

  const {
    title,
    text,
    isWow,
    wowDelay = 0.05,
    image_url,
    image_id,
    image_alt,
    image_srcset,
    image_sizes,
    image_width,
    image_height,
    image_loading,
    image_mime,
    svg_content,
  } = attributes

  const blockProps = useBlockProps.save({
    className: clsx(
      'list-icons__item',
      isWow && 'wow--in-up',
      className
    ),
    'data-wow-delay': wowDelay
  })

  const isSVG = image_mime === 'image/svg+xml' ||
    image_url?.toLowerCase().endsWith('.svg')

  return (
    <div {...blockProps}>

      <div className="list-icons__icon">
        {image_url && image_id && (
          <>
            {isSVG && svg_content ? (
              <div
                className="inline-svg"
                dangerouslySetInnerHTML={{ __html: svg_content }}
              />
            ) : (
              <img
                src={image_url}
                alt={image_alt || ''}
                className={`wp-image-${image_id}`}
                {...(image_srcset && { srcSet: image_srcset })}
                {...(image_sizes && { sizes: image_sizes })}
                {...(image_width && { width: image_width })}
                {...(image_height && { height: image_height })}
                loading={image_loading}
                decoding="async"
              />
            )}
          </>
        )}
      </div>
      <div className="list-icons__content">
        <RichText.Content
          value={title}
          tagName="h3"
          className="bold green-dark as-h6"
        />

        <RichText.Content
          value={text}
          tagName="div"
          className="editor editor--small"
        />
      </div>

    </div>
  )
}
