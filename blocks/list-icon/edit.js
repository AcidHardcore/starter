import './editor.scss'
import {
    InspectorControls,
    RichText,
    useBlockProps,
} from '@wordpress/block-editor'

import clsx from 'clsx'
import {
    PanelBody,
    SelectControl,
    TextControl,
    TextareaControl, BaseControl
} from '@wordpress/components'
import {__} from '@wordpress/i18n'

import {SvgImagePicker} from '../../src/components/SvgImagePicker'
import {buildImageAttributes, resetImageAttributes} from '../../src/utils/imageUtils'

export default function Edit({attributes, setAttributes, className, style}) {
    const {
        image = {},
        isWow,
        wowDelay = 0.05,
        title,
        text
    } = attributes
    const {loading} = image

    const blockProps = useBlockProps({
        className: clsx(
            'list-icons__item',
            isWow && 'wow--in-up',
            className),
        style,
        'data-wow-delay': wowDelay,
    })

    const handleImageSelect = (selected) => {
        setAttributes({
            image: {
                ...buildImageAttributes(selected, loading),
                mime: selected.mime || selected.subtype || '',
                svgContent: null,
            },
        })
    }

    const handleImageRemove = () => {
        setAttributes({
            image: resetImageAttributes(loading, {mime: '', svgContent: null}),
        })
    }

    const handleSVGFetched = (svg) => {
        setAttributes({image: {...image, svgContent: svg}})
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Settings')}>
                    <BaseControl label="Image">
                        <SvgImagePicker
                            image={image}
                            onSelect={handleImageSelect}
                            onRemove={handleImageRemove}
                            onSVGFetched={handleSVGFetched}
                        />
                    </BaseControl>

                    <SelectControl
                        labale="Image Loading"
                        onChange={(val) => setAttributes({image: {...image, loading: val}})}
                        value={loading}
                        options={[
                            {label: 'Eager', value: 'eager'},
                            {label: 'Lazy', value: 'lazy'},
                        ]}
                        __next40pxDefaultSize
                    />

                    <TextControl
                        label="Title"
                        onChange={(val) => setAttributes({title: val})}
                        value={title}
                        __next40pxDefaultSize
                    />

                    <TextareaControl
                        label="Text"
                        onChange={(val) => setAttributes({text: val})}
                        value={text}
                        __next40pxDefaultSize
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="list-icons__icon">
                    <SvgImagePicker
                        image={image}
                        onSelect={handleImageSelect}
                        onRemove={handleImageRemove}
                        onSVGFetched={handleSVGFetched}
                        showNotice
                    />
                </div>

                <div className="list-icons__content">
                    <RichText
                        value={title}
                        onChange={(val) => setAttributes({title: val})}
                        placeholder={__('Add item title…')}
                        tagName="h3"
                        className="bold green-dark as-h6"
                    />
                    <RichText
                        value={text}
                        onChange={(val) => setAttributes({text: val})}
                        placeholder={__('Add item text…')}
                        tagName="div"
                        className="editor editor--small"
                    />
                </div>
            </div>
        </>
    )
}