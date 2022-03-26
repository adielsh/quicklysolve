<template>
  <v-container>
     <v-row style="margin-top:60px">
      <v-col cols="12" sm="12" offset-sm="12">
        <v-card class="wrap-cards">
          <v-container fluid>
            <v-row>
              <v-col
                v-for="(user, i) in users"
                :key="i"
                class="d-flex child-flex"
                cols="4"
              >
                <v-card style="border: 1px solid" flat tile class="d-flex">
                  <div style="height:200px;width:200px;">
                      <div>{{user.name}} שם</div>
                      <div>{{user.email}} מייל</div>
                      <div>{{user.type}} סוג</div>
                  </div>
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
import * as Firebase from "../firebase_config";
export default {
   data: () => ({
     users :[]
   }),
  async mounted() {
    Firebase.db
      .collection("users")
      .where("type", "==","TEACHER" )
      .onSnapshot((querySnapshot) => {
        this.users = [];
        console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
         this.users.push(doc.data())
        });
      });
  },

}
</script>

<style scoped>

</style>