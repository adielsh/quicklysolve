<template>
  <v-app>
    <header-component />
    <router-view />
  </v-app>
</template>

<script>
import HeaderComponent from './components/Header';

export default {
  name: 'App',
  components: { HeaderComponent },
  mounted() {},
  methods: {},
  data: () => ({
    //
  }),
};
</script>
