<template>
  <v-card>
    <v-toolbar
      color="dark"
      flat
    >
      <template #extension>
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="item in todos"
            :key="item.id"
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in todos"
        :key="item.id"
      >
        <v-card flat>
          <v-card-text v-text="item.description"></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { API } from 'aws-amplify'
import { listTodos } from '~/src/graphql/queries'

export default {
  data(){
    return {
      tab: null,
      name: '',
      description: '',
      todos: []
    }
  },
    async created() {
    await this.getTodos()
  },
  methods: {
    async getTodos() {
      const todos = await API.graphql({
        query: listTodos,
      })
      this.todos = todos.data.listTodos.items
    }
  }
}
</script>

