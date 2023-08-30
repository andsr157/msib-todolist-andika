import { ref } from "vue"
import { defineStore } from "pinia"
import axios from "axios"

export interface Todo {
  id: number
  title: string
  completed: boolean
}

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [] as Todo[],
    inputValue: ref<string>(""),
    inputError: ref<string>(""),
    mode: ref<string>("all"),
  }),

  getters: {
    countUncompleted(): number {
      return this.todos.filter((todo) => todo.completed === false).length
    },

    filterAll(): Todo[] {
      return this.todos
    },

    filterActive(): Todo[] {
      return this.todos.filter((todo) => todo.completed === false)
    },

    filterCompleted(): Todo[] {
      return this.todos.filter((todo) => todo.completed === true)
    },

    // getDynamicGetter(): any {
    //   const getterName = `${this.mode}`
    //   return getterName
    // },
  },

  actions: {
    async fetchTodo() {
      try {
        axios
          .get(" https://jsonplaceholder.typicode.com/todos?_limit=5 ")
          .then((response) => {
            this.todos = response.data.reverse()
            console.log(this.todos)
          })
      } catch (error) {
        console.log("error", error)
      }
    },

    async createTodo() {
      try {
        if (this.inputValue) {
          const response = await axios.post(
            " https://jsonplaceholder.typicode.com/todos/",
            {
              title: this.inputValue,
              completed: false,
            }
          )

          if (response.status === 201) {
            console.log("Data pushed to API successfully")
            this.inputValue = ""
            this.todos.unshift(response.data)
          } else {
            console.error("Failed to push data to API")
          }
        } else {
          alert("input harus diisi")
        }
      } catch (error) {
        console.log("Error", error)
      }
    },

    async updateTodo(id: number, status: boolean) {
      try {
        const response = await axios.put(
          ` https://jsonplaceholder.typicode.com/todos//${id}`,
          {
            completed: status,
          }
        )

        if (response.status === 200) {
          const updatedTodo = this.todos.find((todo) => todo.id === id)
          if (updatedTodo) {
            updatedTodo.completed = status
          }
        }

        console.log(response)
      } catch (error) {
        console.log("error", error)
      }
    },

    async clearTodo() {
      try {
        const completedTodos = this.todos.filter((todo) => todo.completed)
        await Promise.all(
          completedTodos.map(async (todo) => {
            const response = await axios.delete(
              `https://jsonplaceholder.typicode.com/todos//${todo.id}`
            )

            if (response.status === 200) {
              const index = this.todos.findIndex((t) => t.id === todo.id)
              if (index !== -1) {
                this.todos.splice(index, 1)
              }
            } else {
              console.error("Failed to delete todo")
            }
          })
        )
      } catch (error) {
        console.log("error", error)
      }
    },

    async deleteTodo(id: number) {
      try {
        const response = await axios.delete(
          `https://jsonplaceholder.typicode.com/todos//${id}`
        )

        if (response.status === 200) {
          this.todos = this.todos.filter((todo) => todo.id !== id)
        }

        console.log(response)
      } catch (error) {
        console.log("error", error)
      }
    },
  },
})
