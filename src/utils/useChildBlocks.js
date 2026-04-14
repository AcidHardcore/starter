import { useSelect } from '@wordpress/data'

/**
 * Returns the inner blocks (children) of a given block.
 *
 * @param {string} clientId - The clientId of the parent block.
 * @returns {Array} Array of inner block objects.
 *
 * @example
 * const childBlocks = useChildBlocks(clientId)
 */
export function useChildBlocks(clientId) {
    return useSelect(
        (select) => {
            const { getBlock } = select('core/block-editor')
            const block = getBlock(clientId)
            return block?.innerBlocks ?? []
        },
        [clientId]
    )
}