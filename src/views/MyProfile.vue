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
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-model="value"
        :items="profile.tags"
        chips
        label="תגים"
        multiple
        solo
      ></v-select>

      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

      <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn>
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
