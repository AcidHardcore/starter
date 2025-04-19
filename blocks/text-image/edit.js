/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss'

import {
  useBlockProps,
  InnerBlocks,
  MediaPlaceholder
} from '@wordpress/block-editor'

import {
  Icon, trash
}
from '@wordpress/icons';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

export default function ({ attributes, setAttributes }) {

  const ALLOWED_BLOCKS = [
    'core/heading',
    'core/paragraph',
    'core/image',
    'core/button',
    'core/columns'
  ]

  const TEMPLATE = [
    ['core/heading', {
      level: 2,
      placeholder: 'Enter a title...'
    }],
    ['core/paragraph', {
      placeholder: 'Enter a paragraph...'
    }],
    ['core/buttons', {}]
  ]

  return (
    <>
      <div { ...useBlockProps() } >
        <div className="grid">
        <InnerBlocks
          allowedBlocks={ALLOWED_BLOCKS}
          template={TEMPLATE}
        />

          {attributes.image_url && attributes.image_id ? (
            <div className="image-container">
              <img src={attributes.image_url} alt={'image'} />
              <Icon
                className='trash-icon'
                size={32}
                icon={ trash }
                onClick={() => setAttributes({imageURL: null, imageID: null})}
              />
            </div>
          ) : (
            <MediaPlaceholder
              onSelect={
                (image) => {
                  setAttributes({ image_url: image.url, image_id: image.id })
                }
              }
              allowedTypes={['image']}
              multiple={false}
              labels={{ title: 'Image' }}
            >
            </MediaPlaceholder>
          )
          }
        </div>
      </div>
    </>
  )

}
