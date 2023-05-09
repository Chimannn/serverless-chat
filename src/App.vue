<template>
	<AuthPage v-if="!user" @onAuth="handleAuth" />
	<ChatsPage
		v-else
		v-bind:username="user.username"
		v-bind:secret="user.secret"
	/>
</template>

<script setup>
import AuthPage from "./pages/AuthPage/index.vue";
import ChatsPage from "./pages/ChatsPage/index.vue";
import { reactive, toRefs } from "vue";

const state = reactive({
	user: undefined,
})

const { user } = toRefs(state)

//methods:
const handleAuth = (user) => {
	state.user = user;
}

</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
