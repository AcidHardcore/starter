import { RawHTML } from '@wordpress/element'
import { Spinner, Notice } from '@wordpress/components'
import { ImagePicker } from './ImagePicker'
import { useSVGContent } from '../utils/useSVGContent'

/**
 * Editor image picker that transparently handles both regular images and inline SVGs.
 *
 * Composes ImagePicker (selection + remove UI) with useSVGContent (fetch + cache).
 * mime and svgContent are read from image.mime / image.svgContent — no separate props needed.
 *
 * @param {Object}   props
 * @param {Object}   props.image              - Normalized image object { id, url, mime, svgContent, … }.
 * @param {Function} props.onSelect           - Called with the raw WP media object on selection.
 * @param {Function} props.onRemove           - Called when the image is removed.
 * @param {Function} props.onSVGFetched       - Called with the SVG string once fetched.
 *                                              Caller should: setAttributes({ image: { ...image, svgContent: svg } })
 * @param {string}   [props.wrapperClassName]
 * @param {string}   [props.imageClassName]
 * @param {string}   [props.placeholder]
 * @param {boolean}  [props.showRemoveButton]
 * @param {boolean}  [props.showNotice]       - Show a "waiting for SVG" notice in the block canvas.
 *
 * @example
 * <SVGImagePicker
 *   image={image}
 *   onSelect={(selected) => setAttributes({
 *     image: { ...buildImageAttributes(selected, image.loading), mime: selected.mime, svgContent: null }
 *   })}
 *   onRemove={() => setAttributes({ image: resetImageAttributes(image.loading, { mime: '', svgContent: null }) })}
 *   onSVGFetched={(svg) => setAttributes({ image: { ...image, svgContent: svg } })}
 * />
 */
export const SvgImagePicker = ({
                                   image = {},
                                   onSelect,
                                   onRemove,
                                   onSVGFetched,
                                   wrapperClassName = 'image-wrap',
                                   imageClassName,
                                   placeholder = 'Select or upload an image',
                                   showRemoveButton = true,
                                   showNotice = false,
                               }) => {
    const { isSVG, isLoadingSVG } = useSVGContent({ image, onFetched: onSVGFetched })
    const { svgContent } = image

    const renderImage = isSVG
        ? () => (
            isLoadingSVG ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Spinner />
                    <p>Loading SVG…</p>
                </div>
            ) : svgContent ? (
                <div className="inline-svg">
                    <RawHTML>{svgContent}</RawHTML>
                </div>
            ) : null
        )
        : null

    return (
        <>
            {showNotice && isSVG && !svgContent && !isLoadingSVG && (
                <Notice status="warning" isDismissible={false}>
                    Loading SVG content… Please wait before saving.
                </Notice>
            )}
            <ImagePicker
                image={image}
                onSelect={onSelect}
                onRemove={onRemove}
                wrapperClassName={wrapperClassName}
                imageClassName={imageClassName}
                placeholder={placeholder}
                showRemoveButton={showRemoveButton}
                renderImage={renderImage}
            />
        </>
    )
}