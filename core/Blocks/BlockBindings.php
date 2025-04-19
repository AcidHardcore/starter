<?php
/**
 * Register Blocks
 *
 * @package  block-starter
 */

namespace Starter\Blocks;

use Starter\Base\BaseController;


/**
 * Newblock block.
 */
class BlockBindings extends BaseController
{

    /**
     * Register function is called by default to get the class running
     *
     * @return void
     */
    public function register()
    {
	    add_action( 'init',  array($this,'register_block_bindings') );
    }

	public function register_block_bindings() {
		register_block_bindings_source( 'starter/post-title', array(
			'label'              => __( 'Post Title', 'starter' ),
			'get_value_callback' => array($this,'title_bindings')
		));
	}

	public function title_bindings( $source_args ) {
//  if ( ! isset( $source_args['key'] )) {
//    return null;
//  }

//  if ( 'hello' === $source_args['key'] && function_exists('hello_dolly_get_lyric')) {
		return get_the_title();
//  }

//  return null;
	}
	/**
	 * Can be added
	 * <!-- wp:paragraph {
	 * "metadata":{
	 * "bindings":{
	 * "content":{
	 * "source":"starter/post-title",
	 * "args":{
	 * "key":"hello"
	 * }
	 * }
	 * }
	 * }
	 * } -->
	 * <p>Displays a random lyric from the Hello Dolly plugin if installed.</p>
	 * <!-- /wp:paragraph -->
	 */





}
