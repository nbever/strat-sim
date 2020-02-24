import isFunction from 'lodash/isFunction';
import {sFetch} from './StratFetch';
import CardSetAPI from './CardSetAPI';
import TeamAPI from './TeamAPI';

const StratApi = {
  install: (Vue, options) => {
    Vue.mixin({
      methods: {
        ...CardSetAPI,
        ...TeamAPI
      }
    });
  }
};

export default StratApi;
