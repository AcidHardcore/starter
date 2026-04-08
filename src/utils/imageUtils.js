/**
 * Builds a normalized image attribute object from a WordPress media selection.
 *
 * @param {Object} selected      - The media object returned by MediaPlaceholder/onSelect.
 * @param {string} currentLoading - The current image_loading value to preserve (default: 'lazy').
 * @returns {Object} Normalized image attribute object.
 */
export const buildImageAttributes = (selected, currentLoading = 'lazy') => {
    let srcset = ''

    if (selected.sizes && typeof selected.sizes === 'object') {
        const srcsetArray = []

        Object.keys(selected.sizes).forEach((sizeKey) => {
            const size = selected.sizes[sizeKey]
            if (size.url && size.width) {
                srcsetArray.push(`${size.url} ${size.width}w`)
            }
        })

        if (selected.url && selected.width) {
            srcsetArray.push(`${selected.url} ${selected.width}w`)
        }

        srcset = srcsetArray.join(', ')
    }

    return {
        id: selected.id,
        url: selected.url,
        alt: selected.alt || '',
        srcset,
        sizes: selected.width
            ? `(max-width: ${selected.width}px) 100vw, ${selected.width}px`
            : '100vw',
        width: selected.width,
        height: selected.height,
        loading: currentLoading || 'lazy',
    }
}

/**
 * Returns a reset image attribute object (empty/null values).
 *
 * @param {string} currentLoading - The current loading value to preserve (default: 'lazy').
 * @returns {Object} Reset image attribute object.
 */
export const resetImageAttributes = (currentLoading = 'lazy') => ({
    id: null,
    url: '',
    alt: '',
    srcset: '',
    sizes: '',
    width: null,
    height: null,
    loading: currentLoading || 'lazy',
})