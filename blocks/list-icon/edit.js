import './editor.scss'
import {
  InspectorControls,
  MediaPlaceholder, RichText,
  useBlockProps,
  useInnerBlocksProps,
} from '@wordpress/block-editor'

import clsx from 'clsx'
import { Button, PanelBody, PanelRow, SelectControl, Spinner, Notice, TextControl, TextareaControl } from '@wordpress/components'
import { trash } from '@wordpress/icons'
import { useEffect, useState } from '@wordpress/element'
import { RawHTML } from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch'
import { __ } from '@wordpress/i18n'
import { colorOptions } from '../../src/options/color'

export default function Edit ({ attributes, setAttributes, className, style }) {
  const {
    title,
    text,
    isWow,
    wowDelay = 0.05,
    image_url,
    image_id,
    image_alt,
    image_srcset,
    image_sizes,
    image_width,
    image_height,
    image_loading,
    image_mime,
    svg_content,
  } = attributes

  const [isLoadingSVG, setIsLoadingSVG] = useState(false)

  const blockProps = useBlockProps({
    className: clsx(
      'list-icons__item',
      isWow && 'wow--in-up',
      className
    ),
    style,
    'data-wow-delay': wowDelay
  })

  const isSVG = image_mime === 'image/svg+xml' ||
    image_url?.toLowerCase().endsWith('.svg')

  const fetchSVGContent = async (mediaId) => {
    setIsLoadingSVG(true)
    try {
      const media = await apiFetch({ path: `/wp/v2/media/${mediaId}` })
      if (
        media?.media_type === 'image' &&
        media?.mime_type === 'image/svg+xml' &&
        media?.source_url
      ) {
        const response = await fetch(media.source_url)
        const svgText = await response.text()
        if (svgText) {
          setAttributes({ svg_content: svgText })
        }
      }
    } catch (error) {
      console.error('Failed to fetch SVG:', error)
    } finally {
      setIsLoadingSVG(false)
    }
  }

  useEffect(() => {
    if (isSVG && image_id && !svg_content && !isLoadingSVG) {
      fetchSVGContent(image_id)
    }
  }, [image_id, image_url, svg_content, isSVG])

  const onImageChange = (image) => {
    const newIsSVG = image.mime === 'image/svg+xml' ||
      image.url?.toLowerCase().endsWith('.svg')

    setAttributes({
      image_url: image.url,
      image_id: image.id,
      image_alt: image.alt,
      image_srcset: image.sizes?.full?.srcset || '',
      image_sizes: image.sizes?.full?.sizes || '',
      image_width: image.width,
      image_height: image.height,
      image_loading: 'lazy',
      image_mime: image.mime || image.subtype,
      svg_content: null,
    })

    // Immediately fetch SVG content if it's an SVG
    if (newIsSVG && image.id) {
      fetchSVGContent(image.id)
    }
  }

  const onRemoveImage = () => {
    setAttributes({
      image_url: '',
      image_id: null,
      image_alt: '',
      image_srcset: '',
      image_sizes: '',
      image_width: null,
      image_height: null,
      image_loading: 'lazy',
      image_mime: '',
      svg_content: null,
    })
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Settings')}>
          <PanelRow>Image</PanelRow>

          {image_url && image_id ? (
            <div className="image-container">
              {isLoadingSVG ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Spinner/>
                  <p>Loading SVG...</p>
                </div>
              ) : isSVG && svg_content ? (
                <div className="inline-svg">
                  <RawHTML>{svg_content}</RawHTML>
                </div>
              ) : (
                <img
                  src={image_url}
                  alt={image_alt}
                  className={`wp-image-${image_id}`}
                  {...(image_srcset && { srcSet: image_srcset })}
                  {...(image_sizes && { sizes: image_sizes })}
                  {...(image_width && { width: image_width })}
                  {...(image_height && { height: image_height })}
                  loading={image_loading}
                  decoding="async"
                />
              )}
              <Button
                className="remove-image-button"
                icon={trash}
                size="small"
                onClick={onRemoveImage}
                label="Remove image"
                isDestructive
                showTooltip
              />
            </div>
          ) : (
            <MediaPlaceholder
              onSelect={onImageChange}
              allowedTypes={['image']}
              multiple={false}
              labels={{ title: 'Image' }}
            />
          )}

          <PanelRow>Image Loading</PanelRow>
          <SelectControl
            onChange={(val) => setAttributes({ image_loading: val })}
            value={image_loading}
            options={[
              { label: 'Eager', value: 'eager' },
              { label: 'Lazy', value: 'lazy' }
            ]}
            __next40pxDefaultSize
          />

          <PanelRow>Title</PanelRow>
         <TextControl
           onChange={(val) => setAttributes({ title: val })}
           value={title}
           __next40pxDefaultSize
         />

          <PanelRow>Text</PanelRow>
          <TextareaControl
            onChange={(val) => setAttributes({ text: val })}
            value={text}
            __next40pxDefaultSize
          />

        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        {isSVG && !svg_content && (
          <Notice status="warning" isDismissible={false}>
            Loading SVG content... Please wait before saving.
          </Notice>
        )}

        <div className="list-icons__icon">
          {image_url && image_id ? (
            <div className="image-wrapper">
              {isLoadingSVG ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Spinner/>
                </div>
              ) : isSVG && svg_content ? (
                <div className="inline-svg">
                  <RawHTML>{svg_content}</RawHTML>
                </div>
              ) : !isSVG ? (
                <img
                  src={image_url}
                  alt={image_alt || ''}
                  className={`wp-image-${image_id}`}
                  {...(image_srcset && { srcSet: image_srcset })}
                  {...(image_sizes && { sizes: image_sizes })}
                  {...(image_width && { width: image_width })}
                  {...(image_height && { height: image_height })}
                  loading={image_loading}
                  decoding="async"
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Spinner/>
                  <p>Loading SVG...</p>
                </div>
              )}
              <Button
                className="remove-image-button"
                isDestructive
                size="small"
                icon={trash}
                draggable="false"
                onClick={onRemoveImage}
                showTooltip
                label={'Remove image'}
              />
            </div>
          ) : (
            <MediaPlaceholder
              onSelect={onImageChange}
              allowedTypes={['image']}
              multiple={false}
              labels={{ title: 'Image' }}
            />
          )}
        </div>
        <div className="list-icons__content">
          <RichText
            value={title}
            onChange={(val) => setAttributes({ title: val })}
            placeholder={'Add item title…'}
            tagName="h3"
            className="bold green-dark as-h6"
          />

          <RichText
            value={text}
            onChange={(val) => setAttributes({ text: val })}
            placeholder={'Add item text…'}
            tagName="div"
            className="editor editor--small"
          />
        </div>

      </div>
    </>
  )
}
