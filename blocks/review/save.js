import {
  RichText,
  useBlockProps
} from '@wordpress/block-editor'
import { AuthorSave
} from '../../src/components/AuthorSave.js'

export default function save({ attributes }) {
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
    html,
    name
  } = attributes

  const blockProps = useBlockProps.save({
    className: 'review swiper-slide',
  })

  return (
    <div {...blockProps}>
      <RichText.Content
        tagName="div"
        className="editor"
        value={html}
      />

      <AuthorSave
        image_url={image_url}
        image_id={image_id}
        image_alt={image_alt}
        image_srcset={image_srcset}
        image_sizes={image_sizes}
        image_width={image_width}
        image_height={image_height}
        image_loading={image_loading}
        name={name}
        title={title}
        additionalClasses={["review__author"]}
      />
    </div>
  )
}
