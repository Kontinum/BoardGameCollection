<script setup>
    import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";
    import SearchResult from "@/components/SearchResult.vue";

    import { getBoardGamesCollection } from "@/helpers/helpers.js";
    import {onMounted, reactive} from "vue";
    import Error from "@/components/Error.vue";

    defineProps({
        data: {
            type: Object,
            required: true
        },
    });

    const bgInCollectionIds = reactive({});
    onMounted( async () => {
        const boardGamesData = await getBoardGamesCollection();
        boardGamesData.map((board_game) => {
            bgInCollectionIds[board_game.bggId] = true;
        })
    })

    const updateCollectionIds = function (bggId) {
        bgInCollectionIds[bggId] = true;
    }
</script>

<template>
    <div class="flex flex-col items-center text-center mt-6 mb-3">
        <PacmanLoader v-if="data.showSpinner" color="#93C5FD" />
        <p v-if="data.search && !data.showSpinner && !data.error">{{ data.boardGames.length }} board games found.</p>
        <Error v-if="data.error" :message="data.error" />
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <SearchResult
            v-if="!data.error"
            @added-to-collection="updateCollectionIds"
            v-for="boardGame in data.boardGames"
            :board-game="boardGame" :key="boardGame.bggId" :in-collection="bgInCollectionIds[boardGame.bggId]"
        />
    </div>
</template>