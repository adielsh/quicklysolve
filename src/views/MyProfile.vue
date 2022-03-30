<template>
  <v-container>
    <v-row style="margin-top: 60px">
      <v-col cols="12" sm="12" offset-sm="12">
        <v-card-title>ניהול פרופיל</v-card-title>
        <v-card class="wrap-cards">
          {{ profile }}
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as Firebase from '../firebase_config';
export default {
  data: () => ({
    profile: {},
  }),
  async mounted() {
    Firebase.db
      .collection('users')
      .doc(this.$store.state.currentUser.email)
      .get()
      .then((doc) => {
        console.log(doc.data(), '**********');
        this.profile = doc.data();
      });
  },
  methods: {
    getRandomColor() {
      const colors = [
        'red',
        'blue',
        'orange',
        'green',
        'yellow',
        'purple',
        'brown',
        'black',
      ];

      const random = Math.floor(Math.random() * colors.length);
      return colors[random];
    },
  },
};
</script>

<style scoped></style>
