/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss'

import {
  useBlockProps,
  InnerBlocks
} from '@wordpress/block-editor'

import {
  Icon, trash
}
  from '@wordpress/icons'
import clsx from 'clsx'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

export default function ({ attributes, setAttributes, style }) {

  const TEMPLATE = [
    ['core/paragraph', {
      placeholder: 'Enter a paragraph...'
    }],
  ]

  const blockProps = useBlockProps({
    className: 'editor',
  })

  return (
    <>
      <div {...blockProps} >

        <InnerBlocks
          template={TEMPLATE}
        />

      </div>
    </>
  )

}
