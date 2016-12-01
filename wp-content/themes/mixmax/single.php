<?php
/**
 * The template for displaying all single posts and attachments
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
        
        <?php if(!is_front_page() && !is_404()) {
			if( function_exists('kama_breadcrumbs') ) kama_breadcrumbs(' → ');
		}
		?>

		<?php
		// Start the loop.
		while ( have_posts() ) : the_post();

			/*
			 * Include the post format-specific template for the content. If you want to
			 * use this in a child theme, then include a file called called content-___.php
			 * (where ___ is the post format) and that will be used instead.
			 */
			get_template_part( 'content', get_post_format() );

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

			// Previous/next post navigation.
			/*the_post_navigation( array(
            	'next_text' => '<span class="meta-nav" aria-hidden="true"></span> ' .
            		'<span class="screen-reader-text"></span> ' .
            		'<span class="post-title">%title <strong><i class="fa fa-chevron-right" aria-hidden="true"></i></strong></span>',
            	'prev_text' => '<span class="meta-nav" aria-hidden="true"></span> ' .
            		'<span class="screen-reader-text"></span> ' .
            		'<span class="post-title"><i class="fa fa-chevron-left" aria-hidden="true"></i> %title</span>',
            ) );*/

            
            
            the_post_navigation( array(
                'prev_text'                  => '<i class="fa fa-chevron-left" aria-hidden="true"></i> %title',
                'next_text'                  => '%title <i class="fa fa-chevron-right" aria-hidden="true"></i>',
                'in_same_term'               => true,
                'screen_reader_text'         => __( 'Continue Reading' ),
            ) );

		// End the loop.
		endwhile;
		?>

		</main><!-- .site-main -->
	</div><!-- .content-area -->

<?php get_footer(); ?>
