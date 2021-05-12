import Vue from 'vue'
import Router from 'vue-router'
import Study from './views/Study.vue'
import Member from './views/Member.vue'
import Login from './views/Login.vue'
import Acsess from './views/Acsess.vue'
import Achievement from './views/Achievement.vue'
import Home from './views/Home.vue'
import EditMember from './views/EditMember.vue'
import EditStudy from './views/EditStudy.vue'
import EditAchievement from './views/EditAchievement.vue'
import EditAcsess from './views/EditAcsess.vue'
import EditHome from './views/EditHome.vue'
import EditMemberDetail from './views/EditMemberDetail.vue'
import EditAchievementDetail from './views/EditAchievementDetail.vue'
import EditStudyDetail from './views/EditStudyDetail.vue'

import StudyDetail from './views/StudyDetail.vue'
import MemberDetail from './views/MemberDetail.vue'

import EditFooter from './views/EditFooter.vue'

import Sample from './views/sample.vue'

import NotFound from './views/NotFound.vue'
import Error from './views/Error.vue'






Vue.use(Router)

export default new Router({
  mode:'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    },
    {
      path: 'error',
      name: 'error',
      component: Error
    },

    {
      path: '/study',
      name: 'study',
      component: Study
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/acsess',
      name: 'acsess',
      component: Acsess
    },
    {
      path: '/achievement',
      name: 'achievement',
      component: Achievement
    },
    {
      path: '/editmember',
      name: 'editMember',
      component: EditMember,
      meta: { requiresAuth: true }
    },
    {
      path: '/editmember/:grade/:id',
      name: 'editMemberDetail',
      component: EditMemberDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/editachievement',
      name: 'editAchievement',
      component: EditAchievement,
      meta: { requiresAuth: true }
    },
    {
      path: '/editachievement/:id',
      name: 'editAchievementDetail',
      component: EditAchievementDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/editstudy',
      name: 'editStudy',
      component: EditStudy,
      meta: { requiresAuth: true }
    },
    {
      path: '/editacsess',
      name: 'editAcsess',
      component: EditAcsess,
      meta: { requiresAuth: true }
    },
    {
      path: '/edithome',
      name: 'editHome',
      component: EditHome,
      meta: { requiresAuth: true }
    },

    {
      path: '/sample',
      name: 'sample',
      component: Sample
    },
    {
      path: '/study/:id',
      name: 'studyDetail',
      component: StudyDetail
    },
    {
      path: '/editstudy/:id',
      name: 'editStudyDetail',
      component: EditStudyDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/member/:grade/:id',
      name: 'memberDetail',
      component: MemberDetail
    },
    {
      path: '/editfooter',
      name: 'editFooter',
      component: EditFooter,
      meta: { requiresAuth: true }
    }

    
  ]
})
