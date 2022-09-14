<template>
  <div
    class="todo"
    :class="{ 'is-complete': todo.completed, 'disable-click': referesh, 'clicked': referesh }"
  >
    <p>{{ todo?.title }}</p>
    <div class="footer">
      <button class="todo-status" :disabled="referesh" @click="onClick(todo)">
        {{ todo?.completed ? "Incomplete" : "Complete" }}
      </button>
      <i
        @click="handleDelete(todo.id)"
        class="fa fa-trash"
        aria-hidden="false"
      ></i>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Todo",
  props: {
    todo:Object,
  },
  data() {
    return {
      referesh: false
    }
  },
  methods:{
    ...mapActions(["fetchTodos", "deleteTodo", "updateTodo"]),
    async onClick(todo) {
      this.referesh = true;
      const updateTodo = {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed,
      };

      await this.updateTodo(updateTodo);
      this.referesh = false;
    },
    async handleDelete(id) {
      this.referesh = true;
      await this.deleteTodo(id);
      this.referesh = false;

    }
  },
  computed: {
    ...mapGetters(["isLoading"]),
  }
};
</script>

<style scoped>
.clicked {
  opacity: 0.8;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
i {
  position: relative;
  top: 10px;
  color: black;
  cursor: pointer;
}

.is-complete {
  background: #35495e;
  color: #fff;
}
.is-complete i {
  color: white;
}
.disable-click {
  pointer-events: none;
}
.todo-status {
  background: #ccccff;
  padding: 10px 15px;
  border: 1px #41b883 solid;
  font-size: 0.9rem;
  cursor: pointer;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>