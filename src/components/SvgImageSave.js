import { isSvgImage } from '../utils/useSvgContent'

/**
 * Save-side image renderer that handles both regular images and inline SVGs.
 *
 * Reads mime and svgContent directly from the image object — no separate props needed.
 *
 * @param {Object}  props
 * @param {Object}  props.image       - Normalized image object { id, url, alt, mime, svgContent, … }.
 * @param {string}  [props.className] - Optional class for the SVG wrapper div.
 *
 * @example
 * <SVGImageSave image={image} />
 */
export const SvgImageSave = ({ image = {}, className }) => {
    const {
        id,
        url,
        alt,
        srcset,
        sizes,
        width,
        height,
        loading,
        mime,
        svgContent
    } = image

    const hasImage = url && id
    if (!hasImage) return null

    const isSVG = isSvgImage(mime, url)

    if (isSVG && svgContent) {
        return (
            <div
                className={className ?? 'inline-svg'}
                dangerouslySetInnerHTML={{ __html: svgContent }}
            />
        )
    }

    return (
        <img
            src={url}
            alt={alt || ''}
            className={id ? `wp-image-${id}` : undefined}
            {...(srcset && { srcSet: srcset })}
            {...(sizes && { sizes })}
            {...(width && { width })}
            {...(height && { height })}
            {...(loading && { loading })}
            decoding="async"
        />
    )
}