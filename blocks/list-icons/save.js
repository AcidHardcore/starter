import {
  useBlockProps,
  useInnerBlocksProps
} from '@wordpress/block-editor'

import clsx from 'clsx'

export default function save ({ attributes, className }) {
  const {

  } = attributes

  const blockProps = useBlockProps.save({
    className: clsx(
      className
    ),
  })

  const innerBlockProps = useInnerBlocksProps.save(
    {
      className: clsx(
        'list-icons',
        'wow-sync',
      )
    }
  )

  return (
    <div {...blockProps}>
      <div {...innerBlockProps} />
    </div>
  )
}
