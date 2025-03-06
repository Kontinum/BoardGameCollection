<script setup>
    defineProps({
        padding: {
            type: String,
            default: 'p-12'
        }
    })
</script>

<template>
    <div
        class="container mx-auto text-center"
        :class="padding"
    >
        <slot></slot>
    </div>
</template>