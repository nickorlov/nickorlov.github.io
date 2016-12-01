<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<!--[if lt IE 9]>
	<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/html5.js"></script>
	<![endif]-->



        <script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/modernizr.js"></script>

		<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,500,700&amp;subset=cyrillic" rel="stylesheet">

        <link rel="stylesheet" href="<?php echo esc_url( get_template_directory_uri() ); ?>/css/font-awesome.css"/>

        <link rel="stylesheet" href="<?php echo esc_url( get_template_directory_uri() ); ?>/css/bootstrap.css"/>

        <link rel="stylesheet" href="<?php echo esc_url( get_template_directory_uri() ); ?>/css/owl.carousel.min.css">

        <link rel="stylesheet" href="<?php echo esc_url( get_template_directory_uri() ); ?>/css/owl.theme.default.min.css">

        <script type="text/javascript" src="//vk.com/js/api/openapi.js?136"></script>

     	<?php wp_head(); ?>


</head>

<body <?php body_class(); ?>> 

    <header class="container-fluid site-header">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 h-l">
					<address>
<!--
						<img class="addr-icon" src="<?php echo esc_url( get_template_directory_uri() ); ?>/images/mappoint.png" alt="Address">
-->
						<div class="addr">

Россия, Красноярский край, <br>
г. Красноярск, ул. Телевизорная <br>
1 строение 9, Индекс: 660028 <br>

						</div>
					</address>
				</div>
				<div class="col-xs-12 col-sm-5 col-md-5 col-lg-5">
					<div class="logo">
						<a href="<?php echo home_url(); ?>">
							<img src="/wp-content/themes/mixmax/images/logo-red.png" alt="MiMax"><br>
							<?php if(is_page(531)) : ?>
								<span class="logo-text">Коммерческая недвижимость</span>
							<?php endif; ?>
							<?php if(is_page(11)) : ?>
								<span class="logo-text">Организация мероприятий</span>
							<?php endif; ?>
						</a>
					</div>
				</div>
				<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 h-r">
					<div class="tel">
						<img class="phone-icon" src="<?php echo esc_url( get_template_directory_uri() ); ?>/images/phone.png" alt="Phone">
						<div class="phone">
							<a href="#zakazzvonok" class="tel-popup popup">Обратный звонок</a><br>
							<a class="phone-num" href="tel:+73912911119">(391)<span> 2-911-119</span></a>
						</div>
					</div>
				</div>
			</div><!--row-->

		</div><!--container-->
        <?php if(!is_front_page()) : ?>
            <div class="container-fluid topmenu">
                <div class="container">
        			<div class="col-xs-12">
        				<div class="">
        					<?php wp_nav_menu( array('theme_location' => 'primary' )); ?>
        				</div>
        			</div>
                </div>
            </div>
        <?php endif; ?>
		<div id="fixblock">
            <?php if(is_front_page()) : ?>
            <div class="container-fluid topmenu">
                <div class="container">
    				<div class="col-xs-12">
    					<div class="">
    						<?php wp_nav_menu( array('theme_location' => 'primary')); ?>
    					</div>
    				</div>
                </div>
            </div>
            <?php endif; ?>
            <div class="container-fluid botmenu">
                <div class="container">
    				<div class="col-xs-12">
                        <div class="menu-button"><i class="fa fa-bars"></i> Меню</div>
    					<?php wp_nav_menu( array('theme_location' => 'secondary',  'items_wrap' => '<ul class="menu flexnav" data-breakpoint="820">%3$s</ul>', 'link_before' => '<span>', 'link_after'  => '</span>')); ?>
    				</div>
                </div>
            </div>
            <?php if(is_page(531)) : ?>
            <div class="container-fluid page-nav-wrap">
                <div class="container">
                    <div class="col-xs-12 page-nav">
                        <a href="#gallery">Галерея</a><a href="#hot-prop">Горячее предложение!</a><a href="#loc">Расположение</a><a href="#infrastr">Инфраструктура</a><a href="#tech">Технические характеристики</a><a href="#cont">Контакты</a>
                    </div>
                </div>
            </div>
            <?php endif; ?>
            <?php if(is_page(11)) : ?>
            <div class="container-fluid page-nav-wrap">
                <div class="container">
                    <div class="col-xs-12 page-nav">
                        <a href="#formaty_meropriyatiy">Форматы мероприятий</a><a href="#nashi_priemushchestva">Наши преимущества</a><a href="#shagov_5">5 шагов к мероприятию</a><a href="#otzivi">Отзывы</a>
                    </div>
                </div>
            </div>
            <?php endif; ?>
		</div>

    </header>





    <?php if ( (is_front_page()) and (!is_paged())) { ?>
        <?php dynamic_sidebar( 'sidebarmy-1' ); //уникальный id виджета ?>
    <?php } ?>

    <div class="container">
        <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
