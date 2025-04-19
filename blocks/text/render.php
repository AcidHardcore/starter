<?php
/**
* Dynamic Block Template.
*	@param   array $attributes - A clean associative array of block attributes.
* @param   array $block - All the block settings and attributes.
* @param   string $content - The block inner HTML (usually empty unless using inner blocks).
*/


$heading = $attributes["heading"] ?? '';
$body = $attributes["body"] ?? null;
$image_id = $attributes["image_id"] ?? null;
$images = $attributes["images"] ?? null;

$layout_variant = $attributes["layout_variant"] ?? '';

?>


<div <?php echo get_block_wrapper_attributes(["class" => 'variant-' . $layout_variant]); ?>>
	<?php foreach ($images as $image_id) :?>
  <div class="cta-image-container">
		<?php echo wp_get_attachment_image( $image_id, "full" ); ?>
	</div>
  <?php endforeach; ?>
	<div class="cta-text-container">
		<h2><?php echo $heading ?></h2>
<!--		<p>--><?php //echo $body ?><!--</p>-->
<!--		--><?php //echo $content; ?>
    <?= $attributes['title']?>
	</div>
</div>
