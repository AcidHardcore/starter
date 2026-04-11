import './editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import clsx from 'clsx'

import { useCptPosts }    from '../../src/utils/useCptPosts'
import { getCptItemData } from '../../src/utils/getCptItemData'
import { LoadingState }   from '../../src/components/LoadingState'
import { EmptyState }     from '../../src/components/EmptyState'
import { CptCard }        from '../../src/components/CptCard'

/** ACF/meta fields to extract from every post. Adjust per project. */
const CPT_FIELDS = ['suffix', 'position', 'linkedin']

/** The registered CPT slug. Adjust per project. */
const POST_TYPE = 'member'

/**
 * Block editor component for the Custom CPT block.
 *
 * @param {Object} props
 * @param {Object} props.attributes
 * @param {Function} props.setAttributes
 * @param {string} [props.className]
 * @param {Object} [props.style]
 */
export default function Edit({ attributes, setAttributes, className, style }) {
    const blockProps = useBlockProps({
        className: clsx('custom-cpt', className),
        style,
    })

    const { items, hasResolved } = useCptPosts(POST_TYPE)

    if (!hasResolved || items === null) {
        return (
            <div {...blockProps}>
                <LoadingState message="Loading members…" />
            </div>
        )
    }

    if (!items.length) {
        return (
            <div {...blockProps}>
                <EmptyState message='No members found. Add posts to the "member" post type to display them here.' />
            </div>
        )
    }

    return (
        <div {...blockProps}>
            <div className="custom-cpt__grid">
                {items.map((item) => {
                    const { id, title, link, imageUrl, fields } = getCptItemData(item, CPT_FIELDS)

                    return (
                        <CptCard
                            key={id}
                            id={id}
                            title={title}
                            link={link}
                            imageUrl={imageUrl}
                            suffix={fields.suffix}
                            position={fields.position}
                            linkedin={fields.linkedin}
                        />
                    )
                })}
            </div>
        </div>
    )
}