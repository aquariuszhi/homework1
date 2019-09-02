<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/

$route['register/create'] = 'register/create';
$route['register/image_update'] = 'register/image_update';
$route['register/search'] = 'register/search';
$route['register/nickname_update'] = 'register/nickname_update';

$route['login/login'] = 'login/login';
$route['login/login_check'] = 'login/login_check';

$route['writing/create'] = 'writing/create';
$route['writing/writing/(:num)'] = 'writing/writing';
$route['writing/delete'] = 'writing/delete_writing';
$route['writing/get_assign_writing'] = 'writing/get_assign_writing';
$route['writing/person/(:num)'] = 'writing/person';
$route['writing/modify'] = 'writing/modify';
$route['writing/comment'] = 'writing/comment';
$route['writing/like'] = 'writing/like';
$route['writing/check_follow'] = 'writing/check_follow';
$route['writing/set_follow'] = 'writing/set_follow';
$route['writing/get_category/(:num)'] = 'writing/get_category';
$route['writing/get_follow_writing/(:num)'] = 'writing/get_follow_writing';
$route['writing/get_follow_user'] = 'writing/get_follow_user';