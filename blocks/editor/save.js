import {
  useBlockProps,
  useInnerBlocksProps,
}
  from '@wordpress/block-editor'

export default function save () {
  const blockProps = useBlockProps.save({
    className: `editor`,
  })

  const innerBlockProps = useInnerBlocksProps.save()

  return (
    <div {...blockProps}>
      <div {...innerBlockProps}></div>
    </div>
  )
}
