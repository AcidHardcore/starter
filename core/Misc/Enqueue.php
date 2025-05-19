<?php

namespace Starter\Misc;

use Starter\Base\BaseController;

use function add_action;
use function add_filter;
use function wp_enqueue_script;
use function wp_register_script;
use function get_theme_file_uri;
use function get_theme_file_path;

class Enqueue extends BaseController {


	public function register() {
		add_action( 'wp_enqueue_scripts', array( $this, 'action_enqueue' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'action_enqueue' ) );
	}


	public function action_enqueue() {

//		wp_enqueue_script(
//			'skeleton-wp-wow',
//			get_theme_file_uri( '/assets/js/wow.js' ),
//			array(),
//			skeleton_wp()->get_asset_version( get_theme_file_path( '/assets/js/wow.js' ) ),
//			array(
//        'strategy'  => 'defer',
//        'in_footer' => true
//      )
//		);
//
//		wp_register_style(
//			'skeleton-wp-swiper',
//			get_theme_file_uri( '/assets/css/swiper.css' ),
//			array(),
//			skeleton_wp()->get_asset_version( get_theme_file_path( '/assets/css/swiper.css' ) ),
//		);
//
		wp_register_script(
			'starter-swiper',
			get_theme_file_uri( '/assets/js/swiper-bundle.js' ),
			array(),
			Helpers::get_asset_version( get_theme_file_path( '/assets/js/swiper-bundle.js' ) ),
			array(
				'strategy'  => 'defer',
				'in_footer' => true
			)
		);
//
//		wp_register_script(
//			'skeleton-wp-slick',
//			get_theme_file_uri( '/assets/js/slick.min.js' ),
//			array(),
//			skeleton_wp()->get_asset_version( get_theme_file_path( '/assets/js/slick.min.js' ) ),
//			array(
//				'strategy'  => 'defer',
//				'in_footer' => true
//			)
//		);

	}

}
