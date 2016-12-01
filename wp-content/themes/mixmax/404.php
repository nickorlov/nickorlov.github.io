<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
            <div class="img-404"><img src="<?php bloginfo( 'template_directory' ); ?>/images/404.png" alt="Страница не найдена"/></div>
			<section class="error-404 not-found">
				<header class="page-header">
					<h1 class="page-title">Страница не найдена</h1>
				</header><!-- .page-header -->

				<div class="page-content">
					<p>Возможно вы перешли по неработающей ссылка или неверно ввели адрес</p>
                    <p>Попробуйте <a href="<?php echo get_home_url(); ?>">вернуться на главную</a></p>
				</div><!-- .page-content -->
			</section><!-- .error-404 -->

		</main><!-- .site-main -->
	</div><!-- .content-area -->

<?php get_footer(); ?>
