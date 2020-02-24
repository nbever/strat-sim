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
import CreateCardSet from './components/admin/CreateCardSet';
import ViewCardSet from './components/admin/ViewCardSet';
import CardSetsList from './components/admin/CardSetsList';
import LeagueAdmin from './components/admin/LeagueAdmin';
import CreateTeam from './components/admin/team/CreateTeam';

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
        {path: 'cardsets', component: CardSets, props: true,
          children: [
            {path: 'create', name: "create-card-set", component: CreateCardSet},
            {path: 'view/:cardSetId', name: 'view-cardset', component: ViewCardSet},
            {path: 'view/:cardSetId/addteam', component: CreateTeam},
            {path: '/', name: 'card-list', component: CardSetsList}
          ]
        },
        {path: '/', redirect: 'leagues'}
      ]},
    {path: '*', redirect: {name: 'leagues'}}
  ]
}) ;

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  data: {
    error: null,
    showError: false,
    loading: false
  },
  methods: {
    setError: function(err) {
      this.error = err;
      this.showError = true;
    },
    setLoading: function(load) {
      this.loading = load;
    }
  }
});
