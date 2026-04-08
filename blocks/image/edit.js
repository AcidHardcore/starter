import './editor.scss'
import {
    useBlockProps,
    InspectorControls,
} from '@wordpress/block-editor'

import {
    BaseControl,
    PanelBody,
    SelectControl,
    ToggleControl,
} from '@wordpress/components'

import clsx from 'clsx'
import { Image } from '../../src/components/Image'
import { ImagePicker } from '../../src/components/ImagePicker'
import { buildImageAttributes, resetImageAttributes } from '../../src/utils/imageUtils'

export default function Edit({ attributes, setAttributes, className, style }) {
    const { image, isWow } = attributes
    const { loading } = image ?? {}

    const blockProps = useBlockProps({
        className: clsx('image', className, isWow && 'wow--pop wow--delay-x'),
        style,
    })

    const handleImageSelect = (selected) => {
        setAttributes({ image: buildImageAttributes(selected, loading) })
    }

    const handleImageRemove = () => {
        setAttributes({ image: resetImageAttributes(loading) })
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title="Image Settings" initialOpen={true}>
                    <BaseControl label="Image">
                        <ImagePicker
                            image={image}
                            onSelect={handleImageSelect}
                            onRemove={handleImageRemove}
                            wrapperClassName="image-container"
                            placeholder="Image"
                            decoding="async"
                        />
                    </BaseControl>

                    <SelectControl
                        label="Image Loading"
                        onChange={(val) => setAttributes({ image: { ...image, loading: val } })}
                        value={loading}
                        options={[
                            { label: 'Eager', value: 'eager' },
                            { label: 'Lazy', value: 'lazy' },
                        ]}
                    />

                    <ToggleControl
                        label="Enable animation"
                        checked={isWow}
                        onChange={(val) => setAttributes({ isWow: val })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <Image
                    image={image}
                    setAttributes={setAttributes}
                    isResponsive={true}
                    showRemoveButton={true}
                />
            </div>
        </>
    )
}