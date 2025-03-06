<script setup>
    import Error from "@/components/Error.vue";
    import DeleteModal from "@/components/DeleteModal.vue";
    import {ref} from "vue";

    defineProps({
        boardGame: {
            type: Object,
            default: () => ({ data: {} }),
            required: true,
        }
    })
    defineEmits(['deleteFromCollection'])

    let showModal = ref(false)

</script>

<template>
    <Error v-if="boardGame.error" :message="boardGame.error" />
    <div v-else>
        <div class="flex flex-col items-center justify-between">
            <p class="font-bold italic mb-2">{{ boardGame.data.name }} ({{ boardGame.data.publishYear }})
                <button
                    @click="showModal = true"
                    class="text-sm rounded border-2 border-blue-200 hover:bg-blue-200"
                    title="Delete from collection">
                    <span class="pi pi-trash text-lg p-1"></span>
                </button>
            </p>
            <img class="border-4 border-blue-200 mb-2" :src="boardGame.data.thumbnail" alt="">

            <div class="w-full text-left mt-2">
                <div v-if="boardGame.data.loggedPlays" class="italic font-bold" >
                    <p class="mb-2">
                        {{ boardGame.data.loggedPlays.length }} logged plays
                    </p>
                    <table
                        v-if="boardGame.data.loggedPlays.length > 0"
                        class="table-auto border-2 border-blue-200 w-full">
                        <thead class="bg-blue-200 border-2 border-blue-200">
                        <tr class="">
                            <th class="py-2 px-2">Date</th>
                            <th class="">Duration (min)</th>
                            <th class="">Player count</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="border-b-2 border-blue-200" v-for="loggedPlay in boardGame.data.loggedPlays">
                            <td class="py-2 px-2">{{ loggedPlay.date }}</td>
                            <td>{{ loggedPlay.duration }}</td>
                            <td>{{ loggedPlay.playerCount }}</td>
                        </tr>
                        </tbody>

                    </table>
                </div>
                <p v-else>Loading logged plays...</p>
            </div>
        </div>
    </div>
    <DeleteModal
        :bg-name="boardGame.data.name"
        :bg-year="boardGame.data.publishYear"
        v-model:show="showModal"
         v-if="showModal"
         @delete-from-collection="$emit('deleteFromCollection')"
    />
</template>

<style scoped>

</style>