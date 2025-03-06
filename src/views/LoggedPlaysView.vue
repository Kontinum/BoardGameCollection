<script setup>
import ContainerAuto from "@/components/ContainerAuto.vue";
import LoggedPlays from "@/components/LoggedPlays.vue";
import { getLoggedPlays } from "@/helpers/helpers.js";
import { onMounted, reactive } from "vue"

const loggedPlays = reactive({
    data: {},
    error: null
})

onMounted(async () => {
    try {
        loggedPlays.data = await getLoggedPlays();

        console.log(loggedPlays)
    } catch (error) {
        loggedPlays.error = error.message;
    }
})

</script>

<template>
    <ContainerAuto>
        <LoggedPlays :logged-plays="loggedPlays" />
    </ContainerAuto>
</template>