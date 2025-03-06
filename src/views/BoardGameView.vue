<script setup>
import ContainerAuto from "@/components/ContainerAuto.vue";
import { useRoute, useRouter } from "vue-router";
import BoardGameInfo from "@/components/BoardGameInfo.vue";
import { getBoardGameInfo, deleteBoardGameFromCollection } from "@/helpers/helpers.js";
import { onMounted, reactive } from "vue"
import { useToast } from "vue-toastification";


const route = useRoute();
const router = useRouter();
const toast = useToast();
const id = route.params.id;

let boardGameInfo = reactive({
    data: {},
    error: null
})

onMounted(async () => {
    try {
        boardGameInfo.data = await getBoardGameInfo(id);
    } catch (error) {
        boardGameInfo.error = error.message;
    }
})

const deleteFromCollection = async () => {
    try {
        await deleteBoardGameFromCollection(id);
        await router.push('/collection')
        toast.success(`${boardGameInfo.data.name} has been deleted.`)
    } catch (e) {
        toast.error(`There was a problem while deleting board board game: ${e}`)
    }
}

</script>

<template>
    <ContainerAuto>
        <BoardGameInfo
            @delete-from-collection="deleteFromCollection"
            :board-game="boardGameInfo" />
    </ContainerAuto>
</template>