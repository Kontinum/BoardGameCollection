<script setup>
import SiteWelcome from "@/components/SiteWelcome.vue";
import SiteInfo from "@/components/SiteInfo.vue";
import CollectionInfo from "@/components/CollectionInfo.vue";
import bgCollection from "../bg_collection.json"
import ContainerAuto from "@/components/ContainerAuto.vue";
</script>

<template>
    <ContainerAuto>
        <div class="flex flex-col justify-center items-center">
            <SiteWelcome />
            <SiteInfo />
            <CollectionInfo :bg-collection="bgCollection" />
        </div>
    </ContainerAuto>
</template>
