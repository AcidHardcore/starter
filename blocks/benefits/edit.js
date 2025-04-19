/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss'

import {
  useBlockProps,
  MediaPlaceholder,
  InspectorControls,
  useInnerBlocksProps,
  RichText,
} from '@wordpress/block-editor'

import {
  Icon, trash, dragHandle
} from '@wordpress/icons'

import {
  Button,
  IconButton,
  PanelBody,
  TextareaControl,
  TextControl,
  __experimentalDivider as Divider,
  PanelRow,
  SelectControl,
} from '@wordpress/components'

import { Fragment, useMemo, useCallback } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import clsx from 'clsx'

// Reusable Benefit Item Component
const BenefitItem = ({ 
  benefit, 
  index, 
  onTitleChange, 
  onTextChange, 
  onImageChange, 
  onRemoveImage, 
  onRemoveItem,
  onReorder
}) => {
  return (
    <div 
      className="benefit-item-wrapper"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'benefit', index }))
        document.body.classList.add('is-dragging-benefit')
      }}
      onDragEnd={() => {
        document.body.classList.remove('is-dragging-benefit')
      }}
      onDragOver={(e) => {
        e.preventDefault()
        e.currentTarget.classList.add('is-dragging-over')
      }}
      onDragLeave={(e) => {
        e.currentTarget.classList.remove('is-dragging-over')
      }}
      onDrop={(e) => {
        e.preventDefault()
        e.currentTarget.classList.remove('is-dragging-over')
        try {
          const data = JSON.parse(e.dataTransfer.getData('text/plain'))
          if (data.type === 'benefit' && data.index !== index) {
            onReorder(data.index, index)
          }
        } catch (error) {
          console.error('Error parsing drag data:', error)
        }
      }}
    >
      <div className="benefit-item-header">
        <Icon
          className="drag-handle"
          icon={dragHandle}
          size={24}
        />
        <span className="benefit-item-number">{index + 1}</span>
      </div>
      <Fragment>
        <PanelRow>Title</PanelRow>
        <TextControl
          className=""
          placeholder="add item title"
          value={benefit.title}
          onChange={(title) => onTitleChange(title, index)}
          __next40pxDefaultSize
        />
        <PanelRow>Text</PanelRow>
        <TextareaControl
          placeholder={'Add item text…'}
          value={benefit.text}
          onChange={(text) => onTextChange(text, index)}
          __next40pxDefaultSize
        />
        <PanelRow>Image</PanelRow>
        {benefit.image_url && benefit.image_id ? (
          <div className="image-container">
            <img src={benefit.image_url} alt={'image'}/>
            <Icon
              className="trash-icon"
              size={32}
              icon={trash}
              onClick={() => onRemoveImage(index)}
            />
          </div>
        ) : (
          <MediaPlaceholder
            onSelect={(image) => onImageChange(image, index)}
            allowedTypes={['image']}
            multiple={false}
            labels={{ title: 'Image' }}
          />
        )}
        <IconButton
          className="trash-button"
          icon="no-alt"
          label="Delete item"
          onClick={() => onRemoveItem(index)}
        />
        <Divider/>
      </Fragment>
    </div>
  )
}

// Reusable Benefit Display Component
const BenefitDisplay = ({ 
  benefit, 
  index, 
  onTitleChange, 
  onTextChange, 
  onImageChange, 
  onRemoveImage,
  onReorder
}) => {
  return (
    <div className="benefits__item">
      <div className="benefits__heading">
        <div className="benefits__icon">
          {benefit.image_url && benefit.image_id ? (
            <div className="image-container">
              <img src={benefit.image_url} alt={'image'}/>
              <Icon
                className="trash-icon"
                size={32}
                icon={trash}
                onClick={() => onRemoveImage(index)}
              />
            </div>
          ) : (
            <MediaPlaceholder
              onSelect={(image) => onImageChange(image, index)}
              allowedTypes={['image']}
              multiple={false}
              labels={{ title: 'Image' }}
            />
          )}
        </div>
        <RichText
          value={benefit.title}
          onChange={(title) => onTitleChange(title, index)}
        />
      </div>
      <RichText
        placeholder={'Add item text…'}
        value={benefit.text}
        onChange={(text) => onTextChange(text, index)}
      />
    </div>
  )
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

export default function Edit({ attributes, setAttributes, className, style }) {
  const { benefits = [], type = 'default' } = attributes

  const innerBlockProps = useInnerBlocksProps(
    {
      className: 'benefits__head'
    },
    {
      allowedBlocks: [
        'vit/title',
        'vit/editor',
        'vit/button',
      ],
      template: [
        ['vit/title', {
          level: 2,
          placeholder: 'Enter a title...'
        }],
        ['vit/editor', {},
          [
            ['core/paragraph', {
              placeholder: 'Enter a paragraph...'
            }]
          ]
        ],
      ]
    }
  )

  const blockProps = useBlockProps({
    className: clsx({
      [`benefits benefits--${type}`]: type,
    }),
    style,
  })

  // Memoized handlers
  const handleAddItem = useCallback(() => {
    setAttributes({
      benefits: [
        ...benefits,
        {
          title: '',
          text: '',
          image_id: null,
          image_url: '',
        }
      ]
    })
  }, [benefits, setAttributes])

  const handleRemoveItem = useCallback((index) => {
    const newBenefits = [...benefits]
    newBenefits.splice(index, 1)
    setAttributes({ benefits: newBenefits })
  }, [benefits, setAttributes])

  const handleTitleChange = useCallback((title, index) => {
    const newBenefits = [...benefits]
    newBenefits[index] = { ...newBenefits[index], title }
    setAttributes({ benefits: newBenefits })
  }, [benefits, setAttributes])

  const handleTextChange = useCallback((text, index) => {
    const newBenefits = [...benefits]
    newBenefits[index] = { ...newBenefits[index], text }
    setAttributes({ benefits: newBenefits })
  }, [benefits, setAttributes])

  const handleRemoveImage = useCallback((index) => {
    const newBenefits = [...benefits]
    newBenefits[index] = {
      ...newBenefits[index],
      image_id: null,
      image_url: ''
    }
    setAttributes({ benefits: newBenefits })
  }, [benefits, setAttributes])

  const handleImageChange = useCallback((image, index) => {
    const newBenefits = [...benefits]
    newBenefits[index] = {
      ...newBenefits[index],
      image_id: image.id,
      image_url: image.url
    }
    setAttributes({ benefits: newBenefits })
  }, [benefits, setAttributes])

  // Add new handler for reordering
  const handleReorder = useCallback((fromIndex, toIndex) => {
    const newBenefits = [...benefits]
    const [movedItem] = newBenefits.splice(fromIndex, 1)
    newBenefits.splice(toIndex, 0, movedItem)
    setAttributes({ benefits: newBenefits })
  }, [benefits, setAttributes])

  // Memoized components
  const benefitsFields = useMemo(() => {
    if (!benefits.length) return null
    return benefits.map((benefit, index) => (
      <BenefitItem
        key={index}
        benefit={benefit}
        index={index}
        onTitleChange={handleTitleChange}
        onTextChange={handleTextChange}
        onImageChange={handleImageChange}
        onRemoveImage={handleRemoveImage}
        onRemoveItem={handleRemoveItem}
        onReorder={handleReorder}
      />
    ))
  }, [benefits, handleTitleChange, handleTextChange, handleImageChange, handleRemoveImage, handleRemoveItem, handleReorder])

  const benefitsDisplay = useMemo(() => {
    if (!benefits.length) return null
    return benefits.map((benefit, index) => (
      <BenefitDisplay
        key={index}
        benefit={benefit}
        index={index}
        onTitleChange={handleTitleChange}
        onTextChange={handleTextChange}
        onImageChange={handleImageChange}
        onRemoveImage={handleRemoveImage}
        onReorder={handleReorder}
      />
    ))
  }, [benefits, handleTitleChange, handleTextChange, handleImageChange, handleRemoveImage, handleReorder])

  return (
    <>
      <InspectorControls group="styles">
        <PanelBody title={__('Type')}>
          <PanelRow>Type</PanelRow>
          <SelectControl
            onChange={(val) => setAttributes({ type: val })}
            value={type}
            options={[
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Alternative',
                value: 'alt'
              }
            ]}
          />
        </PanelBody>
      </InspectorControls>

      <InspectorControls>
        <PanelBody title={__('Benefits')}>
          {benefitsFields}
          <Button
            variant="primary"
            onClick={handleAddItem}
          >
            {__('Add Benefit')}
          </Button>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div {...innerBlockProps} />
        
        {benefitsDisplay && (
          <div className="benefits__cont">
            {benefitsDisplay}
          </div>
        )}
      </div>
    </>
  )
}
