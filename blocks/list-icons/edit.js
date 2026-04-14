import './editor.scss'
import {
    InspectorControls,
    useBlockProps,
    useInnerBlocksProps,
} from '@wordpress/block-editor'

import clsx from 'clsx'
import {
    PanelBody,
    ToggleControl
} from '@wordpress/components'
import {__} from '@wordpress/i18n'

import {useChildBlocks} from '../../src/utils/useChildBlocks'
import {useSyncChildBlockAttrs} from '../../src/utils/useSyncChildBlockAttrs'

export default function Edit({attributes, setAttributes, className, style, clientId}) {
    const {isWow} = attributes

    const childBlocks = useChildBlocks(clientId)

    useSyncChildBlockAttrs(
        childBlocks,
        {isWow},
        (_block, index) => ({
            wowDelay: Math.round(index * 0.05 * 10) / 10,
        }),
        [isWow]
    )

    const innerBlockProps = useInnerBlocksProps(
        {
            className: clsx('list-icons', isWow && 'wow-sync'),
        },
        {
            allowedBlocks: ['vit/list-icon'],
            template: [['vit/list-icon', {isWow}]],
        }
    )

    const blockProps = useBlockProps({
        className: clsx(className),
        style,
    })

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Settings')}>
                    <ToggleControl
                        label="Enable animation"
                        checked={isWow}
                        onChange={(val) => setAttributes({isWow: val})}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <div {...innerBlockProps} />
            </div>
        </>
    )
}