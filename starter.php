<?php
/**
 * Plugin Name:       Starter
 * Description:       This is a starter block plugin.
 * Requires at least: 6.2
 * Requires PHP:      8.1.9
 * Version:           0.1.0
 * Author:            Vitalii Ivanychko
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       starter
 *
 * @package           starter
 */

// If this file is called firectly, abort!!!
defined( 'ABSPATH' ) or die( 'No Access!' );

// Require once the Composer Autoload.
if ( file_exists( __DIR__ . '/lib/autoload.php' ) ) {
	require_once __DIR__ . '/lib/autoload.php';
}

/**
 * The code that runs during plugin activation.
 *
 * @return void
 */
function activate_starter_plugin() {
	Starter\Base\Activate::activate();
}
register_activation_hook( __FILE__, 'activate_starter_plugin' );

/**
 * The code that runs during plugin deactivation.
 *
 * @return void
 */
function deactivate_starter_plugin() {
    Starter\Base\Deactivate::deactivate();
}
register_deactivation_hook( __FILE__, 'deactivate_starter_plugin' );

/**
 * Initialize all the core classes of the plugin.
 */
if ( class_exists( 'Starter\\Init' ) ) {
    Starter\Init::register_services();
}
