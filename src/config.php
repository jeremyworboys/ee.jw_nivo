<?php

if (!defined('JW_NIVO_VERSION')) {
    define('JW_NIVO_NAME', 'JW Nivo');
    define('JW_NIVO_VERSION', '1.3.7');
}

$config['name'] = JW_NIVO_NAME;
$config['version'] = JW_NIVO_VERSION;
$config['nsm_addon_updater']['versions_xml'] = 'http://jeremyworboys.com/add-ons/releases/jw-nivo/';


/**
 * < EE 2.6.0 backward compat
 */
if ( ! function_exists('ee'))
{
    function ee()
    {
        static $EE;
        if ( ! $EE) $EE = get_instance();
        return $EE;
    }
}
