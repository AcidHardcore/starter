import { ImageSave } from './ImageSave'

/**
 * Renders a single CPT card inside the block editor preview.
 *
 * The component intentionally mirrors the front-end markup produced by
 * render.php so the editor preview stays faithful to the live output.
 *
 * Image data is shaped to match what ImageSave expects:
 *   { id, url, alt, srcset, sizes, width, height, loading }
 *
 * @param {Object}  props
 * @param {number}  props.id         - Post ID (used as React key by the parent).
 * @param {string}  props.title      - Rendered post title (may contain HTML entities).
 * @param {string}  props.link       - Post permalink.
 * @param {string|null} props.imageUrl - Featured image URL (from _embedded).
 * @param {string}  [props.suffix]   - Optional title suffix (e.g. credentials).
 * @param {string}  [props.position] - HTML string for the position/role field.
 * @param {string}  [props.linkedin] - LinkedIn profile URL.
 */
export const CptCard = ({
                            id,
                            title,
                            link,
                            imageUrl,
                            suffix   = '',
                            position = '',
                            linkedin = '',
                        }) => {
    // Shape the image into the object ImageSave consumes.
    // id is unknown from _embedded, so we pass null — ImageSave only skips
    // rendering when *both* url and id are falsy, so we coerce id to a
    // truthy sentinel when a URL is present.
    const image = imageUrl
        ? { id: `preview-${id}`, url: imageUrl, alt: title, loading: 'lazy' }
        : {}

    return (
        <div className="custom-cpt__card">
            <div className="custom-cpt__card-image">
                <ImageSave image={image} isCover />
            </div>

            <h3 className="as-h6 bold mb0">
                <span dangerouslySetInnerHTML={{ __html: title }} />
                {suffix && (
                    <span dangerouslySetInnerHTML={{ __html: `, ${suffix}` }} />
                )}
            </h3>

            {position && (
                <div
                    className="custom-cpt__card-position"
                    dangerouslySetInnerHTML={{ __html: position }}
                />
            )}

            {linkedin && (
                <div className="custom-cpt__card-social">
                    {/* Prevent navigation inside the editor */}
                    <a
                        className="social__icon"
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                        onClick={(e) => e.preventDefault()}
                    >
                        <i className="icon icon--social-li" />
                        <span className="visually-hidden">LinkedIn</span>
                    </a>
                </div>
            )}
        </div>
    )
}