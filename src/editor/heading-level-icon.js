/**
 * WordPress dependencies
 */
import {
  headingLevel1,
  headingLevel2,
  headingLevel3,
  headingLevel4,
  headingLevel5,
  headingLevel6,
  paragraph,
  swatch
} from '@wordpress/icons'
import { Icon } from '@wordpress/components'

/** @typedef {import('react').ComponentType} ComponentType */

/**
 * HeadingLevelIcon props.
 *
 * @typedef WPHeadingLevelIconProps
 *
 * @property {number} level The heading level to show an icon for.
 */

const LEVEL_TO_PATH = {
  empty: swatch,
  h0: paragraph,
  h1: headingLevel1,
  h2: headingLevel2,
  h3: headingLevel3,
  h4: headingLevel4,
  h5: headingLevel5,
  h6: headingLevel6,
}

/**
 * Heading level icon.
 *
 * @param {WPHeadingLevelIconProps} props Component props.
 *
 * @return {?ComponentType} The icon.
 */
export default function HeadingLevelIcon ({ level }) {
  if (LEVEL_TO_PATH[level]) {
    return <Icon icon={LEVEL_TO_PATH[level]}/>
  }

  return null
}
