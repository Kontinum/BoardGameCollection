<script setup>
    defineProps({
        currentPage: {
            type: Number,
            default: 1
        },
        totalPages: {
            type: Number
        },
        lastPage: {
            type: Number,
        },
    })
    defineEmits(['pageChange'])
</script>

<template>
    <p class="italic text-sm pb-1 pt-3">Page {{ currentPage }} of {{ totalPages }}</p>
    <button
        v-if="currentPage > 1"
        @click="$emit('pageChange', currentPage - 1)"
        class="pl-2 pr-2 pb-1 pt-1 rounded-md border-2 border-blue-300 hover:bg-blue-300"
    >
        Prev
    </button>
    <button
        v-if="currentPage < lastPage"
        @click="$emit('pageChange', currentPage + 1)"
        class="pl-2 pr-2 pb-1 pt-1 rounded-md border-2 ml-2 border-blue-300 hover:bg-blue-300"
    >
        Next
    </button>
</template>