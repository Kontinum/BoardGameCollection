<script setup>
import { getBoardGamesCollection } from "@/helpers/helpers.js";
import {onMounted, reactive, ref} from "vue";
import Pagination from "@/components/Pagination.vue";
import CollectionResult from "@/components/CollectionResult.vue";
import Modal from "@/components/Modal.vue";
import Error from "@/components/Error.vue";


const bgCollection = reactive({
    games: {},
    error: null
})

const paginationOptions = reactive({
    'page': 1,
    'per_page': 20,
    'total_pages': 0,
})

onMounted(async () => {
    try {
        bgCollection.games = await getBoardGamesCollection(paginationOptions);
        console.log(bgCollection.games);
        paginationOptions.total_pages = bgCollection.games.pages;
    } catch (e) {
        bgCollection.error = e.message;
    }
})
const updateCurrentPage = async function (pageNumber) {
    window.scrollTo( {top: 0, left:0, behavior: 'smooth'});
    paginationOptions.page = pageNumber;
    try {
        bgCollection.games = await getBoardGamesCollection(paginationOptions);
    } catch (e) {
        bgCollection.error = e.message;
    }
}

let showModal = ref(false)
let selectedBoardGameToLog = ref({})

const showLogPlayModal = (selectedBoardGame) => {
    showModal.value = true;
    selectedBoardGameToLog.value = selectedBoardGame;
}
</script>

<template>
    <Error v-if="bgCollection.error" :message="bgCollection.error" />
    <div v-else>
        <p class="mb-3 italic font-medium">{{ bgCollection.games.items }} board games in collection</p>
        <div class="grid grid-cols-2 mb-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <CollectionResult
                @show-log-play-modal="showLogPlayModal"
                @close="showModal = false"
                v-for="boardGame in bgCollection.games.data"
                :board-game="boardGame" :key="boardGame.bggId"
            />
        </div>
        <Pagination
            :current-page="paginationOptions.page"
            :total-pages="paginationOptions.total_pages"
            :last-page="paginationOptions.total_pages"
            @page-change="updateCurrentPage"
        />
        <Modal
            v-model:show="showModal"
            :board-game-data="selectedBoardGameToLog"
        />
    </div>
</template>