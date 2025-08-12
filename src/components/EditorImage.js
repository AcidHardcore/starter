import {
  trash
} from '@wordpress/icons'

import {
  MediaPlaceholder,
} from '@wordpress/block-editor'

import {
  Button
} from "@wordpress/components";

export const EditorImage = ({
  image_url,
  image_id,
  image_alt,
  image_srcset,
  image_sizes,
  image_width,
  image_height,
  image_loading,
  setAttributes,
  className = '',
  showRemoveButton = true,
  placeholder = 'Select or upload an image',
  onImageSelect,
  onImageRemove
}) => {

  const handleImageSelect = (image) => {
    // Generate srcset from image.sizes object
    let srcset = ''
    if (image.sizes && typeof image.sizes === 'object') {
      const srcsetArray = []

      // Add each size to srcset
      Object.keys(image.sizes).forEach(sizeKey => {
        const size = image.sizes[sizeKey]
        if (size.url && size.width) {
          srcsetArray.push(`${size.url} ${size.width}w`)
        }
      })

      // Add the full size image
      if (image.url && image.width) {
        srcsetArray.push(`${image.url} ${image.width}w`)
      }

      srcset = srcsetArray.join(', ')
    }

    // Generate sizes attribute - using standard responsive pattern
    const sizes = image.width ? `(max-width: ${image.width}px) 100vw, ${image.width}px` : '100vw'

    const imageAttributes = {
      image_url: image.url,
      image_id: image.id,
      image_alt: image.alt || '',
      image_srcset: srcset,
      image_sizes: sizes,
      image_width: image.width,
      image_height: image.height,
      image_loading: image_loading || 'lazy'
    }

    setAttributes(imageAttributes)

    // Call custom callback if provided
    if (onImageSelect) {
      onImageSelect(image, imageAttributes)
    }
  }

  const handleImageRemove = () => {
    const resetAttributes = {
      image_url: '',
      image_id: null,
      image_alt: '',
      image_srcset: '',
      image_sizes: '',
      image_width: null,
      image_height: null
    }

    setAttributes(resetAttributes)

    // Call custom callback if provided
    if (onImageRemove) {
      onImageRemove()
    }
  }

  const hasImage = image_url && image_id

  return (
    <div className={`editor-image-wrapper ${className}`}>
      {hasImage ? (
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
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          {showRemoveButton && (
            <Button
              className="remove-image-button"
              onClick={handleImageRemove}
              variant="secondary"
              isDestructive
              size="small"
              icon={trash}
              label={'Remove image'}
              showTooltip
            />
          )}
        </div>
      ) : (
        <MediaPlaceholder
          onSelect={handleImageSelect}
          allowedTypes={['image']}
          multiple={false}
          labels={{ title: placeholder }}
          className="editor-image-placeholder"
        />
      )}
    </div>
  )
}
