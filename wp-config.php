<?php
/**
 * Основные параметры WordPress.
 *
 * Скрипт для создания wp-config.php использует этот файл в процессе
 * установки. Необязательно использовать веб-интерфейс, можно
 * скопировать файл в "wp-config.php" и заполнить значения вручную.
 *
 * Этот файл содержит следующие параметры:
 *
 * * Настройки MySQL
 * * Секретные ключи
 * * Префикс таблиц базы данных
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'arhi_musor');

/** Имя пользователя MySQL */
define('DB_USER', 'arhi_musor');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', '111213');

/** Имя сервера MySQL */
define('DB_HOST', 'localhost');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '(fx0Co0]sZ<VFXBzc*9=m#g$XEGG)POFMHn~#4>:(A)?mTS%f|C,#t1tl;mvEM]7');
define('SECURE_AUTH_KEY',  'Ipw^?O^vA!sx1vJN(gwhM?MXQx2:^US;5gFK-f!4q(A}`96Mg 4O_Z]N(-YiMAj7');
define('LOGGED_IN_KEY',    'MhPYuL#27;/^{;V|^BoFtTJBAq>y1nR[P;a%+qNu?F14rWizhTn#ywN:xdfiZ4(|');
define('NONCE_KEY',        '*909JXIedcU:#PiEp#IJ{:1XEj>bcCX4iDCoHMqnVfD5hv:L2ch+c,CVn5WLhz;>');
define('AUTH_SALT',        '_=f^WEn5Y3m*lNUV6zwmG(;]R<i06s@pODFZuLtw),A@8~+4RUuR`@luCFuhmA&T');
define('SECURE_AUTH_SALT', '7&%$K(XXPy`:w|7Z?<~H#fn2PB~Mc>QqSMJ^MqNdhp=O2xTQ*E[dI|7<sQtb 6L:');
define('LOGGED_IN_SALT',   'w7_/bN#nR1b1OprCkOw;h<P(H:J)wERRC(M4D4kjy((POv2{]k~esS1fOMs[DP#6');
define('NONCE_SALT',       'KP_N1_a`EqKRq$r-S00PG!Up.Rv)fR6[w8L,UZ!n$7AJa5[piCMI|#G%:TkSo,=8');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'wp_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 * 
 * Информацию о других отладочных константах можно найти в Кодексе.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');
