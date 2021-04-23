import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'site_info',
    component: () => import(/* webpackChunkName: "about" */ '../views/site_info.vue')
  },
  {
    path: '/familysite',
    name: 'familysite',
    component: () => import(/* webpackChunkName: "about" */ '../views/familysite.vue')
  },
  {
    path: '/popup',
    name: 'popup',
    component: () => import(/* webpackChunkName: "about" */ '../views/popup.vue')
  },
  {
    path: '/banner',
    name: 'banner',
    component: () => import(/* webpackChunkName: "about" */ '../views/banner.vue')
  },
  {
    path: '/copy',
    name: 'copy',
    component: () => import(/* webpackChunkName: "about" */ '../views/copy.vue')
  },
  {
    path: '/mainmenu',
    name: 'mainmenu',
    component: () => import(/* webpackChunkName: "about" */ '../views/mainmenu.vue')
  },
  {
    path: '/mainmenu/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "about" */ '../views/category.vue')
  },
  {
    path: '/mainmenu/contents/exhibition_a',
    name: 'exhibition_a',
    component: () => import(/* webpackChunkName: "about" */ '../views/exhibition_a.vue')
  },
  {
    path: '/mainmenu/contents/exhibition_b',
    name: 'exhibition_b',
    component: () => import(/* webpackChunkName: "about" */ '../views/exhibition_b.vue')
  },
  {
    path: '/mainmenu/contents/exhibition',
    name: 'exhibition',
    component: () => import(/* webpackChunkName: "about" */ '../views/exhibition.vue')
  },
  {
    path: '/mainmenu/contents/exhibition/form',
    name: 'exhibition_form',
    component: () => import(/* webpackChunkName: "about" */ '../views/exhibition_form.vue')
  },
  {
    path: '/mainmenu/contents/e_library/list',
    name: 'exhibition_libray_type1_list',
    component: () => import(/* webpackChunkName: "about" */ '../views/exhibition_libray_type1_list.vue')
  },
  {
    path: '/mainmenu/contents/exhibition/question',
    name: 'exhibition_question',
    component: () => import(/* webpackChunkName: "about" */ '../views/exhibition_question.vue')
  },
  {
    path: '/mainmenu/contents/movie',
    name: 'movie',
    component: () => import(/* webpackChunkName: "about" */ '../views/movie.vue')
  },
  {
    path: '/mainmenu/contents/movie_form',
    name: 'movie_form',
    component: () => import(/* webpackChunkName: "about" */ '../views/movie_form.vue')
  },
  {
    path: '/mainmenu/contents/notice',
    name: 'notice',
    component: () => import(/* webpackChunkName: "about" */ '../views/notice.vue')
  },
  {
    path: '/mainmenu/contents/notice_form',
    name: 'notice_form',
    component: () => import(/* webpackChunkName: "about" */ '../views/notice_form.vue')
  },
  {
    path: '/mainmenu/manage/com_info',
    name: 'com_info',
    component: () => import(/* webpackChunkName: "about" */ '../views/com_info.vue')
  },
  {
    path: '/mainmenu/contents/conference',
    name: 'conference',
    component: () => import(/* webpackChunkName: "about" */ '../views/conference.vue')
  },
  {
    path: '/mainmenu/contents/introduction',
    name: 'introduction',
    component: () => import(/* webpackChunkName: "about" */ '../views/introduction.vue')
  },
  {
    path: '/mainmenu/contents/program',
    name: 'program',
    component: () => import(/* webpackChunkName: "about" */ '../views/program.vue')
  },
  {
    path: '/mainmenu/contents/information_form',
    name: 'information_form',
    component: () => import(/* webpackChunkName: "about" */ '../views/information_form.vue')
  },
  {
    path: '/mainmenu/contents/introduction_form',
    name: 'introduction_form',
    component: () => import(/* webpackChunkName: "about" */ '../views/introduction_form.vue')
  },
  {
    path: '/mainmenu/contents/program_form',
    name: 'program_form',
    component: () => import(/* webpackChunkName: "about" */ '../views/program_form.vue')
  },
  {
    path: '/mainmenu/contents/keynote',
    name: 'keynote',
    component: () => import(/* webpackChunkName: "about" */ '../views/keynote.vue')
  },
  {
    path: '/mainmenu/contents/keynote_form',
    name: 'keynote_form',
    component: () => import(/* webpackChunkName: "about" */ '../views/keynote_form.vue')
  },
  {
    path: '/mainmenu/contents/speaker',
    name: 'speaker',
    component: () => import(/* webpackChunkName: "about" */ '../views/speaker.vue')
  },
  {
    path: '/mainmenu/contents/speaker_form',
    name: 'speaker_form',
    component: () => import(/* webpackChunkName: "about" */ '../views/speaker_form.vue')
  },
  {
    path: '/mainmenu/shop/product',
    name: 'shop_product',
    component: () => import(/* webpackChunkName: "about" */ '../views/shop_product.vue')
  },
  {
    path: '/mainmenu/shop/regist',
    name: 'shop_regist',
    component: () => import(/* webpackChunkName: "about" */ '../views/shop_regist.vue')
  },
  {
    path: '/mainmenu/shop/order',
    name: 'shop_order',
    component: () => import(/* webpackChunkName: "about" */ '../views/shop_order.vue')
  },
  {
    path: '/mainmenu/map/list',
    name: 'map_list',
    component: () => import(/* webpackChunkName: "about" */ '../views/map_list.vue')
  },
  {
    path: '/mainmenu/map/form',
    name: 'map_form',
    component: () => import(/* webpackChunkName: "about" */ '../views/map_form.vue')
  },
  {
    path: '/mainmenu/sns/list',
    name: 'sns_list',
    component: () => import(/* webpackChunkName: "about" */ '../views/sns_list.vue')
  },
  {
    path: '/mainmenu/sns/form',
    name: 'sns_form',
    component: () => import(/* webpackChunkName: "about" */ '../views/sns_form.vue')
  },
  {
    path: '/mainmenu/survey/list',
    name: 'survey_list',
    component: () => import(/* webpackChunkName: "about" */ '../views/survey_list.vue')
  },
  {
    path: '/mainmenu/survey/form',
    name: 'survey_form',
    component: () => import(/* webpackChunkName: "about" */ '../views/survey_form.vue')
  },
  {
    path: '/mainmenu/survey/vote',
    name: 'survey_result',
    component: () => import(/* webpackChunkName: "about" */ '../views/survey_result.vue')
  },
  {
    path: '/biz/site',
    name: 'biz_site',
    component: () => import(/* webpackChunkName: "about" */ '../views/biz_site.vue')
  },
  {
    path: '/biz/site/form',
    name: 'biz_site_form',
    component: () => import(/* webpackChunkName: "about" */ '../views/biz_site_form.vue')
  },
  {
    path: '/biz/schedule',
    name: 'biz_schedule',
    component: () => import(/* webpackChunkName: "about" */ '../views/biz_schedule.vue')
  },
  {
    path: '/biz/link',
    name: 'biz_link',
    component: () => import(/* webpackChunkName: "about" */ '../views/biz_link.vue')
  },
  {
    path: '/company/list',
    name: 'company_list',
    component: () => import(/* webpackChunkName: "about" */ '../views/company_list.vue')
  },
  {
    path: '/company/regist',
    name: 'company_regist',
    component: () => import(/* webpackChunkName: "about" */ '../views/company_regist.vue')
  },
  {
    path: '/company/admin',
    name: 'admin_list',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin_list.vue')
  },
  {
    path: '/com_request',
    name: 'com_request',
    component: () => import(/* webpackChunkName: "about" */ '../views/com_request.vue')
  },
  {
    path: '/user_list',
    name: 'user_list',
    component: () => import(/* webpackChunkName: "about" */ '../views/user_list.vue')
  },
  {
    path: '/vm',
    name: 'vm',
    component: () => import(/* webpackChunkName: "about" */ '../views/vm.vue')
  },
  {
    path: '/conference_notice',
    name: 'conference_notice',
    component: () => import(/* webpackChunkName: "about" */ '../views/conference_notice.vue')
  },
  {
    path: '/stats_login',
    name: 'stats_login',
    component: () => import(/* webpackChunkName: "about" */ '../views/stats_login.vue')
  },
  {
    path: '/stats_counsel_b',
    name: 'stats_counsel_b',
    component: () => import(/* webpackChunkName: "about" */ '../views/stats_counsel_b.vue')
  },
  {
    path: '/stats_counsel_s',
    name: 'stats_counsel_s',
    component: () => import(/* webpackChunkName: "about" */ '../views/stats_counsel_s.vue')
  },
  {
    path: '/stats_vm_b',
    name: 'stats_vm_b',
    component: () => import(/* webpackChunkName: "about" */ '../views/stats_vm_b.vue')
  },
  {
    path: '/stats_vm_s',
    name: 'stats_vm_s',
    component: () => import(/* webpackChunkName: "about" */ '../views/stats_vm_s.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
