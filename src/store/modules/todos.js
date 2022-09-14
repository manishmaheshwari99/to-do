import axios from 'axios';
import { createToast } from 'mosha-vue-toastify';

const state = {
  todos: [],
  filterTodos: [],
  isLoading: false
};

const getters = {
  allTodos: (state) => state.filterTodos,
  isLoading: (state) => state.isLoading
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

    commit('setTodos', response.data);
  },
  async addTodo({ commit }, title) {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false });

    commit('newTodo', response.data);
  },
  async deleteTodo({ commit }, id) {

    commit('updateLoading', true)
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      createToast({ title: 'Todo deleted successfully' },
        { type: 'success', }
      )

      commit('removeTodo', id);
      commit('updateLoading', false)
    }
    catch {
      createToast({ title: 'Error while deleting todos' },
        { type: 'error', }
      )
    }
  },
  async updateTodo({ commit }, updateTodo) {
    commit('updateLoading', true)
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`, updateTodo);

      createToast({ title: 'Todo updated successfully' },
        { type: 'success', }
      )

      commit('updateTodo', response.data)
      commit('updateLoading', false)
    }
    catch {
      createToast({ title: 'Error while updating todos' },
        { type: 'error', }
      )
    }


  }

};

const mutations = {
  setTodos: (state, todos) => (
    state.todos = todos,
    state.filterTodos = todos
  ),
  newTodo: (state, todo) => (
    state.todos.unshift(todo),
    state.filterTodos.unshift(todo)
  ),
  removeTodo: (state, id) =>
  (
    state.filterTodos = state.filterTodos.filter(todo => todo.id !== id),
    state.todos = state.todos.filter(todo => todo.id !== id)
  ),
  updateTodo: (state, updateTodo) => {
    const index = state.filterTodos.findIndex(todo => todo.id === updateTodo.id);
    if (index !== -1) {
      state.filterTodos.splice(index, 1, updateTodo);
    }
  },
  filterTodo: (state, completed) => {
    if (completed) {
      state.filterTodos = state.todos.filter(todo => {
        const isCompleted = completed === 'true';
        return todo.completed == isCompleted;
      })
    }
    else {
      return state.filterTodos = state.todos;
    }
  },
  updateLoading: (state, isLoading) => {
    state.isLoading = isLoading;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}