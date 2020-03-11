<template>
    <nav>
        <v-toolbar app dark class="secondary">
            <v-toolbar-side-icon @click="isDrawerOpen = !isDrawerOpen" />
            <v-toolbar-title class="headline text-uppercase">
                <span class="font-weight-light">Timer</span>
            </v-toolbar-title>
        </v-toolbar>

        <v-navigation-drawer app dark v-model="isDrawerOpen">
            <v-toolbar class="secondary">
                <v-toolbar-title class="title">Laps</v-toolbar-title>
            </v-toolbar>
        </v-navigation-drawer>
    </nav>
</template>

<script>
    export default {
        name: 'Navbar',
        data () {
            return {
                isDrawerOpen: false
            }
        }
    }
</script>
