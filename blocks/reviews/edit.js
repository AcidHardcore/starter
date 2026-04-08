import './editor.scss'
import {
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls
} from '@wordpress/block-editor'

import {
  Notice,
  PanelBody,
  PanelRow,
  SelectControl,
} from '@wordpress/components'

import clsx from 'clsx'


export default function Edit ({ attributes, setAttributes, className, style }) {

  const { margin } = attributes

  const blockProps = useBlockProps({
    className: clsx(
      className,
      'reviews',
      margin
    ),
    style,
  })

  const innerBlockProps = useInnerBlocksProps(
    { className: 'reviews__slider swiper-wrapper' },
    {
      allowedBlocks: ['vit/review'],
      template: [
        ['vit/review', { quote: 'Lorem ipsum dolor sit amet' }],
      ],
      orientation: 'horizontal'
    }
  )

  return (
    <>
      <InspectorControls>
        <PanelBody title="Reviews Settings" initialOpen={true}>
          <Notice status="info" isDismissible={ false }>
          To add Reviews, please use the "Review" block inside this block by clicking the "+" button.
        </Notice>
          <PanelRow>Spacing</PanelRow>
          <SelectControl
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
