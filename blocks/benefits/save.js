
import {
  useBlockProps,
  useInnerBlocksProps,
  RichText,
} from '@wordpress/block-editor'


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
  const { benefits = [], type = 'default' } = attributes

  const blockProps = useBlockProps.save({
    className: `benefits benefits--${type}`,
  })

  const innerBlockProps = useInnerBlocksProps.save({
    className: 'benefits__head',
  })

  return (
    <section {...blockProps}>
      <div className="container">
        <div {...innerBlockProps} />

        {benefits.length > 0 && (
          <div className="benefits__cont">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefits__item"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="benefits__heading">
                  <div className="benefits__icon">
                    {benefit.image_url && benefit.image_id && (
                      <div className="image-container">
                        <img src={benefit.image_url} alt={benefit.title || 'benefit icon'} />
                      </div>
                    )}
                  </div>
                  <RichText.Content
                    tagName="span"
                    value={benefit.title}
                  />
                </div>
                <RichText.Content
                  value={benefit.text}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
