<?php
/**
 * The template for displaying pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

        <?php
		//if(!is_front_page() && !is_404()) {
		//	if( function_exists('kama_breadcrumbs') ) kama_breadcrumbs(' → ');
		//}
		?>

		<?php
		// Start the loop.
		while ( have_posts() ) : the_post();

			// Include the page content template.
			get_template_part( 'content', 'page' );

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		// End the loop.
		endwhile;
		?>

		</main><!-- .site-main -->
	</div><!-- .content-area -->

<?php

if ( is_page( 5 ) ){
    ?> <div class="di_share"><div class="di_podelitsya">Поделиться страницей:</div> <?php
    echo do_shortcode('[ssba]');
    ?> <a class="di_youtube" target="_blank" title="YouTube" href="https://www.youtube.com/channel/UChpStI-k3rdafYTLI8j904A">youtube</a> </div> <?php
}
?>


<?php get_footer(); ?>
