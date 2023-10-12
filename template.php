<?php

/**
 * @file
 * template.php
 */

/**
 * Page alter.
 */
function theme_carlingblackwebsite_page_alter($page) {
  $mobileoptimized = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
    'name' =>  'MobileOptimized',
    'content' =>  'width'
    )
  );
  $handheldfriendly = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
    'name' =>  'HandheldFriendly',
    'content' =>  'true'
    )
  );
  $viewport = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
    'name' =>  'viewport',
    'content' =>  'initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,target-densitydpi=device-dpi, user-scalable=no'
    )
  );
  drupal_add_html_head($mobileoptimized, 'MobileOptimized');
  drupal_add_html_head($handheldfriendly, 'HandheldFriendly');
  drupal_add_html_head($viewport, 'viewport');
}

/**
 * Preprocess variables for html.tpl.php
 */
function theme_carlingblackwebsite_preprocess_html(&$vars) {
  if ($node = menu_get_object()) {
    if (isset($node->field_class_css[LANGUAGE_NONE][0]['value'])){
      $node_class = $node->field_class_css[LANGUAGE_NONE][0]['value'];
      if ($node_class){
        $vars['classes_array'][] = $node_class;
      }
    }

    if (isset($node->field_background_desktop[LANGUAGE_NONE][0]['uri'])){
      $node_background_desktop = $node->field_background_desktop[LANGUAGE_NONE][0]['uri'];
      if ($node_background_desktop){
        $vars['background_desktop'] = file_create_url($node_background_desktop);
      }
    }

    if (isset($node->field_background_mobile[LANGUAGE_NONE][0]['uri'])){
      $node_background_mobile = $node->field_background_mobile[LANGUAGE_NONE][0]['uri'];
      if ($node_background_mobile){
        $vars['background_mobile'] = file_create_url($node_background_mobile);
      }
    }

    if (isset($node->field_youtube_video_id[LANGUAGE_NONE][0]['value'])){
      $node_youtube_video_id = $node->field_youtube_video_id[LANGUAGE_NONE][0]['value'];
      if ($node_youtube_video_id){
        $vars['youtube_video_id'] = $node_youtube_video_id;
      }
    }
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function theme_carlingblackwebsite_preprocess_node(&$variables) {
  if(isset($variables['node']) && $variables['node']->type === 'page') {
    if (isset($variables['node']->field_class_css[LANGUAGE_NONE][0]['value']) &&
      ($node_class = $variables['node']->field_class_css[LANGUAGE_NONE][0]['value'])) {
      $variables['theme_hook_suggestions'][] = 'node__' . drupal_clean_css_identifier(drupal_strtolower($node_class),
          array(' ' => '_', '-' => '_', '/' => '_', '[' => '_', ']' => ''));
      $variables['classes_array'][] = 'node-custom-class-' . $node_class;
      if ($node_class === 'page-map' && module_exists('ab_map')) {
        $theme_path = drupal_get_path('theme', 'theme_carlingblackwebsite');
        drupal_add_js(array(
          'ab_map_path_icon' => url($theme_path . '/front-dev/images/icons/', array('absolute' => TRUE)),
          'ab_map_icon' => variable_get('ab_map_icon_url'),
          'ab_map_api_key' => variable_get('ab_map_api_key'),
          'ab_map_initial_lat' => variable_get('ab_map_initial_lat', -25.7585829),
          'ab_map_initial_lng' => variable_get('ab_map_initial_lng', 28.057869),
          'ab_map_api_endpoint' => '/ab_map/points/1',
        ), 'setting');
        drupal_add_js($theme_path . '/assets/js/map.js');
        drupal_add_css($theme_path . '/assets/css/map.css');
      }
    }
  }
}

function theme_carlingblackwebsite_preprocess_page(&$vars)
{
    if(isset($vars['node'])) {
        if (isset($vars['node']->field_class_css[LANGUAGE_NONE][0]['value']) &&
          ($node_class = $vars['node']->field_class_css[LANGUAGE_NONE][0]['value'])){
            $vars['theme_hook_suggestions'][] = 'page__' . drupal_clean_css_identifier(drupal_strtolower($node_class),
                array(' ' => '_', '-' => '_', '/' => '_', '[' => '_', ']' => '')) ;
        }
        if ($vars['node']->type == 'fathers_day') {
          $vars['theme_hook_suggestions'][] = 'page__' . $vars['node']->type;
        }
      if ($vars['node']->type == 'fathers_day') {
        $vars['theme_hook_suggestions'][] = 'page__' . $vars['node']->type;
      }
    }
}

function theme_carlingblackwebsite_form_alter(&$form, &$form_state, $form_id) {

  if ($form_id == 'webform_client_form_207') {
    // var_dump($form); die();

        $form['submitted']['province']['#attributes'] =  array('onchange' => "makeSubmenu(this.value)");
  }

  if ($form_id == 'webform_client_form_176') {
    $form['submitted']['province']['#attributes'] =  array('onchange' => "makeSubmenu(this.value)");
}
}

