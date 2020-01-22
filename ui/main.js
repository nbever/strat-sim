import babelPolyfill from 'babel-polyfill'

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material'
import StratApi from './services/StratApi';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import './index.scss';

import App from './App';
import Foo from './components/Foo';
import Leagues from './components/Leagues';
import Admin from './components/Admin';

import CardSets from './components/admin/CardSets';
import LeagueAdmin from './components/admin/LeagueAdmin';

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(StratApi);

const router = new VueRouter({
  routes: [
    {path: '/foo', component: Foo},
    {path: '/home', name: 'leagues', component: Leagues},
    {path: '/admin', component: Admin, props: true,
      children: [
        {path: 'leagues', name: 'leagueAdmin', component: LeagueAdmin},
        {path: 'cardsets', component: CardSets},
        {path: '/', redirect: 'leagues'}
      ]},
    {path: '*', redirect: {name: 'leagues'}}
  ]
}) ;

new Vue({
  el: '#app',
  render: h => h(App),
  router
});
