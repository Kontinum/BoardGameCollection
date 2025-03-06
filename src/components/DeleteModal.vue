<script setup>
import { ref } from "vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    bgName: {
        type: String,
        required: true
    },
    bgYear: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['update:show', 'deleteFromCollection']);

let showModal = ref(props.show);


const closeModal = () => {
    emit('update:show', false);
}
</script>

<template>
    <div
        v-show="showModal"
        id="modal"
        class=" align-middle rounded-2xl lg:w-1/3 p-6 bg-white shadow-2xl shadow-blue-400 fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 z-9999 sm:w-2/3">
        <div class="modal-dialog text-xl mb-1">
            Delete
            <span class="italic">
                {{ bgName }} ({{ bgYear }})
            </span> from collection with all logged plays?
        </div>
        <hr>
        <div class="confirm mt-2 text-right">
            <button @click="closeModal" class="text-sm p-2 hover:bg-blue-300 mr-2">
                Cancel
            </button>
            <button
                @click="$emit('deleteFromCollection')"
                class="text-sm p-2 border-2 border-white bg-red-300 hover:bg-red-600"
                title="Delete from collection">
                <span class="pi pi-exclamation-triangle"></span>
                Delete from collection
            </button>
        </div>
    </div>
</template>