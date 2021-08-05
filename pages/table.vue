<template>

  <v-row>
    <v-data-table
    :headers="headers"
    :items="todos"
    :items-per-page="5"
    class="elevation-1"
    ></v-data-table>
  </v-row>
</template>

<script>
import { API } from 'aws-amplify'
import { createTodo } from '~/src/graphql/mutations'
import { listTodos } from '~/src/graphql/queries'

export default {
  data() {
    return {
      name: '',
      description: '',
      todos: [],
      headers: [
          {
            text: 'todo_task_name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: '内容（どんなことをやるか）', value: 'description' },
        ],
        items: [
          'web', 'shopping', 'videos', 'images', 'news'
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  async created() {
    await this.getTodos()
  },
  methods: {
    async createTodo() {
      const { name, description } = this
      if (!name || !description) return false
      const todo = { name, description }
      await API.graphql({
        query: createTodo,
        variables: { input: todo },
      })
      this.name = ''
      this.description = ''
      this.getTodos()
    },
    async getTodos() {
      const todos = await API.graphql({
        query: listTodos,
      })
      this.todos = todos.data.listTodos.items
    },
  },
}
</script>
