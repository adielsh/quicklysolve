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
        solo
      ></v-combobox>

      <v-btn color="success" class="mr-4" @click="saveProfile"> שמור </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import * as Firebase from '../firebase_config';
export default {
  data: () => ({
    profile: {},
    userUpdatedTags: [],
  }),
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
    this.getTags();
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
      Firebase.db.collection('users').doc(this.profile.userId).update(
        {
          name: this.profile.name,
          tags: this.userUpdatedTags,
        },
        { merge: true }
      );
    },
    async getTags() {
      const snapshot = await Firebase.db.collection('tags').get();
      return snapshot.docs.forEach((doc) => {
        console.log(doc.id);
        this.$store.commit('SET_TAG', doc.id);
      });
    },
  },
};
</script>

<style scoped></style>
