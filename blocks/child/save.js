import {
  RichText,
  useBlockProps
} from '@wordpress/block-editor'

export default function save({ attributes }) {
  const {
    html,
  } = attributes

  const blockProps = useBlockProps.save({
    className: 'child swiper-slide',
  })

  return (
    <div {...blockProps}>
      <RichText.Content
        tagName="div"
        className="editor"
        value={html}
      />
    </div>
  )
}
