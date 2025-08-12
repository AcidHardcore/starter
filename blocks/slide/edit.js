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
          {image_url && image_id ? (
            <div className="image-container">
              <img
                src={image_url}
                alt={image_alt}
                className={`wp-image-${image_id}`}
                srcSet={image_srcset}
                sizes={image_sizes}
                width={image_width}
                height={image_height}
                loading={image_loading}
              />
              <Icon
                className="remove-image-button"
                size={32}
                icon={trash}
                onClick={() => setAttributes({
                  image_url: '',
                  image_id: null,
                  image_alt: '',
                  image_srcset: '',
                  image_sizes: '',
                  image_width: null,
                  image_height: null
                })}
              />
            </div>
          ) : (
            <MediaPlaceholder
              onSelect={
                (image) => {
                  // Generate srcset from image.sizes object
                  let srcset = ''
                  if (image.sizes && typeof image.sizes === 'object') {
                    const srcsetArray = []

                    // Add each size to srcset
                    Object.keys(image.sizes).forEach(sizeKey => {
                      const size = image.sizes[sizeKey];
                      if (size.url && size.width) {
                        srcsetArray.push(`${size.url} ${size.width}w`);
                      }
                    });

                    // Add the full size image
                    if (image.url && image.width) {
                      srcsetArray.push(`${image.url} ${image.width}w`);
                    }

                    srcset = srcsetArray.join(', ');
                  }

                  // Generate sizes attribute - using standard responsive pattern
                  const sizes = image.width ? `(max-width: ${image.width}px) 100vw, ${image.width}px` : '100vw';

                  setAttributes({
                    image_url: image.url,
                    image_id: image.id,
                    image_alt: image.alt || '',
                    image_srcset: srcset,
                    image_sizes: sizes,
                    image_width: image.width,
                    image_height: image.height,
                    image_loading: 'lazy'
                  })
                }
              }
              allowedTypes={["image"]}
              multiple={false}
              labels={{ title: "Image" }}
            />
          )}

        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        {attributes.image_url && attributes.image_id ? (
        <div className="image-container">
          <img
            src={image_url}
            alt={image_alt}
            className={`wp-image-${image_id}`}
            srcSet={image_srcset}
            sizes={image_sizes}
            width={image_width}
            height={image_height}
            loading={image_loading}
          />
          <Icon
            className="remove-image-button"
            size={32}
            icon={trash}
            onClick={() => setAttributes({
              image_url: '',
              image_id: null,
              image_alt: '',
              image_srcset: '',
              image_sizes: '',
              image_width: null,
              image_height: null
            })}
          />
        </div>
        ) : (
        <MediaPlaceholder
          onSelect={
            (image) => {
              // Generate srcset from image.sizes object
              let srcset = '';
              if (image.sizes && typeof image.sizes === 'object') {
                const srcsetArray = [];

                // Add each size to srcset
                Object.keys(image.sizes).forEach(sizeKey => {
                  const size = image.sizes[sizeKey];
                  if (size.url && size.width) {
                    srcsetArray.push(`${size.url} ${size.width}w`);
                  }
                });

                // Add the full size image
                if (image.url && image.width) {
                  srcsetArray.push(`${image.url} ${image.width}w`);
                }

                srcset = srcsetArray.join(', ');
              }

              // Generate sizes attribute - using standard responsive pattern
              const sizes = image.width ? `(max-width: ${image.width}px) 100vw, ${image.width}px` : '100vw';

              setAttributes({
                image_url: image.url,
                image_id: image.id,
                image_alt: image.alt || '',
                image_srcset: srcset,
                image_sizes: sizes,
                image_width: image.width,
                image_height: image.height,
                image_loading: 'lazy'
              })
            }
          }
          allowedTypes={['image']}
          multiple={false}
          labels={{ title: 'Image' }}
        >
        </MediaPlaceholder>
        )}
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
