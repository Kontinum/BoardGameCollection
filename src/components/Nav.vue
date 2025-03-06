<script setup>
import {RouterLink} from "vue-router";
</script>

<template>
    <header class="border-b border-b-blue-300">
        <nav class="relative container mx-auto p-4">
            <div class="flex flex-col items-center md:flex-row space-y-6 md:space-y-0">
                <div class="flex flex-col md:w-3/6 space-y-1">
                    <img alt="Vue logo" class="logo mx-auto" src="@/assets/logo.svg" width="75" height="75" />
                    <p class="headerText text-center text-3xl text-blue-300 font-bold">Board game Collection</p>
                </div>
                <div class="flex md:w-3/6 md:text-center sm:flex-row md:flex-col lg:flex-row md:space-y-1 lg:space-y-0 md:space-x-0 lg:space-x-2 sm:space-x-6 lg:text-xl navLinks">
                    <RouterLink class="hover:text-blue-300" to="/">
                        <span class="hidden md:block">Home</span>
                        <span class="md:hidden">
                            <span class="pi pi-home text-xl navIcons" title="Home"></span>
                        </span>
                    </RouterLink>
                    <span class="hidden lg:block">|</span>

                    <RouterLink class="hover:text-blue-300" to="/search">
                        <span class="hidden md:block">Search games</span>
                        <span class="md:hidden">
                        <span class="pi pi-search text-xl navIcons" title="Search"></span>

                        </span>
                    </RouterLink>
                    <span class="hidden lg:block">|</span>

                    <RouterLink class="hover:text-blue-300" to="/collection">
                        <span class="hidden md:block">Collection</span>
                        <span class="md:hidden">
                            <span class="pi pi-list text-xl navIcons" title="Collection"></span>
                        </span>
                    </RouterLink>
                    <span class="hidden lg:block">|</span>

                    <RouterLink class="hover:text-blue-300" to="/logged_plays">
                        <span class="hidden md:block">Logged plays</span>
                        <span class="md:hidden">
                            <span class="pi pi-list-check text-xl navIcons" title="Logged plays"></span>
                        </span>
                    </RouterLink>
                    <span class="hidden lg:block">|</span>

                    <RouterLink class="hover:text-blue-300" to="/about">
                        <span class="hidden md:block">About</span>
                        <span class="md:hidden">
                            <span class="pi pi-info-circle text-xl navIcons" title="About"></span>
                        </span>
                    </RouterLink>
                </div>
            </div>
        </nav>
    </header>
</template>