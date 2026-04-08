import './editor.scss'
import {
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
} from '@wordpress/block-editor'

import clsx from 'clsx'
import { useDispatch, useSelect } from '@wordpress/data'
import { useEffect } from '@wordpress/element'
import {
  PanelBody,
  ToggleControl
} from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function Edit ({attributes, setAttributes, className, style, clientId }) {

  const {
    isWow
  } = attributes

  const { childBlocks } = useSelect((select) => {
    const { getBlock } = select('core/block-editor')
    const block = getBlock(clientId)
    return {
      childBlocks: block?.innerBlocks || []
    }
  }, [clientId])

  const { updateBlockAttributes } = useDispatch('core/block-editor')

  useEffect(() => {
    childBlocks.forEach((block, index) => {
      //Update wowDelay
      const delay = Math.round((index * 0.05) * 10) / 10
      if (block.attributes.wowDelay !== delay) {
        updateBlockAttributes(block.clientId, { wowDelay: delay })
      }
      // Update child blocks when isWow changes
      updateBlockAttributes(block.clientId, { isWow })
    })
  }, [isWow, childBlocks.length, updateBlockAttributes])

  const innerBlockProps = useInnerBlocksProps(
    { className: clsx(
        'list-icons',
        isWow && 'wow-sync',
      )
    },
    {
      allowedBlocks: [
        'vit/list-icon',
      ],
      template: [
        [
          'vit/list-icon',
          {
            isWow: isWow,
          }
        ],
      ]
    }
  )

  const blockProps = useBlockProps({
    className: clsx(
      className
    ),
    style,
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Settings')}>
          <ToggleControl
            label="Enable animation"
            checked={isWow}
            onChange={(val) => setAttributes({ isWow: val })}
          />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <div {...innerBlockProps} />
      </div>

    </>
  )
}
