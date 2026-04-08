import './editor.scss'

import {
  useBlockProps,
} from '@wordpress/block-editor'

import { Spinner } from '@wordpress/components'
import {
  useSelect
} from '@wordpress/data'

import clsx from 'clsx'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {WPElement} Element to render.
 */

export default function Edit({ attributes, setAttributes, className, style }) {
  const blockProps = useBlockProps({
    className: clsx(
      className,
      'people',
    ),
    style,
  })

  // Fetch people posts with embedded media
  const { people, hasResolved } = useSelect((select) => {
    const { getEntityRecords, hasFinishedResolution } = select('core')

    const peopleData = getEntityRecords('postType', 'member', {
      per_page: -1,
      _embed: true
    })

    const resolved = hasFinishedResolution('getEntityRecords', [
      'postType',
      'member',
      {
        per_page: -1,
        _embed: true
      }
    ])

    return {
      people: peopleData,
      hasResolved: resolved
    }
  })

  // Get person data
  const getPersonData = (person) => {
    // Check multiple possible locations for ACF fields
    const suffix = person.acf?.suffix || person.meta?.suffix || ''
    const position = person.acf?.position || person.meta?.position || ''
    const linkedin = person.acf?.linkedin || person.meta?.linkedin || ''

    // Get featured image from embedded data
    let imageUrl = null
    if (person['_embedded'] &&
      person['_embedded']['wp:featuredmedia'] &&
      person['_embedded']['wp:featuredmedia'][0]) {
      imageUrl = person['_embedded']['wp:featuredmedia'][0].source_url
    }

    return { suffix, position, linkedin, imageUrl }
  }

  // Loading state
  if (!hasResolved || people === null) {
    return (
      <div {...blockProps}>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Spinner />
          <p style={{ marginTop: '10px', color: '#666' }}>Loading members...</p>
        </div>
      </div>
    )
  }

  // Empty state
  if (!people || people.length === 0) {
    return (
      <div {...blockProps}>
        <div>
          <p>
            No members found. Add some members to the "member" post type to display them here.
          </p>
        </div>
      </div>
    )
  }

  let peopleDisplay = people.map((person) => {
    const { suffix, position, linkedin, imageUrl } = getPersonData(person)

    return (
      <div key={person.id} className="person">
        <div className="person__image">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={person.title?.rendered || ''}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999'
            }}>
              No image
            </div>
          )}
        </div>

        <h3 className="as-h6 bold mb0">
          <span dangerouslySetInnerHTML={{
            __html: person.title?.rendered || ''
          }} />
          {suffix && (
            <span dangerouslySetInnerHTML={{
              __html: `, ${suffix}`
            }} />
          )}
        </h3>

        {position && (
          <div
            className="person__position"
            dangerouslySetInnerHTML={{ __html: position }}
          />
        )}

        {linkedin && (
          <div className="person__social">

            <a className="social__icon"
               href={linkedin}
               target="_blank"
               title="Linkedin"
               rel="noopener noreferrer"
               onClick={(e) => e.preventDefault()}
            >
              <i className="icon icon--social-li"></i>
              <span className="visually-hidden">Linkedin</span>

            </a>
          </div>
        )}
      </div>
    )
  })

  return (
    <div {...blockProps}>
      <div className="people__grid">
        {peopleDisplay}
      </div>
    </div>
  )
}
