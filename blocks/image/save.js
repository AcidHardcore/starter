import { useBlockProps } from '@wordpress/block-editor'
import clsx from 'clsx'
import { ImageSave } from '../../src/components/ImageSave'

export default function save({ attributes, className }) {
    const { image, isWow } = attributes

    const blockProps = useBlockProps.save({
        className: clsx('image', className, isWow && 'wow--pop wow--delay-x'),
    })

    return (
        <div {...blockProps}>
            <ImageSave
                image={image}
                isResponsive={true}
            />
        </div>
    )
}