<script setup>
import { useToast } from "vue-toastification";
import {ref, computed} from "vue";

const props = defineProps({
        boardGame: {
            type: Object
        },
        inCollection: {
            type: Boolean,
        }
    });

    const toast = useToast();
    let isAddedToCollection = ref(props.inCollection);
    const buttonText = computed(() => {
        return isAddedToCollection.value ? "In Collection" : "Add to collection";
    });

    const emit = defineEmits(["addedToCollection"])

    const addToCollection = async () => {
        try {
            const add = await fetch('/api/boardGames', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(props.boardGame),
            });

            if (add.ok) {
                isAddedToCollection.value = true;
                emit("addedToCollection", props.boardGame.bggId);
            }
            toast.success(`${props.boardGame.name} has been added to the collection`);
        } catch (e) {
            isAddedToCollection.value = false;
            toast.success('Error adding job board game to collection');
        }
    }
</script>

<template>
    <div
        class="p-2 border-2"
        :class="isAddedToCollection ? 'border-amber-200' : 'border-blue-100'"
    >
        <span class="font-medium">
            {{ boardGame.name }}
        </span>
        <span> ({{ boardGame.publishYear }})</span>
        <img class="mx-auto mt-2" :src="boardGame.thumbnail" alt="">
        <button
            type="button"
            @click.prevent="addToCollection"
            :disabled="isAddedToCollection"
            class="mt-2 text-sm rounded border-2 border-blue-200 p-1 hover:bg-blue-200">
            <span v-if="!isAddedToCollection" class="pi pi-plus"></span>
            {{ buttonText }}
        </button>
    </div>
</template>