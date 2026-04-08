import {
  useBlockProps,
  InspectorControls,
  RichText
} from '@wordpress/block-editor'

import {
  PanelBody,
  PanelRow,
  SelectControl, TextareaControl,
  TextControl
} from '@wordpress/components'


import './editor.scss'
import clsx from 'clsx'
import { Image } from '../../src/components/Image.js'
import { Author } from '../../src/components/Author.js'

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
    html,
    name
  } = attributes

  const blockProps = useBlockProps({
    className: clsx(
      className,
      'review swiper-slide'
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

          <PanelRow>HTML</PanelRow>
          <TextareaControl
            value={html}
            onChange={(val) => setAttributes({ html: val })}
            placeholder={"Add item text…"}
            __next40pxDefaultSize
          />

          <PanelRow>Name</PanelRow>
          <TextControl
            value={name}
            onChange={(val) => setAttributes({ name: val })}
            placeholder={"Add item text…"}
            __next40pxDefaultSize
          />

          <PanelRow>Title</PanelRow>
          <TextControl
            value={title}
            onChange={(val) => setAttributes({ title: val })}
            placeholder={"Add item heading…"}
            __next40pxDefaultSize
          />

          <PanelRow>Image</PanelRow>
          <Image
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

        <RichText
          tagName="div"
          allowedFormats={[]}
          value={html}
          onChange={(html) => setAttributes({ html })}
          placeholder="This is the quote copy"
        />

        <Author
          image_url={image_url}
          image_id={image_id}
          image_alt={image_alt}
          image_srcset={image_srcset}
          image_sizes={image_sizes}
          image_width={image_width}
          image_height={image_height}
          image_loading={image_loading}
          name={name}
          title={title}
          setAttributes={setAttributes}
          additionalClasses={["review__author"]}
        />
      </div>
    </>
  )
}
