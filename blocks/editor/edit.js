import './editor.scss'

import {
  useBlockProps,
  useInnerBlocksProps
}
from '@wordpress/block-editor'

import clsx from 'clsx'

export default function ({ attributes, setAttributes, style, className }) {



  const innerBlockProps = useInnerBlocksProps(
    { className: "editor__content" },
    {
      allowedBlocks: ["core/heading", "core/paragraph", "core/image", "core/button"],
      template: [
        [
          'core/paragraph', {
          placeholder: 'Enter a paragraph...'
        }
        ],
      ]
    }
  );

  const blockProps = useBlockProps({
    className: clsx(className, 'editor'),
    style,
  });

  return (
    <>
      <div {...blockProps} >
        <div {...innerBlockProps} />
      </div>
    </>
  )

}
