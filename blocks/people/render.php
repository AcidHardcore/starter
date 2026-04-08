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

$pad_top = $attributes['padTop'] ?? 'half';
$pad_bottom = $attributes['padBottom'] ?? 'half';
$bg = $attributes['bg'] ?? 'white';

$args   = array(
	'fields'         => 'ids',
	'no_found_rows'  => true,
	'post_type'      => 'member',
	'post_status'    => 'publish',
	'posts_per_page' => - 1,
	'order'          => 'ASC',
	'orderby'        => 'menu_order'
);
$query  = new WP_Query( $args );
$people = [];
if ( $query->have_posts() ) {
	$people = $query->posts;
}

$block_classes = implode( ' ', array_filter( [
	'people',
	'swiper',
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
	<?php if ( ! empty( $people ) ) : ?>
      <div class="people__slider swiper-wrapper">
		  <?php
		  foreach ( $people as $i => $person ):
			  $link = get_the_permalink( $person );
			  $image = get_post_thumbnail_id( $person );
			  $title = get_the_title( $person );
			  $suffix = get_field( 'suffix', $person ) ?
				  ', ' . get_field( 'suffix', $person )
				  : '';
			  $position = get_field( 'position', $person );
			  $linkedin = get_field( 'linkedin', $person );
			  ?>
            <div class="person swiper-slide">

              <div class="person__image">
				  <?php get_template_part( 'template-parts/block/img', null, [
					  'image'    => $image,
					  'is_cover' => true,
				  ] ); ?>
              </div>

				<?php get_template_part( 'template-parts/block/title', null, [
					'title'   => $title . $suffix,
					'tag'     => 'h3',
					'as_tag'  => 'h6',
					'classes' => [ 'bold', 'mb0' ],
				] ); ?>

				<?php get_template_part( 'template-parts/block/editor', null, [
					'html' => $position,
				] ); ?>

				<?php get_template_part( 'template-parts/footer/social', null, [
					'links'   => [
						[
							'title' => 'Linkedin',
							'link'  => $linkedin,
							'icon'  => 'li'
						]
					],
					'classes' => [ 'person__social' ],
				] ); ?>


              <a href="<?= esc_url( $link ) ?>" class="person__link">
                <span class="visually-hidden"><?= esc_html( $person['name'] ) ?></span>
              </a>


            </div>
		  <?php endforeach; ?>
      </div>

      <div class="swiper__controls">

        <div class="swiper__pagination"></div>

        <div class="swiper__arrows">
          <div class="swiper__arrow swiper__arrow--left">
            <i class="icon icon--arrow-left"></i>
          </div>
          <div class="swiper__arrow swiper__arrow--right">
            <i class="icon icon--arrow-right"></i>
          </div>
        </div>

      </div>
	<?php endif; ?>
</div>
