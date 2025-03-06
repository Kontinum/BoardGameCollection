<script setup>
import Error from "@/components/Error.vue";

defineProps({
    loggedPlays: {
        type: Object,
        default: () => ({ data: {} }),
        required: true
    }
})
</script>

<template>
    <Error v-if="loggedPlays.error" :message="loggedPlays.error" />
    <div v-else>
        <div class="flex flex-col items-center justify-between">
            <div class="w-full text-left">
                <div v-if="loggedPlays.data" class="italic font-bold" >
                    <p class="mb-3 italic font-medium text-center">
                        {{ loggedPlays.data.length }} logged plays
                    </p>
                    <table
                        v-if="loggedPlays.data.length > 0"
                        class="table-auto border-2 border-blue-200 w-full">
                        <thead class="bg-blue-200 border-2 border-blue-200">
                        <tr class="">
                            <th class="py-2 px-2">Board game</th>
                            <th class="">Date</th>
                            <th class="">Duration (min)</th>
                            <th class="">Player count</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="border-b-2 border-blue-200" v-for="loggedPlay in loggedPlays.data">
                            <td class="py-2 px-2">{{ loggedPlay.name }}</td>
                            <td>{{ loggedPlay.date }}</td>
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
</template>