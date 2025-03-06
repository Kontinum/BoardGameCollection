<script setup>
import { reactive, ref, watch} from "vue";
import { useToast } from "vue-toastification";

    const props = defineProps({
        show: {
            type: Boolean,
            default: false
        },
        boardGameData: {
            type: Object,
            default: {}
        },
        type: {
            type: String,
            default: "logPlayModal"
        }
    })

    const toast = useToast();
    const emit = defineEmits(['update:show'])

    let showModal = ref(props.show);
    const date = new Date();
    const dateString = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate())).slice(-2);

    const playLog = reactive({
        boardGameId: null,
        name: '',
        date: dateString,
        duration: '',
        playerCount: '',
    })

    // This will emit a `update:show` event to sync visibility back to the parent
    const closeModal = () => {
        emit('update:show', false);
    }

    const logPlay = async () => {
        playLog.boardGameId = props.boardGameData.id;
        playLog.name = props.boardGameData.name;
        try {
            const add = await fetch('/api/loggedPlays', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playLog),
            });

            if (add.ok) {
                emit('update:show', false);
                playLog.boardGameId = null;
                playLog.date = dateString;
                playLog.duration = '';
                playLog.playerCount = '';
            }

            toast.success(`Play for ${props.boardGameData.name} has been logged`);
        } catch (e) {
            toast.success('Error logging play');
        }
    }

    // Watch for changes in the `show` prop to sync `showModal` state
    watch(() => props.show, (newVal) => {
        showModal.value = newVal;
    });
</script>

<template>
    <div
        v-show="showModal"
        id="modal"
        class=" align-middle rounded-2xl lg:w-1/3 p-6 bg-white shadow-2xl shadow-blue-400 fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 z-9999 sm:w-2/3">
        <div class="modal-dialog text-xl mb-1">
            Log play for
            <span class="italic">
                {{ boardGameData.name }} ({{ boardGameData.publishYear }})
            </span>
        </div>
        <hr>
        <div class="flex flex-col justify-center items-center md:flex-row modal-body p-2">
            <div class="md:w-1/3">
                <img :src="boardGameData.thumbnail" alt="">
            </div>
            <div class="md:w-2/3 p-2">
                <div class="">
                    <label for="date" class="mr-2 w-1/3">
                        <span class="pi pi-calendar"></span>
                    </label>
                    <input
                        v-model="playLog.date"
                        id="date"
                        class="w-2/3 rounded-md border border-blue-200 p-1" min="1" type="date" required />
                </div>
                <div class="mt-2">
                    <label for="duration" class="mr-2 w-1/3">
                        <span class="pi pi-clock"></span>
                    </label>
                    <input
                        v-model="playLog.duration"
                        id="duration"
                        class="w-2/3 rounded-md border border-blue-200 p-1" type="number" placeholder="minutes" required />
                </div>
                <div class="mt-2">
                    <label for="player_no" class="mr-2 w-1/3">
                        <span class="pi pi-users"></span>
                    </label>
                    <input
                        v-model="playLog.playerCount"
                        id="player_no"
                        class="w-2/3 rounded-md border border-blue-200 p-1" min="1" type="number" placeholder="player count" required />
                </div>
            </div>
        </div>
        <hr>
        <div class="confirm mt-2 text-right">
            <button @click="closeModal" class="text-sm p-2 hover:bg-blue-300 mr-2">
                Cancel
            </button>
            <button
                @click="logPlay"
                class="text-sm p-2 border-2 border-white bg-blue-200 hover:bg-blue-300"
                title="Log play">
                Log play
            </button>
        </div>
    </div>
</template>