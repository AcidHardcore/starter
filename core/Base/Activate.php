<?php
/**
 * Activation Class.
 *
 * @package  starter
 */

namespace Starter\Base;

/**
 * Activation Class.
 */
class Activate {

	/**
	 * Call default activation and rewrite flush.
	 *
	 * @return void
	 */
	public static function activate() {
		flush_rewrite_rules();
	}
}
