/**
 * Extracts a normalized set of fields from a WordPress CPT post object.
 *
 * Field values are resolved from ACF first, then post meta as a fallback,
 * so the function works regardless of how fields are registered.
 *
 * @param {Object} item            - A WP post object (from REST API / useSelect).
 * @param {string[]} [fields=[]]   - ACF/meta field slugs to extract (e.g. ['position', 'linkedin']).
 * @returns {{
 *   id:       number,
 *   title:    string,
 *   link:     string,
 *   imageUrl: string|null,
 *   fields:   Record<string, string>
 * }}
 */
export const getCptItemData = (item, fields = []) => {
    // Resolve each requested field from acf → meta → ''
    const resolvedFields = fields.reduce((acc, key) => {
        acc[key] = item.acf?.[key] ?? item.meta?.[key] ?? ''
        return acc
    }, {})

    // Featured image from _embedded (requires ?_embed=true in the query)
    const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0]
    const imageUrl = featuredMedia?.source_url ?? null

    return {
        id:     item.id,
        title:  item.title?.rendered ?? '',
        link:   item.link ?? '',
        imageUrl,
        fields: resolvedFields,
    }
}