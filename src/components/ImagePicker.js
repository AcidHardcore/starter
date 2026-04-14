import { MediaPlaceholder } from '@wordpress/block-editor'
import { Button } from '@wordpress/components'
import { trash } from '@wordpress/icons'

/**
 * Shared editor-only component that renders either a MediaPlaceholder
 * (no image selected) or the selected image with an optional remove button.
 *
 * Used in both the Image component and the InspectorControls panel.
 */
export const ImagePicker = ({
                                image = {},
                                onSelect,
                                onRemove,
                                wrapperClassName = 'image-wrap',
                                imageClassName,
                                placeholder = 'Select or upload an image',
                                showRemoveButton = true,
                                decoding,
                            }) => {
    const {
        id,
        url,
        alt,
        srcset,
        sizes,
        width,
        height,
        loading
    } = image

    const hasImage = url && id

    if (!hasImage) {
        return (
            <MediaPlaceholder
                onSelect={onSelect}
                allowedTypes={['image']}
                multiple={false}
                labels={{ title: placeholder }}
                className="editor-image-placeholder"
            />
        )
    }

    const resolvedImageClass = imageClassName ?? (id ? `wp-image-${id}` : undefined)

    return (
        <div className={wrapperClassName}>
            <img
                src={url}
                alt={alt || ''}
                className={resolvedImageClass}
                {...(srcset && { srcSet: srcset })}
                {...(sizes && { sizes })}
                {...(width && { width })}
                {...(height && { height })}
                {...(loading && { loading })}
                {...(decoding && { decoding })}
            />
            {showRemoveButton && (
                <Button
                    className="remove-image-button"
                    onClick={onRemove}
                    variant="secondary"
                    isDestructive
                    size="small"
                    icon={trash}
                    label="Remove image"
                    showTooltip
                />
            )}
        </div>
    )
}