<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        Quickly Solve
      </div>

      <v-spacer></v-spacer>
    
      <v-btn v-if="!$store.state.currentUser" @click="googleLogin()"
      >
        <span class="mr-2">Login with Google</span>
        <!-- <v-icon>mdi-open-in-new</v-icon> -->
      </v-btn>   
      
      <v-btn v-if="$store.state.currentUser" @click="signOut()"
      >
        <span class="mr-2">Logout</span>
        <!-- <v-icon>mdi-open-in-new</v-icon> -->
      </v-btn> 
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import * as Firebase from "./firebase_config";

export default {
  name: 'App',
  mounted(){

  },
  methods:{
    googleLogin() {
                var provider = new Firebase.auth.GoogleAuthProvider();
                Firebase.auth()
                  .signInWithPopup(provider)
                  .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    console.log(token, user);
                    console.log(Firebase.auth().currentUser,"***************8")

                    this.$store.commit("SET_LOGGEDIN", user);
                    this.$router.push({ path: "/board/" });

        Firebase.db
        .collection("users")
       

        //////////////////////
        //////////////////////
        .doc(this.$store.state.currentUser.email)
        .set({
          userId: this.$store.state.currentUser.email,
          created_at: new Date(),
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          alert(error);
          console.error("Error writing document: ", error);
        });

                    // ...
                  })
                  .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    console.error(errorCode, email, credential, errorMessage);

                    alert("Oops. " + errorMessage);
                    // ...
                  });
    
    
    
    
    },
    signOut(){
    //  const auth = Firebase.auth.getAuth();
       Firebase.auth().signOut().then(() => {
        // Sign-out successful.
            console.log(Firebase.auth.currentUser,"***************8")
            this.$router.push("/")

      }).catch((error) => {
        // An error happened.
        alert("error signout: " + error)
      });
    }
  },
  data: () => ({
    //
  }),
};
</script>
