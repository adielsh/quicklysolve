<template>
  <v-container>
    <v-row style="margin-top: 60px">
      <v-col cols="12" sm="12" offset-sm="12">
        <v-card class="wrap-cards">
          <v-card-title>ניהול פרופיל</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-form ref="form" lazy-validation>
      <v-text-field
        label="מזהה משתמש"
        v-model="profile.userId"
        hide-details="auto"
        disabled
      ></v-text-field>
      <v-text-field
        label="שם משתמש"
        v-model="profile.name"
        hide-details="auto"
      ></v-text-field>
      <v-combobox
        :items="$store.state.allTags"
        v-model="userUpdatedTags"
        chips
        label="תגים"
        multiple
      >
        <template v-slot:selection="data">
          <v-chip
            class="ma-2"
            close
            label
            outlined
            :key="JSON.stringify(data.item)"
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click:close="data.parent.selectItem(data.item)"
          >
            <!-- <v-avatar
              class="accent white--text"
              left
              v-text="data.item.slice(0, 1).toUpperCase()"
            ></v-avatar> -->
            {{ data.item }}
          </v-chip>
        </template>
      </v-combobox>
      <v-switch
        v-model="profile.isBusy"
        :label="profile.isBusy ? 'פנוי' : 'תפוס'"
        :color="getSwitchColor"
        hide-details
      ></v-switch>

      <v-btn color="success" class="mr-4" @click="saveProfile"> שמור </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import * as Firebase from '../firebase_config';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
export default {
  data: () => ({
    profile: {},
    userUpdatedTags: [],
  }),
  computed: {
    getSwitchColor() {
      this.profile.isBusy ? 'error' : 'success';
    },
  },
  async mounted() {
    Firebase.db
      .collection('users')
      .doc(this.$store.state.currentUser.email)
      .get()
      .then((doc) => {
        console.log(doc.data(), '**********');
        this.profile = doc.data();
        this.userUpdatedTags = this.profile.tags;
        console.log(this.userUpdatedTags, '&&&&&&&&&&&&&&&&&&&&&&&&&&');
      });
    // this.getTags();
  },
  methods: {
    saveProfile() {
      // console.log( a2.filter(x => !a1.includes(x)) );
      var tagsToAddToGlobal = this.userUpdatedTags.filter(
        (x) => !this.$store.state.allTags.includes(x)
      );
      tagsToAddToGlobal.forEach((it) => {
        // Add a new document in collection "cities"
        Firebase.db
          .collection('tags')
          .doc(it)
          .set({})
          .then(() => {
            console.log('Document successfully written!');
          })
          .catch((error) => {
            console.error('Error writing document: ', error);
          });
      });
      console.log(tagsToAddToGlobal);
      console.log(this.userUpdatedTags);
      Firebase.db
        .collection('users')
        .doc(this.profile.userId)
        .update(
          { ...this.profile, tags: this.userUpdatedTags },
          { merge: true }
        )
        .then(() => {
          Toastify({
            text: 'נשמר',
            duration: 1000,
            newWindow: true,
            gravity: 'top', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: 'green',
            },
            onClick: function () {}, // Callback after click
          }).showToast();
        });
    },
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
