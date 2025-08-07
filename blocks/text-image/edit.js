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

export default function ({ attributes, setAttributes }) {
  const {
    align,
    className,
    style,
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

      <div {...blockProps} >
        <div className="text-image__grid">
          <div {...innerBlockProps} />

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
                className="trash-icon"
                size={32}
                icon={trash}
                onClick={() => setAttributes({
                  image_url: null,
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
        </div>
      </div>
    </>
  )
}
