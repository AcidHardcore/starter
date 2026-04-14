import { RichText, useBlockProps } from '@wordpress/block-editor'
import clsx from 'clsx'
import { SvgImageSave } from '../../src/components/SvgImageSave'

export default function save({ attributes, className }) {
    const { image = {}, isWow, wowDelay = 0.05, title, text } = attributes

    const blockProps = useBlockProps.save({
        className: clsx('list-icons__item', isWow && 'wow--in-up', className),
        'data-wow-delay': wowDelay,
    })

    return (
        <div {...blockProps}>
            <div className="list-icons__icon">
                <SvgImageSave image={image} />
            </div>

            <div className="list-icons__content">
                <RichText.Content
                    value={title}
                    tagName="h3"
                    className="bold green-dark as-h6"
                />
                <RichText.Content
                    value={text}
                    tagName="div"
                    className="editor editor--small"
                />
            </div>
        </div>
    )
}