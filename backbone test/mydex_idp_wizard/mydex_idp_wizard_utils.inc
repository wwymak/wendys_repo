<?php

/**
 * @file includes/utils
 * Holds utility functions used by hooks in main module.
 * Split into smaller files as this gets unmanageable.
 */

/**
 * Adds javascript dependencies onto page for IDP Wizard
**/
function mydex_idp_wizard_add_js() {
  $js_path = drupal_get_path('module', 'mydex_idp_wizard');

  // Add jquery bbq library for easy query string handling
  drupal_add_js("/misc/jquery.ba-bbq.js",
      array('type' => 'file', 'scope' => 'footer')
    );

  // module vendor libs first
  $vendor_js_libaries = array(
  "underscore.min.js",
  "backbone.min.js",
  "backbone.localStorage.min.js",
  "spin.min.js",
  "jquery.spin.js",
  "jquery.template.js"
  );

  foreach ($vendor_js_libaries as $vendor_library) {
    drupal_add_js($js_path . "/js/vendor/$vendor_library",
      array('type' => 'file', 'scope' => 'footer')
    );
  }

  // then app js next
  $app_js_files = array(
    "models/connection.js",
    "models/idapConnection.js",
    "models/mobileProvider.js",
    "collections/connectionList.js",
    "views/activityPane.js",
    "views/connection.js",
    "views/connectionBuilderView.js",
    "views/connectionWizard.js",
    "views/mobilePaneView.js",
    "views/DVLAPaneView.js",
    "views/bankPaneView.js",
    "views/utilityPaneView.js",
    "views/passportAgencyPaneView.js",
    "views/stepView.js",
    "views/progressIndicatorView.js",
    "app.js",
    "router.js"
  );

  foreach ($app_js_files as $app_js_file) {
    drupal_add_js($js_path . "/js/app/$app_js_file",
      array('type' => 'file', 'scope' => 'footer')
    );
  };

  // call the include functions from another module if they exist
  if (module_exists('mydex_ilv')) {
    mydex_ilv_add_app_credentials();
    mydex_ilv_add_app_js();
    mydex_ilv_add_app_css();
  }

  global $conf;

  // Add drupal conf settings to page
  drupal_add_js(array(
    'mydexIDPWizard' => array(
      'handOffUrl' => $conf['mydex_idp_wizard_idp_handoff_url'])
    ),
    array(
      'type' => 'setting',
      'scope' => 'footer'
    )
  );

  // Add user specific vars
  global $user;
  $request_id = cache_get("{$user->uid}:request_id", 'cache_mydex_pds')->data;
  $postback_url = cache_get("{$user->uid}:postback_url", 'cache_mydex_pds')->data;
  $gds_return_url = $postback_url . "?requestId=" . $request_id;

  drupal_add_js( array(
    'mydexIDPWizard' => array(
      'requestId'   => $request_id,
      'postbackUrl' => $postback_url,
      'gds_return_url' => $gds_return_url
      )
    ),
    array(
      'type' => 'setting',
      'scope' => 'footer'
    )
  );

}
/**
 * Adds css dependencies for IDP Wizard
 */
function mydex_idp_wizard_add_css() {
  $css_path = drupal_get_path('module', 'mydex_idp_wizard');

  drupal_add_css($css_path . '/css/app.css');
  drupal_add_css($css_path . '/css/step2.css');

  drupal_add_css($css_path . '/css/vendor/font-awesome.css');
  drupal_add_css($css_path . '/css/vendor/font-awesome-ie7.css');
}
