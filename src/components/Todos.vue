<template>
  <div>
    <h3>Todos</h3>
    <div class="filter">
      <select
        @change="filterTodo(selectComplete)"
        v-model="selectComplete"
        class="form-control"
      >
        <option selected value="">All</option>
        <option value="true">Completed</option>
        <option value="false">Incompleted</option>
      </select>
    </div>
    <div class="legend">
      <span> <span class="incomplete-box"></span> = Incomplete </span>
      <span> <span class="complete-box"></span> = Complete </span>
    </div>
    <div class="todos">
      <template v-for="todo in allTodos" :key="todo.id">
        <Todo :todo="todo" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Todo from "./Todo.vue";

export default {
  name: "Todos",
  components: {
    Todo,
  },
  data() {
    return {
      selectComplete: "",
    };
  },
  methods: {
    ...mapActions(["fetchTodos"]),
    ...mapMutations(["filterTodo"]),
    
  },
  computed: {
    ...mapGetters(["allTodos", "isLoading"]),
  },
  created() {
    this.fetchTodos();
  },
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}


.filter {
  display: flex;
}
.filter .form-control {
  flex: 0.2;
}
.form-control {
  box-sizing: border-box;
  display: block;
  height: 35px;
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>