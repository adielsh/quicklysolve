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
  mounted() {
    this.getTags();
  },
  methods: {
    async getTags() {
      const snapshot = await Firebase.db.collection('tags').get();
      return snapshot.docs.forEach((doc) => {
        console.log(doc.id);
        this.$store.commit('SET_TAG', doc.id);
      });
    },
  },
  data: () => ({
    //
  }),
};
</script>
