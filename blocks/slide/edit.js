import {
  useBlockProps,
  MediaPlaceholder,
  InspectorControls,
  RichText
} from '@wordpress/block-editor'

import {
  PanelBody,
  PanelRow,
  SelectControl,
  TextControl
} from '@wordpress/components'

import {
  Icon,
  trash
} from '@wordpress/icons'

import './editor.scss'
import clsx from 'clsx'
import { EditorImage } from '../../src/components/EditorImage'

export default function Edit ({ attributes, setAttributes, className, style }) {

  const {
    image_url,
    image_id,
    image_alt,
    image_srcset,
    image_sizes,
    image_width,
    image_height,
    image_loading,
    title,
    html
  } = attributes

  const blockProps = useBlockProps({
    className: clsx(className,
      'swiper-slide slide'
    ),
    style
  })

  return (
    <>
      <InspectorControls group="styles">
        <PanelBody title={'Settings'}>
          <PanelRow>Image Loading</PanelRow>
          <SelectControl
            onChange={(val) => setAttributes({ image_loading: val })}
            value={image_loading}
            options={[
              { label: 'Lazy', value: 'lazy' },
              { label: 'Eager', value: 'eager' }
            ]}
          />
        </PanelBody>
      </InspectorControls>
      <InspectorControls group="settings">
        <PanelBody>

          <PanelRow>Title</PanelRow>
          <TextControl
            value={title}
            onChange={(val) => setAttributes({ title: val })}
            placeholder={"Add item heading…"}
            __next40pxDefaultSize
          />

          <PanelRow>Text</PanelRow>
          <TextControl
            value={html}
            onChange={(val) => setAttributes({ html: val })}
            placeholder={"Add item text…"}
            __next40pxDefaultSize
          />

          <PanelRow>Image</PanelRow>
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
            className="slide-image-editor"
            onImageSelect={(image) => {
              // Optional: Add custom logic when image is selected
            }}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
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
          className="slide-image-editor"
          onImageSelect={(image) => {
            // Optional: Add custom logic when image is selected
          }}
        />
        <RichText
          tagName="h4"
          // allowedFormats={[]}
          value={title}
          onChange={(title) => setAttributes({ title })}
          placeholder="This is the headline"
        />

        <RichText
          tagName="p"
          // allowedFormats={[]}
          value={html}
          onChange={(html) => setAttributes({ html })}
          placeholder="This is the body copy"
        />
      </div>
    </>
  )
}
