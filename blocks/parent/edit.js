import './editor.scss'
import {
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls
} from '@wordpress/block-editor'

import {
  Notice,
  PanelBody,
  SelectControl,
} from '@wordpress/components'

import clsx from 'clsx'


export default function Edit ({ attributes, setAttributes, className, style }) {

  const { margin } = attributes

  const blockProps = useBlockProps({
    className: clsx(
      className,
      'parent',
      margin
    ),
    style,
  })

  const innerBlockProps = useInnerBlocksProps(
    { className: 'parent__slider swiper-wrapper' },
    {
      allowedBlocks: ['vit/child'],
      template: [
        ['vit/child', { quote: 'Lorem ipsum dolor sit amet' }],
      ],
      orientation: 'horizontal'
    }
  )

  return (
    <>
      <InspectorControls>
        <PanelBody title="Parent Settings" initialOpen={true}>
          <Notice status="info" isDismissible={ false }>
          To add Parent, please use the "Child" block inside this block by clicking the "+" button.
        </Notice>
          <SelectControl
              label="Spacing"
            onChange={(val) => setAttributes({ margin: val })}
            value={margin}
            options={[
              { label: '— Select —', value: '' },
              { label: 'No Bottom Spacing', value: 'mb0' },
            ]}
            __next40pxDefaultSize
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps} >

        <div {...innerBlockProps} />

        <div className="swiper__controls">

          <div className="swiper__pagination"></div>

          <div className="swiper__arrows">
            <div className="swiper__arrow swiper__arrow--left">
              <i className="icon icon--arrow-left"></i>
            </div>
            <div className="swiper__arrow swiper__arrow--right">
              <i className="icon icon--arrow-right"></i>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
