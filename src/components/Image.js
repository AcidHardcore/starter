import '../editor/editor.scss'
import clsx from 'clsx'
import {
    buildImageAttributes,
    resetImageAttributes
} from '../utils/imageUtils'
import { ImagePicker } from './ImagePicker'

export const Image = ({
                          image = {},
                          setAttributes,
                          additionalClasses = [],
                          showRemoveButton = true,
                          placeholder = 'Select or upload an image',
                          onImageSelect,
                          onImageRemove,
                          isCover = false,
                          isContain = false,
                          isResponsive = false,
                          isRounded = false,
                          isTransparent = false,
                          isWow = false,
                      }) => {
    const { loading, id } = image

    const wrapperClasses = clsx(
        'image-wrap',
        {
            'image-caption--rounded': isRounded,
            'wow--pop': isWow,
            'image-wrap--cover': isCover,
            'image-wrap--contain': isContain,
            'image-wrap--responsive': isResponsive,
            'image-wrap--transparent': isTransparent,
        },
        additionalClasses
    )

    const imageClasses = clsx(
        id && `wp-image-${id}`,
        { responsive: isResponsive }
    )

    const handleImageSelect = (selected) => {
        const newImage = buildImageAttributes(selected, loading)
        setAttributes({ image: newImage })
        if (onImageSelect) onImageSelect(selected, newImage)
    }

    const handleImageRemove = () => {
        const resetImage = resetImageAttributes(loading)
        setAttributes({ image: resetImage })
        if (onImageRemove) onImageRemove()
    }

    return (
        <ImagePicker
            image={image}
            onSelect={handleImageSelect}
            onRemove={handleImageRemove}
            wrapperClassName={wrapperClasses}
            imageClassName={imageClasses}
            placeholder={placeholder}
            showRemoveButton={showRemoveButton}
        />
    )
}