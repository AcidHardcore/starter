<?php
/**
 * Base controller. Used for extending and path management.
 *
 * @package  MRK_Scbdemo
 */

namespace Starter\Base;

/**
 * Base controller. Used for extending and path management.
 */
class BaseController {

	/**
	 * The plugin path
	 *
	 * @var [type]
	 */
	public $plugin_path;

	/**
	 * Plugin URL
	 *
	 * @var [type]
	 */
	public $plugin_url;

	/**
	 * Plugin reference for the name of the plugin.
	 *
	 * @var [type]
	 */
	public $plugin;

	/**
	 * Construct for Base Controller.
	 */
	public function __construct() {
		$this->plugin_path = plugin_dir_path( dirname( __DIR__, 1 ) );
		$this->plugin_url  = plugin_dir_url( dirname( __DIR__, 1 ) );
		$this->plugin      = plugin_basename( dirname( __DIR__, 2 ) ) . '/starter.php';
	}
}
