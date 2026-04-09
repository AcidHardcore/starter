import {
  useBlockProps,
  InspectorControls,
  RichText
} from '@wordpress/block-editor'

import {
  PanelBody,
  TextareaControl
} from '@wordpress/components'


import './editor.scss'
import clsx from 'clsx'

export default function Edit ({ attributes, setAttributes, className, style }) {

  const {
    html
  } = attributes

  const blockProps = useBlockProps({
    className: clsx(
      className,
      'child swiper-slide'
    ),
    style
  })

  return (
    <>
        <InspectorControls group="settings">
        <PanelBody>
          <TextareaControl
              label="HTML"
            value={html}
            onChange={(val) => setAttributes({ html: val })}
            placeholder={"Add item text…"}
            __next40pxDefaultSize
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>

        <RichText
          tagName="div"
          allowedFormats={[]}
          value={html}
          onChange={(html) => setAttributes({ html })}
          placeholder="This is the copy"
        />
      </div>
    </>
  )
}
