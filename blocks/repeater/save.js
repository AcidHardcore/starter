import {
  useBlockProps,
  useInnerBlocksProps,
  RichText,
} from '@wordpress/block-editor'


export default function save({ attributes }) {
  const { repeater = [], type = 'default' } = attributes

  const blockProps = useBlockProps.save({
    className: `repeater repeater--${type}`,
  })

  const innerBlockProps = useInnerBlocksProps.save({
    className: 'repeater__head',
  })

  return (
    <section {...blockProps}>
      <div className="container">
        <div {...innerBlockProps} />

        {repeater.length > 0 && (
          <div className="repeater__cont">
            {repeater.map((item, index) => (
              <div
                key={item.id}
                className="repeater__item"
                data-scroll-item="true"
                data-scroll-animation="fadeUp"
                data-scroll-delay={index * 0.025}
              >
                <div className="repeater__heading">
                  <div className="repeater__icon">
                    {item.image_url && item.image_id && (
                      <div className="image-container">
                        <img
                          src={item.image_url}
                          alt={item.image_alt}
                          className={`wp-image-${item.image_id}`}
                          {...(item.image_srcset && { srcSet: item.image_srcset })}
                          {...(item.image_sizes && { sizes: item.image_sizes })}
                          {...(item.image_width && { width: item.image_width })}
                          {...(item.image_height && { height: item.image_height })}
                          loading={item.image_loading}
                          decoding="async"
                        />
                      </div>
                    )}
                  </div>
                  <RichText.Content
                    tagName="h4"
                    value={item.title}
                  />
                </div>
                <RichText.Content
                  value={item.text}
                  tagName="p"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
