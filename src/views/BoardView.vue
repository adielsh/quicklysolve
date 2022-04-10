<template>
  <v-container>
    <v-row style="margin-top: 60px">
      <v-col cols="12" sm="12" offset-sm="12">
        <v-card class="wrap-cards">
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="4">
                <!-- <v-text-field
                  label="חיפוש לפי תג"
                  v-model="searchStr"
                  clearable
                ></v-text-field> -->

                <v-combobox
                  :items="$store.state.allTags"
                  v-model="desiredTags"
                  chips
                  label="חיפוש לפי תגים"
                  multiple
                  solo
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
              </v-col>
              <v-col
                v-for="(user, i) in filteredTeachers"
                :key="i"
                class="d-flex child-flex"
                cols="12"
                xs="12"
              >
                <v-card
                  class="mx-auto"
                  max-width="500"
                  elevation="9"
                  shaped
                  outlined
                  flat
                  tile
                >
                  <v-card-title>
                    <div class="text-center">
                      <v-badge
                        :color="user.data.isBusy ? 'green' : 'red'"
                        content=""
                        left
                        transition="slide-x-transition"
                        overlap
                      >
                        <v-avatar color="blue">
                          <v-icon dark> mdi-account-circle </v-icon>
                        </v-avatar>
                      </v-badge>
                      {{ user.data.name }}
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <div class="text-center"></div>
                    <div v-if="user.data.tags">
                      <v-chip
                        style="margin: 3px"
                        v-for="(t, i) in user.data.tags"
                        :key="i"
                        :color="getRandomColor()"
                        outlined
                        >{{ t }}</v-chip
                      >
                    </div>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      icon
                      @click="user.data.showDetails = !user.data.showDetails"
                    >
                      <v-icon>{{
                        user.data.showDetails
                          ? 'mdi-chevron-up'
                          : 'mdi-chevron-down'
                      }}</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-expand-transition>
                    <div v-show="user.data.showDetails">
                      <v-divider></v-divider>

                      <v-card-text>
                        {{ user.id }}
                      </v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as Firebase from '../firebase_config';
export default {
  data: () => ({
    users: [],
    teachers: [],
    show: false,
    desiredTags: [],
  }),
  async mounted() {
    Firebase.db
      .collection('users')
      .where('type', '==', 'TEACHER')
      .onSnapshot((querySnapshot) => {
        this.users = [];
        // console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          if (!doc.data().tags) {
            this.teachers.push({ id: doc.id, data: doc.data() });
            return;
          }
          var tags = [];
          doc.data().tags.forEach((val, key, arr) => {
            Firebase.db
              .collection('tags')
              .doc(val)
              .get()
              .then((result) => {
                tags.push(result.id);
                if (Object.is(arr.length - 1, key)) {
                  let o = { id: doc.id, data: doc.data() };
                  o.data.tags = tags;
                  o.data.showDetails = false;
                  this.teachers.push(o);
                }
              });

            //  Firebase.db
            //  .collection("tags")
            //  .where("id", "==", it )
            //  .get().then(result=>{
            //   console.log(result)
            //  })
          });
        });
      });
  },
  methods: {
    // fiterByTag(val) {
    //   this.filteredTeachers = this.teachers;
    //   this.filteredTeachers = this.teachers.filter((it) => {
    //     return it.data.tags.includes(val);
    //     // return !it.data.tags.forEach((tag) => {
    //     //   return tag.indexOf(val) > -1;
    //     // });
    //     //return !it.id.indexOf(val);
    //   });
    // },
    getAllTags() {
      //todo: get all tags for db
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
  computed: {
    filteredTeachers() {
      var that = this;
      return this.teachers.filter((t) => {
        return that.desiredTags.every((v) => t.data.tags.includes(v));
        // return t.data.tags.forEach((tag) => {
        //   return tag.indexOf(this.searchStr) > -1;
        // });
        return true;
      });
    },
  },
};
</script>

<style scoped></style>
