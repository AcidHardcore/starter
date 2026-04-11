/**
 * Generic editor empty state.
 * Styles live in editor.scss → .cpt-empty-state
 *
 * @param {Object}  props
 * @param {string}  [props.message]
 */
export const EmptyState = ({
                               message = 'No items found. Publish some posts in this post type to display them here.',
                           }) => (
    <div className="cpt-empty-state">
        <p className="cpt-empty-state__message">{message}</p>
    </div>
)