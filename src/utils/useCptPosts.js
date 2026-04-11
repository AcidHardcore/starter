import { useSelect } from '@wordpress/data'

/**
 * Fetches posts of any custom post type with embedded media.
 *
 * @param {string} postType          - The registered CPT slug (e.g. 'member', 'project').
 * @param {number} [perPage=-1]      - Maximum number of posts to fetch (-1 = all).
 * @param {Object} [queryArgs={}]    - Additional WP_Query args merged into the request.
 * @returns {{ items: Array|null, hasResolved: boolean }}
 */
export const useCptPosts = (postType, perPage = -1, queryArgs = {}) => {
    const query = {
        per_page: perPage,
        _embed: true,
        ...queryArgs,
    }

    const { items, hasResolved } = useSelect(
        (select) => {
            const { getEntityRecords, hasFinishedResolution } = select('core')

            return {
                items: getEntityRecords('postType', postType, query),
                hasResolved: hasFinishedResolution('getEntityRecords', [
                    'postType',
                    postType,
                    query,
                ]),
            }
        },
        [postType, JSON.stringify(query)]
    )

    return { items, hasResolved }
}