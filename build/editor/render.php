<?php
/**
 * Example block.
 *
 * @param array  $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool   $is_preview True during backend preview render.
 * @param int    $post_id The post ID the block is rendering content against.
 *                     This is either the post ID currently being displayed inside a query loop,
 *                     or the post ID of the post hosting this block.
 * @param array $context The context provided to the block by the post or it's parent block.
 */

$image = $attributes['image_id'] ?? null;
$image_url = $attributes['image_url'] ?? '';

?>

<div <?php echo wp_kses_data(get_block_wrapper_attributes(
    [
        'class' => 'text-image'
    ]
)); ?>>
	<?php

	if ( isset( $block->parsed_block['innerBlocks'] ) ) {
		foreach ( $block->parsed_block['innerBlocks'] as $innerBlock ) {

			if ( !empty( $innerBlock['innerHTML'] ) ) {
				printf("%s", $innerBlock['innerHTML']);
			}

      if($innerBlock['blockName'] == 'core/buttons') {

        foreach ($innerBlock['innerBlocks'] as $button) {
	        printf("%s", $button['innerHTML']);
        }
      }
			if ( !empty( $image ) ) {
				printf("%s", wp_get_attachment_image($image, 'full'));
		}
		}
	}
	?>
</div>
