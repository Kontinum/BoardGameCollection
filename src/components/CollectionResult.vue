<script setup>

defineProps({
    boardGame: {
        type: Object
    },
    inCollection: {
        type: Boolean,
    }
});

defineEmits(['showLogPlayModal'])

</script>

<template>
    <div class="p-2 border-2 border-accent-200">
        <span class="font-medium">
            {{ boardGame.name }}
        </span>
        <span> ({{ boardGame.publishYear }})</span>
        <img class="mx-auto mt-2" :src="boardGame.thumbnail" alt="">
        <div class="mt-2">
            <RouterLink :to="`/board_game/${ boardGame.id }`">
                <button
                    class="text-sm mr-1.5 rounded border-2 border-blue-200 hover:bg-blue-200"
                    title="See board game and logged plays">
                    <span class="pi pi-info-circle text-lg p-1"></span>
                </button>
            </RouterLink>
            <button
                @click="$emit('showLogPlayModal', boardGame)"
                class="text-sm mr-1.5 rounded border-2 border-blue-200 hover:bg-blue-200"
                title="Log play">
                <span class="pi pi-pencil text-lg p-1"></span>
            </button>
        </div>
    </div>
</template>