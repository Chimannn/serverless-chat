<template>
    <div style="height: 100vh">
        <PrettyChatWindow
            :projectId="state.projectId"
            :username="username"
            :secret="secret"
        />
    </div>
</template>

<style>
.ce-new-chat-button {
    width: 32px;
    position: relative;
    bottom: 22px;
}
</style>

<script>
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { applyReactInVue } from "veaury";
import { reactive, toRefs } from "vue";

export default {
    components: {
        PrettyChatWindow: applyReactInVue(PrettyChatWindow),
    },

    props:{
        username: {
            type: String,
            required: true,
        },
        secret: {
            type: String,
            required: true,
        },
    },
        
    setup() {
        const state = reactive({
            projectId: import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
        })

        return {
            state
        }
    }
};
</script>