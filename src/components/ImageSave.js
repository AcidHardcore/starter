import clsx from 'clsx'

export const ImageSave = ({
                              image = {},
                              isCover = false,
                              isContain = false,
                              isResponsive = false,
                              isRounded = false,
                              isTransparent = false,
                              isWow = false,
                              additionalClasses = [],
                          }) => {
    const { id, url, alt, srcset, sizes, width, height, loading } = image

    const wrapperClasses = clsx(
        'image-wrap',
        {
            'image-caption--rounded': isRounded,
            'wow--pop': isWow,
            'image-wrap--cover': isCover,
            'image-wrap--contain': isContain,
            'image-wrap--transparent': isTransparent,
        },
        additionalClasses
    )

    const imageClasses = clsx(
        id && `wp-image-${id}`,
        { responsive: isResponsive }
    )

    const hasImage = url && id

    return (
        <div className={wrapperClasses}>
            {hasImage && (
                <img
                    src={url}
                    alt={alt || ''}
                    className={imageClasses}
                    {...(srcset && { srcSet: srcset })}
                    {...(sizes && { sizes })}
                    {...(width && { width })}
                    {...(height && { height })}
                    {...(loading && { loading })}
                    decoding="async"
                />
            )}
        </div>
    )
}