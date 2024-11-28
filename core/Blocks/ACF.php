<?php
/**
 * Skeleton_WP\Skeleton_WP\ACF\Component class
 *
 * @package skeleton_wp
 */

namespace Starter\Blocks;

use Starter\Base\BaseController;


/**
 * Class for managing ACF.
 *
 *
 * @link https://www.advancedcustomfields.com/resources/
 */
class ACF extends BaseController {

	/**
	 * Adds the action and filter hooks to integrate with WordPress.
	 */
	public function register() {
		add_filter( 'acf/json/load_paths', array( $this, 'json_load_paths' ) );
		add_filter( 'acf/settings/save_json/type=acf-field-group', array( $this, 'json_save_path_field_groups' ) );
		add_filter( 'acf/settings/save_json/type=acf-ui-options-page', array( $this, 'json_save_path_option_pages' ) );
		add_filter( 'acf/settings/save_json/type=acf-post-type', array( $this, 'json_save_path_post_types' ) );
		add_filter( 'acf/settings/save_json/type=acf-taxonomy', array( $this, 'json_save_path_taxonomies' ) );
		add_filter( 'acf/json/save_file_name', array( $this, 'json_filename' ), 10, 3 );
	}

	/**
	 * Set a custom ACF JSON load path.
	 *
	 * @link https://www.advancedcustomfields.com/resources/local-json/#loading-explained
	 *
	 * @param array $paths Existing, incoming paths.
	 *
	 * @return array $paths New, outgoing paths.
	 *
	 * @since 0.1.1
	 */
	public function json_load_paths( $paths ) {

		$paths[] = $this->plugin_path . '/acf-json/field-groups';
		$paths[] = $this->plugin_path . '/acf-json/options-pages';
		$paths[] = $this->plugin_path . '/acf-json/post-types';
		$paths[] = $this->plugin_path . '/acf-json/taxonomies';
error_log(print_r($paths, true));
		return $paths;
	}

	/**
	 * Set custom ACF JSON save point for
	 * ACF generated post types, field groups, taxonomies, and options pages.
	 *
	 * @link https://www.advancedcustomfields.com/resources/local-json/#saving-explained
	 *
	 * @return string $path New, outgoing path.
	 *
	 * @since 0.1.1
	 */
	public function json_save_path_post_types() {
		return $this->plugin_path . '/acf-json/post-types';
	}

	public function json_save_path_field_groups() {
		return $this->plugin_path . '/acf-json/field-groups';
	}

	public function json_save_path_taxonomies() {
		return $this->plugin_path . '/acf-json/taxonomies';
	}

	public function json_save_path_option_pages() {
		return $this->plugin_path . '/acf-json/options-pages';
	}

	/**
	 * Customize the file names for each file.
	 *
	 * @link https://www.advancedcustomfields.com/resources/local-json/#saving-explained
	 *
	 * @param string $filename The default filename.
	 * @param array $post The main post array for the item being saved.
	 *
	 * @return string $filename
	 *
	 * @since  0.1.1
	 */
	public function json_filename( $filename, $post ) {
		$filename = str_replace(
			array(
				' ',
				'_',
			),
			array(
				'-',
				'-',
			),
			$post['title']
		);

		$filename = strtolower( $filename ) . '.json';

		return $filename;
	}


}
