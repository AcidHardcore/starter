import { useEffect } from '@wordpress/element'
import { useDispatch } from '@wordpress/data'

/**
 * Syncs a set of attributes to all child blocks whenever the watched values change.
 * Optionally accepts a mapper function to compute per-child attributes based on index.
 *
 * @param {Array}         childBlocks  - Array of inner block objects (from useChildBlocks).
 * @param {Object}        attrs        - Shared attributes to apply to every child block.
 * @param {Function|null} mapper       - Optional. Called as mapper(block, index) → Object.
 *                                       Return value is merged with `attrs` for that child.
 * @param {Array}         deps         - Extra dependency values that should trigger a re-sync.
 *
 * @example — shared attrs only
 * useSyncChildBlockAttrs(childBlocks, { isWow }, [], [isWow])
 *
 * @example — shared attrs + per-child computed attrs
 * useSyncChildBlockAttrs(
 *   childBlocks,
 *   { isWow },
 *   (block, index) => ({ wowDelay: Math.round(index * 0.05 * 10) / 10 }),
 *   [isWow]
 * )
 */
export function useSyncChildBlockAttrs(childBlocks, attrs = {}, mapper = null, deps = []) {
    const { updateBlockAttributes } = useDispatch('core/block-editor')

    useEffect(() => {
        childBlocks.forEach((block, index) => {
            const computed = typeof mapper === 'function' ? mapper(block, index) : {}
            const next = { ...attrs, ...computed }

            const hasChanges = Object.keys(next).some(
                (key) => block.attributes[key] !== next[key]
            )

            if (hasChanges) {
                updateBlockAttributes(block.clientId, next)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [childBlocks.length, updateBlockAttributes, ...deps])
}