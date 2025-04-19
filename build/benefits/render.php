<?php
/**
 * Example block.
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during backend preview render.
 * @param int $post_id The post ID the block is rendering content against.
 *                     This is either the post ID currently being displayed inside a query loop,
 *                     or the post ID of the post hosting this block.
 * @param array $context The context provided to the block by the post or it's parent block.
 */

$inner_blocks = $block->parsed_block['innerBlocks'] ?? [];
$benefits = $attributes['benefits'] ?? [];
$type = $attributes['type'] ?? '';
?>

<section

	<?php echo wp_kses_data( get_block_wrapper_attributes(
		[
			'class' => 'benefits benefits--' . $type,
		]
	) ); ?>
>

  <div class="container">
    <div class="benefits__head">

      <?php get_template_part('template-parts/block/intro', null, [
          'blocks' => $inner_blocks,
      ]);?>

    </div>
    <?php if(!empty($benefits)) :?>
    <div class="benefits__cont">
      <?php foreach ($benefits as $i => $benefit) :?>

      <div data-aos="fade-up" data-aos-delay="<?= $i * 100 ?>" class="benefits__item">
        <div class="benefits__heading">
          <div class="benefits__icon">
            <?php get_template_part('template-parts/block/img', null, [
                'image' => $benefit['image_id'] ?? null,
            ]);?>
          </div>

          <?php get_template_part('template-parts/block/title', null, [
              'title' => $benefit['title'] ?? '',
              'tag' => 'span'
          ]);?>

        </div>

        <?php get_template_part('template-parts/block/editor', null, [
            'html' => $benefit['text'] ?? '',
        ]);?>

      </div>

      <?php endforeach; ?>
    </div>
    <?php endif; ?>
  </div>
</section>
