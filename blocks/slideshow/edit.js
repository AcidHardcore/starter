import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl
} from '@wordpress/components'

import './editor.scss';
import clsx from 'clsx'
export default function Edit({attributes, setAttributes, className, style}) {

	const blockProps = useBlockProps({
		className: clsx(className,
			'slideshow'
		),
		style,
	})

	const innerBlockProps = useInnerBlocksProps(
		{className: 'swiper-wrapper'},
		{
			allowedBlocks: ['vit/slide'],
			template: [
				['vit/slide', {title: 'Slide 1', html: 'Content for slide 1'}],
				['vit/slide', {title: 'Slide 2', html: 'Content for slide 2'}],
				['vit/slide', {title: 'Slide 3', html: 'Content for slide 3'}]
			],
			orientation: 'horizontal'
		}
	)
	return (
		<>
			<InspectorControls>
				<PanelBody title="Slideshow Settings">
					<TextControl
						label="Slide Interval (mc)"
						help="Select how long each slide of the carousel is shown in mili seconds"
						value={attributes.interval}
						onChange={(val) => { setAttributes({ interval: val })}}
					/>
				</PanelBody>
			</InspectorControls>

			<section {...blockProps}>
				<div className="swiper slideshow__slider">
					<div {...innerBlockProps} />
					<div className="swiper-button-next"></div>
					<div className="swiper-button-prev"></div>
					<div className="swiper-pagination"></div>
				</div>
			</section>

		</>
	);
}
