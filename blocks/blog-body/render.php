<?php
/**
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during backend preview render.
 * @param int $post_id The post ID the block is rendering content against.
 *                     This is either the post ID currently being displayed inside a query loop,
 *                     or the post ID of the post hosting this block.
 * @param array $context The context provided to the block by the post or it's parent block.
 */

use function Skeleton_WP\Skeleton_WP\skeleton_wp;

$blog_post_form = get_field('blog_post_form', 'option', false, false);
$blog_disclaimer = get_field('post_disclaimer', 'option');
$gravity_id = $attributes['gravityId'] ?? null;
$tile_bg = $attributes['tileBg'] ?? 'blue20';
$pad_top = $attributes['padTop'] ?? 'half';
$pad_bottom = $attributes['padBottom'] ?? 'half';
$bg = $attributes['bg'] ?? 'white';
$form_title = get_field('form_title', 'option');
$form_html = get_field('form_html', 'option');
$form_disclaimer = get_field('form_disclaimer', 'option');

$block_classes = implode( ' ', array_filter( [
	'block',
	'blog-body',
	sprintf( 'block--pad-top--%s', $pad_top ),
	sprintf( 'block--pad-bot--%s', $pad_bottom ),
	sprintf( 'block--bg-%s', $bg ),
] ) );
?>

<div

	<?php echo wp_kses_data( get_block_wrapper_attributes(
		[
			'class' => $block_classes,
		]
	) ); ?>
>
  <div class="wrapper">
    <div class="blog-body__wrap">
      <div class="blog-body__content">

		  <?php echo $content; // This outputs the InnerBlocks content ?>


          <?php get_template_part( 'template-parts/block/editor', null, [
                  'html' => $blog_disclaimer,
                  'size' => 'disclaimer',
                  'classes' => ['blog-body__disclaimer']
          ] ); ?>

      </div>
      <div class="blog-body__sidebar">

		  <?php ob_start(); ?>

		  <?php get_template_part( 'template-parts/block/title', null, [
			  'title'   => $form_title,
			  'tag'     => 'h2',
			  'as_tag'  => 'h6',
			  'classes' => [ 'bold' ],
		  ] ); ?>

		  <?php get_template_part( 'template-parts/block/editor', null, [
			  'html' => $form_html,
			  'size' => 'small',
		  ] ); ?>

          <?php if ( !empty( $blog_post_form ) ) : ?>
              <?= skeleton_wp()->without_content_filters( $blog_post_form ); ?>
          <?php elseif ( !empty( $gravity_id ) ) : ?>
              <?= do_shortcode( '[gravityform id="' . esc_attr( $gravity_id ) . '" title="false" description="false" ajax="true"]' ); ?>
          <?php endif; ?>

	      <?php get_template_part( 'template-parts/block/editor', null, [
		      'html' => $form_disclaimer,
		      'size' => 'disclaimer',
	      ] ); ?>

		  <?php $sidebar_content = ob_get_clean(); ?>

		  <?php get_template_part( 'template-parts/block/tile', null, [
			  'bg'      => $tile_bg,
			  'content' => $sidebar_content,
			  'is_wow'  => 1,
		  ] ); ?>

      </div>
    </div>
  </div>
</div>
