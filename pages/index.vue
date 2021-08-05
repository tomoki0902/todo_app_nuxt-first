<template>
  <amplify-authenticator>
    <v-text-field v-model="name" label="Name"></v-text-field>
    <v-text-field v-model="description" label="Description"></v-text-field>
    <v-btn @click="createTodo">Create</v-btn>
    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
</template>
<script>
import { API } from 'aws-amplify'
import { createTodo } from '~/src/graphql/mutations'

export default {
  data() {
    return {
      name: '',
      description: '',
      todos: [],
    }
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
      this.$router.push({ name: 'table' })
    },
  },
}
</script>