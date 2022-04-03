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
    <v-form ref="form" lazy-validation>
      <v-combobox
        :items="$store.state.tags"
        chips
        label="תגים"
        multiple
        solo
      ></v-combobox>

      <v-btn color="success" class="mr-4" @click=""> Validate </v-btn>
    </v-form>
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
    this.getTags();
  },
  methods: {
    async getTags() {
      const snapshot = await Firebase.db.collection('tags').get();
      return snapshot.docs.forEach((doc) => {
        this.$store.commit('SET_TAG', doc.id);
      });
    },
  },
};
</script>

<style scoped></style>
