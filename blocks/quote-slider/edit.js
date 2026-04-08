import './editor.scss'

import {
  useBlockProps, useInnerBlocksProps,
} from '@wordpress/block-editor'

import clsx from 'clsx'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {WPElement} Element to render.
 */

export default function Edit({ className, style }) {
  const blockProps = useBlockProps({
    className: clsx(
      className,
      'quotes-slider',
    ),
    style,
  })

  const innerBlockProps = useInnerBlocksProps(
    { className: 'quotes-slider__slider' },
    {
      allowedBlocks: ['vit/quote-slide'],
      template: [
        ['vit/quote-slide', { quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.' }],
      ],
      orientation: 'horizontal'
    }
  )

  return (
    <div {...blockProps} >
        <div {...innerBlockProps} />
    </div>
  )
}
