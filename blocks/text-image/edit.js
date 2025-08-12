import './editor.scss'

import {
  useBlockProps,
  useInnerBlocksProps,
  MediaPlaceholder,
  InspectorControls
} from '@wordpress/block-editor'

import {
  PanelBody,
  PanelRow,
  SelectControl
} from "@wordpress/components";

import {
  Icon,
  trash
}
  from '@wordpress/icons'

import clsx from 'clsx'
import { EditorImage } from '../../src/components/EditorImage'

export default function ({ attributes, setAttributes, className, style }) {
  const {
    align,
    image_url,
    image_id,
    image_alt,
    image_srcset,
    image_sizes,
    image_width,
    image_height,
    image_loading
  } = attributes
  const innerBlockProps = useInnerBlocksProps(
    { className: 'text-image__content' },
    {
      allowedBlocks: ['core/heading',
        'core/paragraph',
        'core/image',
        'core/button',
        'core/columns'],
      template: [
        ['core/heading', {
          level: 2,
          placeholder: 'Enter a title...'
        }],
        ['core/paragraph', {
          placeholder: 'Enter a paragraph...'
        }],
        ['core/buttons', {}]
      ]
    }
  )

  const blockProps = useBlockProps({
    className: clsx(className, {
        [`text-image text-image--${align}`]: align}),
    style,
  })

  return (
    <>
      <InspectorControls group="settings">
        <PanelBody title={"Settings"}>
          <PanelRow>Align</PanelRow>
          <SelectControl
          onChange={(val) => setAttributes({ align: val })}
          value={align}
          options={[
            {label: 'Left', value: 'left'},
            {label: 'Right', value: 'right'}
          ]}
          />
        </PanelBody>
      </InspectorControls>

      <section {...blockProps} >
        <div className="text-image__grid">
          <div {...innerBlockProps} />

          <EditorImage
            image_url={image_url}
            image_id={image_id}
            image_alt={image_alt}
            image_srcset={image_srcset}
            image_sizes={image_sizes}
            image_width={image_width}
            image_height={image_height}
            image_loading={image_loading}
            setAttributes={setAttributes}
            placeholder="Select slide image"
            className="text-image__image-editor"
          />
        </div>
      </section>
    </>
  )
}
