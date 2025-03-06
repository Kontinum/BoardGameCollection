<script setup>
    import {filterActiveLoggedPlays} from "@/helpers/helpers.js";

    const props = defineProps({
        bgCollection: {
            type: Object,
            default: {}
        }
    })
    const boardGamesCount = props.bgCollection.boardGames.length;
    const loggedPlaysCount = filterActiveLoggedPlays(props.bgCollection.loggedPlays).length;
</script>

<template>
    <div class="flex flex-col">
        <span v-if="boardGamesCount">
            Currently you have {{ boardGamesCount }} board games in your collection.
            Go to <RouterLink class="italic underline infoLink" to="/collection">collection</RouterLink> to log play for them.
        </span>
        <span v-else>
            Currently you do not have board games in your collection.
            <RouterLink class="italic underline infoLink" to="/search">Search</RouterLink> to add them.
        </span>
        <span v-if="loggedPlaysCount">
            You logged {{ loggedPlaysCount }} plays for your board games.
            Go to <RouterLink class="italic underline infoLink" to="/logged_plays">logged plays</RouterLink> to see them.
        </span>
    </div>
</template>