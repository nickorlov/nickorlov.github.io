<?php
get_header();

if(!is_front_page() && !is_404()) {
	if( function_exists('kama_breadcrumbs') ) kama_breadcrumbs(' → ');
}
?>
<div class="entry-header">
  <?php the_archive_title( '<h1 class="entry-title">', '</h1>' ); ?>
</div><!-- .entry-header -->
<div class="row equal-row arch-post-wrap">
<?php
if(have_posts()) : while(have_posts()) : the_post(); ?>
	<div class="col-xs-12 col-sm-6 col-md-6 equal-col">
		<article class="archive-post">
	        <a href="<?php the_permalink(); ?>" class="gallery-thumb">
	             <?php the_post_thumbnail('gallery'); ?>
	             <span class="di_zayavka di_zayavka-transparent">
	                <span>Смотреть</span>
	             </span>
	        </a>
	        <h4 class="gallery-page-heading">
	            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
	        </h4>
	        <?php
	            $gallery = array();
	            $gallery = get_post_gallery_images();
	            $total_images = 0;
	            if ( $gallery ) {
	                $gallery_images = count( $gallery );
	                echo '<div class="total-img"><i class="fa fa-camera" aria-hidden="true"></i> ' . $gallery_images . ' фотографий</div>';
	            }
	        ?>
		</article>
    </div><!-- .col -->

<?php
endwhile; endif;?>
</div> <!-- row -->
<div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12">
        <?php the_posts_pagination( array(
            'screen_reader_text' => ' ',
            'prev_text'          => '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
            'next_text'          => '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
            'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( '', 'nieuwedruk' ) . ' </span>',
        ) ); ?>
    </div>
</div>
<?php
get_footer();
?>
