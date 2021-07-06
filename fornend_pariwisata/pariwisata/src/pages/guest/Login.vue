<template>
    <q-layout class="bg">
        <q-page-container>
            <q-page padding class="row items-center justify-center">
                <div class="row full-width">
                    <div class="col-md-6 offset-md-3 col-xs-8 q-pa-md">
                        <q-card flat class="text-dark">
                            <div class="row items-center">
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-md-10 offset-1">
                                            <q-img src="~assets/undraw_Done_re_oak4.png">

                                            </q-img>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <q-card-section>
                                        <div class="text-h6">Pariwisata Pringsewu</div>
                                        <div>Login Akun Anda</div>
                                    </q-card-section>
                                    <q-form
                                    @submit="login"
                                    >
                                        <q-card-section>
                                            <q-input v-model="username" label="Username"/>
                                            <q-input type="password" v-model="password" label="Password"/>
                                        </q-card-section>
                                        <q-card-section>
                                            <q-btn class="full-width" type="submit" unelevated color="orange" label="Login"/>
                                            <q-btn class="full-width q-mt-md"
                                            :to="{ name:'registerPage' }"
                                            flat unelevated color="black"
                                            label="Registrasi"/>
                                        </q-card-section>
                                    </q-form>
                                </div>
                            </div>
                        </q-card>
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>
<style lang="scss" scoped>
.background {
    background-color: white;
}
.bg {
   background-image: url("https://cdn.pixabay.com/photo/2017/05/14/13/02/maldives-2312009_960_720.jpg") ;
    background-size: cover;
}
</style>
<script>
export default {
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    login () {
      this.$axios.post('user/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.data.sukses) {
          this.$q.localStorage.set('dataUser', res.data.data)
          if (res.data.data.level === 1) {
            this.$router.push({ name: 'dataUser' })
          } else {
            this.$router.push({ name: 'homeUser' })
          }
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    }
  }
}
</script>
