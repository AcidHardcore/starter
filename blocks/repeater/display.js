import {
  MediaPlaceholder,
  RichText,
} from '@wordpress/block-editor'

import {
  Button
} from '@wordpress/components';

import {
  trash
} from '@wordpress/icons'

export const Display = ({
  item,
  index,
  onTitleChange,
  onTextChange,
  onImageChange,
  onRemoveImage
}) => {
  return (
    <div className="repeater__item">
      <div className="repeater__heading">
        <div className="repeater__icon">
          {item.image_url && item.image_id ? (
            <div className="image-container">
              <img
                src={item.image_url}
                alt={item.image_alt}
                className={`wp-image-${item.image_id}`}
                {...(item.image_srcset && { srcSet: item.image_srcset })}
                {...(item.image_sizes && { sizes: item.image_sizes })}
                {...(item.image_width && { width: item.image_width })}
                {...(item.image_height && { height: item.image_height })}
                loading={item.image_loading}
                decoding="async"
              />
              <Button
                className="remove-image-button"
                isDestructive
                size="small"
                icon={trash}
                draggable="false"
                onClick={() => onRemoveImage(index)}
                showTooltip
                label={'Remove image'}
              />
            </div>
          ) : (
            <MediaPlaceholder
              onSelect={(image) => onImageChange(image, index)}
              allowedTypes={['image']}
              multiple={false}
              labels={{ title: 'Image' }}
            />
          )}
        </div>
        <RichText
          value={item.title}
          onChange={(title) => onTitleChange(title, index)}
          placeholder={'Add item title…'}
          tagName="h4"
        />
      </div>
      <RichText
        placeholder={'Add item text…'}
        value={item.text}
        onChange={(text) => onTextChange(text, index)}
        tagName="p"
      />
    </div>
  )
}
