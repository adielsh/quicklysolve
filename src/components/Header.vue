<template>
  <div>
    <v-app-bar color="primary" dark fixed>
      <v-btn v-if="isLogin" @click.stop="drawer = !drawer" icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      QuickSolve

      <v-spacer></v-spacer>
      <!-- <v-toolbar-title style="text-align:center">{{appTitle }}</v-toolbar-title> -->
      <v-btn v-if="!$store.state.currentUser" @click="googleLogin()">
        SignIn</v-btn
      >
      <v-btn v-if="!!$store.state.currentUser" @click="signOut()">Logout</v-btn>
      <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
    </v-app-bar>

    <v-layout v-if="isLogin" wrap>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list class="pa-1">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list class="pt-0" dense>
          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            @click="route(item)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </div>
</template>

<script>
import * as Firebase from '../firebase_config';

export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: 'ראשי', icon: 'mdi-clipboard-edit', route: 'board' },
        { title: 'הפרופיל שלי', icon: 'mdi-pencil', route: 'myprofile' },
        { title: 'אודות', icon: 'mdi-progress-question', route: 'about' },
        { title: 'ניתוק מהמערכת', icon: 'mdi-logout', route: 'logout' },
      ],
      right: null,
      mini: true,
    };
  },
  computed: {
    appTitle() {
      return this.$store.state.appTitle;
    },
    isLogin() {
      return !!this.$store.state.currentUser;
    },
    currentUserEmail() {
      return this.$store.state.currentUser.email;
    },
  },
  name: 'header-component',
  methods: {
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

          this.$store.commit('SET_LOGGEDIN', user);
          this.$router.push({ path: '/board' });
          console.log(Firebase.auth().currentUser, '***************8');

          Firebase.db
            .collection('users')

            //////////////////////
            //////////////////////
            .doc(this.$store.state.currentUser.email)
            .set(
              {
                userId: this.$store.state.currentUser.email,
                created_at: new Date(),
              },
              { merge: true }
            )
            .then(() => {
              console.log('Document successfully written!');
            })
            .catch((error) => {
              alert(error);
              console.error('Error writing document: ', error);
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

          alert('Oops. ' + errorMessage);
          // ...
        });
    },
    signOut() {
      //  const auth = Firebase.auth.getAuth();
      Firebase.auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          console.log(Firebase.auth.currentUser, '***************8');
          this.$router.push('/');
        })
        .catch((error) => {
          // An error happened.
          alert('error signout: ' + error);
        });
    },
    route(item) {
      this.$router.push({ path: '/' + item.route + '/' });
      if (item.route === 'logout') {
        this.signOut();
      }
    },
    prev() {
      this.$router.back();
    },
  },
};
</script>

<style>
/*.v-navigation-drawer{*/
/*top: unset!important;*/
/*}*/
</style>
