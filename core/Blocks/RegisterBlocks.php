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
class RegisterBlocks extends BaseController
{

    /**
     * Register function is called by default to get the class running
     *
     * @return void
     */
    public function register()
    {
        add_action('init', array($this, 'register_all_blocks'));
    }


    public function register_all_blocks()
    {
        $block_directories = glob($this->plugin_path . "build/*", GLOB_ONLYDIR);
        foreach ($block_directories as $block) {
            register_block_type($block);
        }
    }
}
