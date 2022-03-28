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
                <v-card style="height:200px;width:200px;" elevation="9" shaped
  outlined flat tile class="d-flex">
                  <v-card-text >
                      <div>{{user.data.name}}</div>
                      <div>{{user.id}} מייל</div>
                      <div>{{user.data.type}} סוג</div>
                      <div v-if="user.data.tags">
                            
                               <v-chip v-for="(t,i) in user.data.tags" :key="i"
                                  color="orange"
                                  outlined
                                >{{t.label}}</v-chip>
                      </div>
                     
                  </v-card-text>
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
        // console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          console.log(doc)
          console.log(doc.data())
          if(!doc.data().tags){
            this.users.push({id: doc.id ,data : doc.data()})
              return
          } 
          var tags = []
          doc.data().tags.forEach((val,key,arr)=>{
          Firebase.db
           .collection("tags").doc(val).get().then(result=>{
             console.log(result.data())
             tags.push(result.data())
             if (Object.is(arr.length - 1, key)) {
                  let o ={id: doc.id ,data : doc.data()}
                  o.data.tags = tags
                  this.users.push(o)
             } 
            })


            //  Firebase.db
            //  .collection("tags")
            //  .where("id", "==", it )
            //  .get().then(result=>{
            //   console.log(result)
            //  })
           
          })
        });
      });
  },

}
</script>

<style scoped>

</style>