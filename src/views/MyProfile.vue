<template>
  <v-container>
    <v-row style="margin-top: 60px">
      <v-col cols="12" sm="12" offset-sm="12">
        <v-card class="wrap-cards">
          <v-card-title>ניהול פרופיל</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-form ref="form" lazy-validation v-if="profile.type == 'TEACHER'">
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
    </v-form>

    <div>
      <span style="color: red">נא עדכן סוג משתמש</span>
      <v-row align="center">
        <v-col cols="6">
          <v-select
            v-model="userType"
            :items="usersTypes"
            menu-props="auto"
            label="סוג משתמש"
            hide-details
            prepend-icon="mdi-cat"
            single-line
          ></v-select>
        </v-col>
      </v-row>
      <div>
        <v-btn color="success" class="mr-4" @click="saveProfile"> שמור </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import * as Firebase from '../firebase_config';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
export default {
  data: () => ({
    profile: {},
    userType: '',
    userUpdatedTags: [],
    usersTypes: [
      {
        text: 'מורה',
        value: 'TEACHER',
      },
      {
        text: 'תלמיד',
        value: 'STUDENT',
      },
    ],
  }),
  computed: {
    getSwitchColor() {
      this.profile.isBusy ? 'error' : 'success';
    },
  },
  async mounted() {
    console.log(this.$store.state.currentUser.email);
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
      if (this.userUpdatedTags && this.userUpdatedTags.length > 0) {
        var tagsToAddToGlobal = this.userUpdatedTags.filter(
          (x) => !this.$store.state.allTags.includes(x)
        );
      }

      //add new tags to tags colllection
      if (tagsToAddToGlobal && tagsToAddToGlobal.length > 0) {
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
      }

      console.log(this.profile);
      // console.log(this.userUpdatedTags);
      this.profile.type = this.userType;
      if (this.userUpdatedTags && this.userUpdatedTags.length > 0) {
        this.profile.tags = this.userUpdatedTags;
      }
      Firebase.db
        .collection('users')
        .doc(this.profile.userId)
        .update({ ...this.profile }, { merge: true })
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
