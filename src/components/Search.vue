<script setup>
import { reactive, ref } from "vue";
import {
    fetchData,
    mapBoardGamesDetailData,
    xmlToJson,
    refreshSearchResults,
} from "@/helpers/helpers.js";
import { baseSearchUrl, detailSearchUrl } from "@/config/config.js";
import SearchResults from "@/components/SearchResults.vue";

    const boardGameName = ref('');
    const boardGamesSearchResults = reactive({
        error: null,
        boardGames: [],
        showSpinner: false,
        search: false
    });
    const searchGames = async () => {
        try {
            if (boardGameName.value !== '') {
                refreshSearchResults(boardGamesSearchResults);
                const xmlDataBase = await fetchData(baseSearchUrl + boardGameName.value, 'xml');
                const jsonDataBase = xmlToJson(xmlDataBase);

                let boardGamesBase = jsonDataBase.boardgames.boardgame;

                if (boardGamesBase) {
                    if (boardGamesBase.length > 0) {
                        boardGamesBase = jsonDataBase.boardgames.boardgame.slice(0, 20);
                    } else {
                        boardGamesBase = [boardGamesBase];
                    }

                    const boardGamesIds = boardGamesBase.map((boardGame) => {
                        return boardGame._attributes.objectid;
                    });
                    const boardGamesIdsUrl = boardGamesIds.join(',');

                    const searchUrl = `${detailSearchUrl}/${boardGamesIdsUrl}`;

                    const xmlDataDetail = await fetchData(searchUrl, 'xml');
                    const jsonDataDetail = await xmlToJson(xmlDataDetail);
                    let boardGamesDetail = jsonDataDetail.boardgames.boardgame;

                    if (!boardGamesDetail.length) {
                        boardGamesDetail = [boardGamesDetail];
                    }

                    mapBoardGamesDetailData(boardGamesDetail, boardGamesSearchResults);
                }
            }
        } catch (e) {
            boardGamesSearchResults.error = e.message;
        } finally {
            boardGamesSearchResults.showSpinner = false;
        }
    }
</script>

<template>
    <form @submit.prevent="searchGames">
        <div class="flex flex-col md:flex-row justify-center text-center md:space-x-4 space-y-2 md:space-y-0">
            <div class="flex flex-col md:w-1/3">
                <input
                    v-model="boardGameName"
                    type="text"
                    class="p-4 md:p-5 rounded-lg border border-blue-300"
                    placeholder="Enter board game to search"
                    required
                >
            </div>
            <div class="flex flex-col">
                <input
                    type="submit"
                    class="p-4 md:p-5 bg-blue-300 rounded-full hover:bg-blue-400"
                    value="Search">

            </div>
        </div>
    </form>

    <SearchResults :data="boardGamesSearchResults" />

</template>
