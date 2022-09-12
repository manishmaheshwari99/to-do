import Vuex from 'vuex';
import todos from './modules/todos';

export default new Vuex.Store({
  modules: {
    todos
  }
})