import { useState, useEffect } from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch'

/**
 * Detects whether an image (by mime type or URL) is an SVG.
 *
 * @param {string} [mime] - MIME type string, e.g. 'image/svg+xml'.
 * @param {string} [url]  - Image URL.
 * @returns {boolean}
 */
export function isSvgImage(mime = '', url = '') {
    return mime === 'image/svg+xml' || url?.toLowerCase().endsWith('.svg')
}

/**
 * Fetches and caches inline SVG markup for a given image object.
 * Only fires when the image is an SVG and no svgContent is already stored.
 *
 * @param {Object}   options
 * @param {Object}   options.image        - Normalized image object { id, url, mime, svgContent, … }.
 * @param {Function} options.onFetched    - Called with the SVG string once fetched.
 *                                          Persist via: setAttributes({ image: { ...image, svgContent: svg } })
 * @returns {{ isSVG: boolean, isLoadingSVG: boolean }}
 *
 * @example
 * const { isSVG, isLoadingSVG } = useSVGContent({
 *   image,
 *   onFetched: (svg) => setAttributes({ image: { ...image, svgContent: svg } }),
 * })
 */
export function useSVGContent({ image, onFetched }) {
    const { id, url, mime, svgContent } = image ?? {}
    const isSVG = isSvgImage(mime, url)
    const [isLoadingSVG, setIsLoadingSVG] = useState(false)

    useEffect(() => {
        if (!isSVG || !id || svgContent || isLoadingSVG) return

        let cancelled = false

        const fetchSVG = async () => {
            setIsLoadingSVG(true)
            try {
                const media = await apiFetch({ path: `/wp/v2/media/${id}` })

                if (
                    !cancelled &&
                    media?.media_type === 'image' &&
                    media?.mime_type === 'image/svg+xml' &&
                    media?.source_url
                ) {
                    const response = await fetch(media.source_url)
                    const svgText = await response.text()
                    if (!cancelled && svgText) {
                        onFetched(svgText)
                    }
                }
            } catch (error) {
                if (!cancelled) {
                    console.error('[useSVGContent] Failed to fetch SVG:', error)
                }
            } finally {
                if (!cancelled) setIsLoadingSVG(false)
            }
        }

        fetchSVG()
        return () => { cancelled = true }
    }, [id, isSVG, svgContent])

    return { isSVG, isLoadingSVG }
}