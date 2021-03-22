<template>
  <section class="login">
    <h1>Register</h1>
    <form action="" method="POST" @submit.prevent="register">
      <label for="email">
        Email
        <input
          type="email"
          v-model="$v.formData.email.$model"
          name="email"
          :class="{ error: this.$v.formData.email.$error }"
        />
      </label>

      <div class="err-msg-wrapper" v-if="this.$v.formData.email.$error">
        <i class="fas fa-exclamation-triangle"></i>
        <p class="err-msg" v-if="!this.$v.formData.email.required">
          Email is required!
        </p>
        <p class="err-msg" v-if="!this.$v.formData.email.email">
          Email is incorrect!
        </p>
      </div>

      <label for="password">
        Password
        <input
          type="password"
          v-model="$v.formData.password.$model"
          :class="{ error: this.$v.formData.password.$error }"
        />
      </label>

      <div class="err-msg-wrapper" v-if="this.$v.formData.password.$error">
        <i class="fas fa-exclamation-triangle"></i>
        <p class="err-msg" v-if="!this.$v.formData.password.required">
          Password is required!
        </p>
        <p class="err-msg" v-if="!this.$v.formData.password.alphaNum">
          Password should contain only letters and digits!
        </p>
        <p class="err-msg" v-if="!this.$v.formData.password.minLength">
          Password should contain at least
          {{ this.$v.formData.password.$params.minLength.min }} symbols!
        </p>
        <p class="err-msg" v-if="!this.$v.formData.password.maxLength">
          Password should contain maximum
          {{ this.$v.formData.password.$params.maxLength.max }} symbols!
        </p>
      </div>

      <label for="repeat-password">
        Repeat Password
        <input
          type="password"
          v-model="$v.formData.repeatPassword.$model"
          :class="{ error: this.$v.formData.repeatPassword.$error }"
        />
      </label>

      <div
        class="err-msg-wrapper"
        v-if="this.$v.formData.repeatPassword.$error"
      >
        <i class="fas fa-exclamation-triangle"></i>
        <p class="err-msg" v-if="!this.$v.formData.repeatPassword.sameAs">
          Passwords do not match!
        </p>
      </div>

      <button type="submit" :class="{ hover: !this.$v.formData.$invalid }">
        Register
      </button>
    </form>
    <p class="login-question">
      You already have an account? Please,
      <router-link to="/user/login">Login</router-link>!
    </p>
  </section>
</template>

<script>
import { registerUser, setUserToDB } from "../../services/user";

import {
  required,
  email,
  alphaNum,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      formData: {
        email: "",
        username: "",
        password: "",
        repeatPassword: "",
      },
    };
  },
  validations: {
    formData: {
      email: {
        required,
        email,
      },
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(25),
      },
      password: {
        required,
        alphaNum,
        minLength: minLength(6),
        maxLength: maxLength(16),
      },
      repeatPassword: {
        sameAs: sameAs("password"),
      },
    },
  },
  methods: {
    async register() {
      try {
        const authRes = await registerUser(this.formData.email, this.formData.password);
        console.log('Authentication Response: ', authRes);

        const userCredentials = authRes.user;
        const currUser = {
          ...userCredentials.providerData[0],
          uid: userCredentials.uid,
        };

        this.$store.commit("setUser", currUser);

        const { uid } = currUser;

        const newUserToDB = {
          uid,
          proposals: [],
          stories: [],
          inspirations: [],
          storiesLiked: []
        };

        await setUserToDB(newUserToDB);

        this.$router.push({ name: "Stories" });
        
      } catch (e) {
        console.log('REGISTER ERROR: ', e);
        alert(`REGISTER ERROR: ${e.message}`);
      }

      // const user = firebase.auth().currentUser;
      // console.log("USER: ",user);

      // user
      //   .updateProfile({
      //     displayName: "Evgeni Dimitrov",
      //     photoURL: "https://scontent.fsof10-1.fna.fbcdn.net/v/t1.0-9/11218786_1122447354449411_3445061230582156527_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=jnfNox2rq3EAX9ccDMS&_nc_oc=AQknA6yEbHrYUbAdnu6zqdTURDeE69dR_8ZKEX8Y3xD2RtRSOTPFCC3csoos2Ev6yHE&_nc_ht=scontent.fsof10-1.fna&oh=32cbe6afcaea15902fa32f1ad1a4c8cb&oe=60785915",
      //   })
      //   .then(function (res) {
      //     console.log('RESPONSE: ', res);
      //   })
      //   .catch(function (error) {
      //     alert(error)
      //   });
    },
  },
};
</script>

<style>
</style>