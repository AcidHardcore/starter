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
        add_action( 'enqueue_block_editor_assets', array( $this, 'action_editor_enqueue' ) );
    }

    public function action_editor_enqueue() {
        $asset_file = include $this->plugin_path . 'js/index.asset.php';
        wp_enqueue_script(
            'starter-index',
            $this->plugin_url . 'js/index.js',
            $asset_file['dependencies'],
            $asset_file['version'],
        );
    }

    public function action_enqueue() {

    }

}
