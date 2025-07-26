import {
	addFilter
}
	from '@wordpress/hooks'
import {
	createHigherOrderComponent
}
	from '@wordpress/compose'
import {
	InspectorControls,
	BlockControls
} from '@wordpress/block-editor'
import {
	PanelBody,
	TextControl,
	SelectControl,
	ToolbarDropdownMenu
} from '@wordpress/components'
import HeadingLevelIcon from './heading-level-icon'

const supportedBlocks = ['core/heading', 'core/paragraph', 'core/button']

addFilter(
	'blocks.registerBlockType',
	'vit/animation-attributes',
	(settings, name) => {
		if (!supportedBlocks.includes(name)) {
			return settings
		}

		return {
			...settings,
			attributes: {
				...settings.attributes,
				dataScrollAnimation: {
					type: 'string',
					enum: ['fadeIn', 'fadeUp', 'fadeLeft', 'fadeRight', 'splitText'],
					default: 'fadeUp',
				},
				dataScrollDuration: {
					type: 'string',
					default: '',
				},
				dataScrollDelay: {
					type: 'string',
					default: '',
				},
				dataScrollStagger: {
					type: 'string',
					default: '',
				},
				dataScrollOrder: {
					type: 'string',
					default: '',
				},
				asLevel: {
					type: 'string',
				},
			},
		}
	}
)

// Add custom controls
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (!supportedBlocks.includes(props.name)) {
			return <BlockEdit {...props} />
		}

		const { attributes, setAttributes } = props
		const { dataScrollAnimation, dataScrollDuration, dataScrollDelay, dataScrollOrder, dataScrollStagger, asLevel } = attributes

		const HEADING_LEVELS = ['empty', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
		const POPOVER_PROPS = {
			className: 'block-library-heading-level-dropdown',
		}

		return (
			<div>
				{props.name === 'core/heading' && (
					<BlockControls group="block">
						<div className="components-toolbar-group" style={{ order: 2 }}>
							<ToolbarDropdownMenu
								popoverProps={POPOVER_PROPS}
								icon={<HeadingLevelIcon level={asLevel ?? 'empty'}/>}
								label="Change AS level"
								controls={HEADING_LEVELS.map((targetLevel) => {
									const isActive = targetLevel === asLevel
									return {
										icon: <HeadingLevelIcon level={targetLevel}/>,
										title: targetLevel === 'empty' ? 'Empty' : `As ${targetLevel.toUpperCase()}`,
										isActive,
										onClick () {
											setAttributes({ asLevel: targetLevel })
										},
										role: 'menuitemradio',
									}
								})}
							/>
						</div>
					</BlockControls>
				)}
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						title="Animation Settings"
						initialOpen={false}
					>
						<SelectControl
							label={'Select animation type:'}
							value={dataScrollAnimation}
							onChange={(value) => setAttributes({ dataScrollAnimation: value })}
							options={[
								{ value: 'fadeIn', label: 'Fade In' },
								{ value: 'fadeUp', label: 'Fade Up' },
								{ value: 'fadeLeft', label: 'Fade Left' },
								{ value: 'fadeRight', label: 'Fade Right' },
								{ value: 'splitText', label: 'Split Text' },
							]}
						/>
						<TextControl
							label="Animation Duration:"
							value={dataScrollDuration || ''}
							onChange={(value) => setAttributes({ dataScrollDuration: value })}
							help="Enter an animation duration in seconds"
						/>
						<TextControl
							label="Animation Delay:"
							value={dataScrollDelay || ''}
							onChange={(value) => setAttributes({ dataScrollDelay: value })}
							help="Enter a delay in seconds"
						/>
						<TextControl
							label="Animation Order:"
							value={dataScrollOrder}
							onChange={(value) => setAttributes({ dataScrollOrder: value })}
							help="Enter an order in numbers"
						/>
						<TextControl
							label="Animation stagger:"
							value={dataScrollStagger || ''}
							onChange={(value) => setAttributes({ dataScrollStagger: value })}
							help="Enter an stagger in seconds"
						/>
					</PanelBody>
				</InspectorControls>
			</div>
		)
	}
}, 'withInspectorControls')

addFilter(
	'editor.BlockEdit',
	'vit/with-inspector-controls',
	withInspectorControls,
	20
)

// Add custom attributes to save element
const addCustomAttributes = (props, blockType, attributes) => {
	if (!supportedBlocks.includes(blockType.name)) {
		return props
	}

	const { dataScrollAnimation, dataScrollDuration, dataScrollDelay, dataScrollOrder, dataScrollStagger, asLevel } = attributes

	// Save all attributes to the block's data attributes
	if (dataScrollAnimation) {
		props['data-scroll-item'] = 'data-scroll-item'
		props['data-scroll-animation'] = dataScrollAnimation
	}

	if (dataScrollDuration) {
		props['data-scroll-duration'] = dataScrollDuration
	}

	if(dataScrollDelay) {
		props['data-scroll-delay'] = dataScrollDelay
	}

	if(dataScrollOrder) {
		props['data-scroll-order'] = dataScrollOrder
	}

	if(dataScrollStagger) {
		props['data-scroll-stagger'] = dataScrollStagger
	}

	// Add class for asLevel
	if (blockType.name === 'core/heading') {
		// Remove any existing as-* classes
		const cleanClassName = props.className ? props.className.split(' ').filter(cls => !cls.startsWith('as-')).join(' ') : ''
		// Only add as-* class if asLevel is not empty
		props.className = asLevel ? `${cleanClassName} as-${asLevel}`.trim() : cleanClassName
	}

	return props
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'vit/add-custom-attributes',
	addCustomAttributes
)

const applyChangesEditor = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		const {
			attributes: { asLevel },
			className,
			name,
		} = props

		if (name !== 'core/heading') {
			return <BlockListBlock {...props} />
		}

		// Remove any existing as-* classes
		const cleanClassName = className ? className.split(' ').filter(cls => !cls.startsWith('as-')).join(' ') : ''
		// Only add as-* class if asLevel is not empty
		const newClassName = asLevel ? `${cleanClassName} as-${asLevel}`.trim() : cleanClassName

		return (
			<BlockListBlock
				{...props}
				className={newClassName}
			/>
		)
	}
}, 'addEditorClass')

addFilter(
	'editor.BlockListBlock',
	'vit/add-editor-class',
	applyChangesEditor
)
