/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n'

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
  useBlockProps,
  RichText,
  MediaPlaceholder,
  InspectorControls,
  InnerBlocks,
  ColorPaletteControl,
  AlignmentToolbar,
  MediaUpload,
  MediaUploadCheck
} from '@wordpress/block-editor'

import {
  PanelBody,
  RadioControl,
  SelectControl,
  ToggleControl,
  TextControl,
  TextareaControl,
  Button,
  Spinner,
  BaseControl,
  FormTokenField
} from '@wordpress/components'

import {
  useSelect
}
  from '@wordpress/data'

import {
  useState
}
  from 'react'
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit ({ attributes, setAttributes }) {

  // --- Begin Delete ---
  // const [ showLinkPopover, setShowLinkPopover ] = useState( false );
  // const toggleLinkPopover = () => {
  // 		setShowLinkPopover( ( state ) => ! state );
  // };
  // --- End Delete ---

  /*const ALLOWED_BLOCKS = [ 'core/buttons' ];

  const MY_TEMPLATE = [
    ['core/buttons', {},
      [
        ['core/button', {placeholder: "Add Button text..."}],
        ['core/button', {placeholder: "Add Button text..."}],
      ]
    ],
  ];*/

  const ALLOWED_BLOCKS = [
    'core/image',
    'core/paragraph',
    'core/columns',
    'core/heading',
  ]

  const MY_TEMPLATE = [['core/columns', {}, [
    ['core/column', {}, [
      ['core/image'],
    ]],
    ['core/column', {}, [
      ['core/heading', {
        level: 3,
        placeholder: 'Enter side title...'
      }],
      ['core/paragraph', {
        placeholder: 'Enter side content...'
      }],
    ]],
  ]]]

  // single image
  const { mediaId, media } = useSelect(select => {
    return {
      mediaId: attributes.image,
      media: select('core').getMedia(attributes.image)
    }
  }, [attributes.image])

// multiple images
  const { mediaIds, medias } = useSelect(select => {
    const medias = []
    attributes.images.forEach((id) => {
      const img = select('core').getMedia(id)
      if (img) {
        medias.push(img)
      }
    })
    return {
      mediaIds: attributes.images,
      medias: medias
    }
  }, [attributes.images])

//get Pages
// 	https://rudrastyh.com/gutenberg/get-posts-in-dynamic-select-control.html
  const { pages } = useSelect((select) => {
    const { getEntityRecords } = select('core')

    // Query args
    const args = {
      status: 'publish',
    }

    return {
      pages: getEntityRecords('postType', 'page', args),
    }

    // 	return select( 'core' ).getEntityRecords( 'postType', 'page', { status : 'publish' } );
  })

// populate options for <SelectControl>
  let options = []
  if (pages) {
    options.push({ value: 0, label: 'Select a page' })
    pages.forEach((page) => {
      options.push({ value: page.id, label: page.title.rendered })
    })
  } else {
    options.push({ value: 0, label: 'Loading...' })
  }

  //diplay post tags with a multi select
  const { tags } = useSelect((select) => {
    const { getEntityRecords } = select('core')

    return {
      tags: getEntityRecords('taxonomy', 'post_tag'),
    }
  })
 //convert ids to names
 //  https://gist.github.com/florianbrinkmann/167939b3e0a8c33a5ae3f1c0dc561859
  let tagNames = []
  let tagsFieldValue = []
  if (tags !== null) {
    tagNames = tags.map((tag) => tag.name)
    tagsFieldValue = attributes.tags.map((tagId) => {
      let wantedTag = tags.find((tag) => {
        return tag.id === tagId
      })
      if (wantedTag === undefined || !wantedTag) {
        return false
      }
      return wantedTag.name
    })
  }

  return (
    <>

      {/* --- Begin Delete --- */}
      {/* Begin Toolbar Zone */}
      {/* <BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ link }
						label="Link"
						onClick={toggleLinkPopover}
						isPressed={showLinkPopover}
					/>
				</ToolbarGroup>
				{showLinkPopover && (
					<Popover>
						<LinkControl
							searchInputPlaceholder="Search here..."
							value={ attributes.link }
							onChange={ ( newLink ) => {
								console.log(newLink)
								setAttributes( { link: {...newLink, title: attributes.link.title || ""} } ) }
							}
						>
						</LinkControl>
					</Popover>
				)}
			</BlockControls> */}
      {/* End Toolbar Zone */}
      {/* --- End Delete --- */}

      {/* Begin Sidebar Inspector Zone */}
      <InspectorControls>
        <PanelBody title="Settings">
          <SelectControl
            label="Layout Variant:"
            onChange={(val) => setAttributes({ layout_variant: val })}
            value={attributes.layout_variant}
            options={
              [
                {
                  label: 'Text Right',
                  value: 'text-right'
                },
                {
                  label: 'Text Left',
                  value: 'text-left'
                }
              ]
            }
          />

          <AlignmentToolbar
            value={attributes.textAlign}
            onChange={(nextAlign) => {setAttributes({ textAlign: nextAlign })}}
          />

          <SelectControl
            label={__('Select some users:')}
            value={attributes.user}
            onChange={(newValue) => setAttributes({ user: newValue })}
            options={[
              { value: null, label: 'Select a User', disabled: true },
              { value: 'a', label: 'User A' },
              { value: 'b', label: 'User B' },
              { value: 'c', label: 'User c' },
            ]}
          />

          {/*pages*/}
          <SelectControl
            label="Select a page"
            onChange={(newPage) => setAttributes({ page: newPage })}
            value={attributes.page}
            options={options}
          />

          {/*multi tags*/}
          <FormTokenField
            value={tagsFieldValue}
            suggestions={tagNames}
            onChange={(selectedTags) => {
              let selectedTagsArray = []
              selectedTags.map(
                (tagName) => {
                  const matchingTag = tags.find((tag) => {
                    return tag.name === tagName
                  })
                  if (matchingTag !== undefined) {
                    selectedTagsArray.push(matchingTag.id)
                  }
                }
              )
              setAttributes({ tags: selectedTagsArray })
            }}

          />

          <ToggleControl
            label="Fixed Background"
            help={attributes.toggle ? 'Has fixed background.' : 'No fixed background.'}
            checked={attributes.toggle}
            onChange={(newToggle) => setAttributes({ toggle: newToggle })}
          />

          <RadioControl
            label="Align"
            help="Choose an alignment."
            selected={attributes.align}
            options={[
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' },
            ]}
            onChange={(newAlign) => setAttributes({ align: newAlign })}
          />

          <ColorPaletteControl
            value={attributes.colorValue}
            onChange={(newValue) => setAttributes({ colorValue: newValue })}
          />
        </PanelBody>
      </InspectorControls>
      {/* End Sidebar Inspector Zone */}


      {/* Begin Main Block Zone */}
      <div {...useBlockProps({ className: `variant-${attributes.layout_variant}` })}>
        <div className="cta-image-container">
          {attributes.image_url && attributes.image_id ? (
            <>
              <img src={attributes.image_url}/>
              <button className="button-remove" onClick={() => setAttributes({ image_url: '', image_id: null })}>Remove</button>
            </>
          ) : (
            <MediaPlaceholder
              onSelect={
                (image) => {
                  setAttributes({ image_url: image.url, image_id: image.id })
                }
              }
              allowedTypes={['image']}
              multiple={true}
              labels={{ title: 'CTA Image' }}
            >
            </MediaPlaceholder>
          )
          }
        </div>
        <div className="cta-text-container">
          <RichText
            tagName="h2"
            allowedFormats={[]}
            value={attributes.heading}
            onChange={(heading) => setAttributes({ heading })}
            placeholder="This is the headline"
          />
          <RichText
            tagName="p"
            allowedFormats={[]}
            value={attributes.body}
            onChange={(body) => setAttributes({ body })}
            placeholder="This is the body copy"
          />
          <InnerBlocks
            allowedBlocks={ALLOWED_BLOCKS}
            template={MY_TEMPLATE}
          />

          <TextControl
            label="Title"
            value={attributes.title}
            onChange={(newTitle) => {setAttributes({ title: newTitle })}}
          />

          <TextareaControl
            label="Long Text"
            value={attributes.longTitle}
            onChange={(newLongTitle) => {setAttributes({ longTitle: newLongTitle })}}
          />

          <RichText
            value={attributes.cont}
            onChange={(newContent) => {setAttributes({ cont: newContent })}}
            placeholder={__('Heading...')}
          />
          {/*single image*/}
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) =>
                setAttributes({ image: media.id })
              }
              allowedTypes={['image']}
              value={attributes.image}
              render={({ open }) => (
                <div>
                  {!mediaId && <Button variant="secondary" onClick={open}>Upload Image</Button>}
                  {!!mediaId && !media && <Spinner/>}
                  {!!media && media &&
                    <Button variant="link" onClick={open}>
                      <img src={media.source_url}/>
                    </Button>
                  }
                </div>
              )}
            />
          </MediaUploadCheck>
          {!!mediaId && media &&
            <Button onClick={() => setAttributes({ image: 0 })} isLink isDestructive>
              Remove image
            </Button>
          }

          {/*{multiple image}*/}
          <BaseControl label="Upload Multiple Images">
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media) =>
                  setAttributes({ images: media.map(image => image.id) })
                }
                multiple={true}
                allowedTypes={['image']}
                value={attributes.images}
                render={({ open }) => (
                  <div className="images-grid">
                    {mediaIds.length > 0 && medias.length === 0 && <Spinner/>}
                    {!!medias && medias &&
                      medias.map(image =>
                        <div className="image-container">
                          <img src={image.source_url}/>
                          <Button onClick={() => setAttributes({ images: attributes.images.filter(function (item) {return item !== image.id}) })} isLink isDestructive>
                            Remove image
                          </Button>
                        </div>
                      )
                    }
                    <Button variant="secondary" onClick={open}>Add images</Button>
                  </div>
                )}
              />
            </MediaUploadCheck>
          </BaseControl>

        </div>
      </div>
      {/* End Main Block Zone */}

    </>
  )
}
