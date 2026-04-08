import './editor.scss'

import {
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
} from '@wordpress/block-editor'

import clsx from 'clsx'
import { getBlockTypes } from '@wordpress/blocks'

import {
  PanelBody,
  PanelRow,
  SelectControl,
  TextControl,
  Placeholder, Notice,
} from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { colorOptions } from '../../src/options/color'

import {useState, useEffect, RawHTML} from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {WPElement} Element to render.
 */

const useGlobalSettings = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch({ path: '/skeleton-wp/v1/global-settings' })
            .then((res) => {
                setData(res);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Fetch Error:', err);
                setLoading(false);
            });
    }, []);

    return { data, loading };
};
const FormFields = () => {
    const { data, loading } = useGlobalSettings();

    if (loading) return <p>{__('Loading...')}</p>;
    if (!data) return null;

    return (
        <>
            <h2 className="bold as-h6">{data.form_title}</h2>
            <div className="editor editor--small">
                <RawHTML>{data.form_html}</RawHTML>
            </div>
        </>
    );
};

const FormDisclaimer = () => {
    const { data, loading } = useGlobalSettings();

    if (loading || !data?.form_disclaimer) return null;

    return (
        <div className="editor editor--disclaimer">
            <RawHTML>{data.form_disclaimer}</RawHTML>
        </div>
    );
};

const PostDisclaimer = () => {
    const { data, loading } = useGlobalSettings();

    if (loading || !data?.post_disclaimer) return null;

    return (
        <div className="editor editor--disclaimer blog-body__disclaimer">
            <RawHTML>{data.post_disclaimer}</RawHTML>
        </div>
    );
};

const MailChimpFormPreview = ({ gravityId }) => {
    const { data, loading } = useGlobalSettings();

    if (loading || !data?.blog_post_form) {
        if (!gravityId) {
            return (
                <Placeholder
                    label={__('Gravity Form')}
                    instructions={__('Enter a Gravity Form ID in the block settings to display the form here.')}
                />
            )
        } else {
            return (
                <div className="gravity-form-preview" style={{ padding: '1rem', background: '#f0f0f0', borderRadius: '4px' }}>
                    <p><strong>Gravity Form Preview</strong></p>
                    <p>Form ID: {gravityId}</p>
                    <p><em>The actual form will appear on the frontend.</em></p>
                </div>
            )
        }
    } else {
        return (
            <Placeholder
                label={__('MailChimp will render on the frontend.')}
            />
        )
    }
}

export default function Edit ({ attributes, setAttributes, className, style }) {

  const {
    gravityId,
    tileBg
  } = attributes

  const allCoreBlocks = getBlockTypes()
    .filter(block => block.name.startsWith('core/'))
    .map(block => block.name)

  const allowedBlocks = [...allCoreBlocks, 'vit/editor', 'vit/tile']

  const innerBlockProps = useInnerBlocksProps(
    { className: 'blog-body__content' },
    {
      allowedBlocks: allowedBlocks,
      template: [
        [
          'vit/editor',
          {},
          [
            ['core/heading', {
              placeholder: 'Enter a heading...',
              level: 2,
              style: {
                typography: {
                  fontWeight: '700'
                }
              }
            }],
            ['core/paragraph', { placeholder: 'Enter a paragraph...' }]
          ]
        ],
      ]
    }
  )

  const blockProps = useBlockProps({
    className: clsx(
      className,
      'block',
      'blog-body',
    ),
    style,
  })


    return (
    <>
      <InspectorControls>
        <PanelBody title={__('Settings')}>
          <PanelRow>Tile Background Color</PanelRow>
          <SelectControl
            onChange={(val) => setAttributes({ tileBg: val })}
            value={tileBg}
            options={colorOptions}
            __next40pxDefaultSize
          />

          <TextControl
            label="Gravity Form ID"
            value={gravityId || ''}
            onChange={(val) => setAttributes({ gravityId: val })}
            help="Enter the ID of the Gravity Form to display"
            __next40pxDefaultSize
          />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps} >
        <div className="block__content">
          <div className="wrapper">
            <div className="blog-body__wrap">
              <div className="blog-body__content">

                <div {...innerBlockProps}/>

                  <PostDisclaimer />

              </div>
              <div className="blog-body__sidebar">

                <div className={`tile tile--bg-${tileBg} wow--pop wow--delay-x`}>

                    <FormFields />

                    <MailChimpFormPreview gravityId={gravityId}/>

                    <FormDisclaimer />

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
