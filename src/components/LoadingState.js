import { Spinner } from '@wordpress/components'

/**
 * Generic editor loading state.
 * Styles live in editor.scss → .cpt-loading-state
 *
 * @param {Object}  props
 * @param {string}  [props.message='Loading…']
 */
export const LoadingState = ({ message = 'Loading…' }) => (
    <div className="cpt-loading-state">
        <Spinner />
        <p className="cpt-loading-state__message">{message}</p>
    </div>
)