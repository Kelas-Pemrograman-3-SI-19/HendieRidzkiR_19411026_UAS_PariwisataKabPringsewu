<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left blue"></div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-dark">
              <div class="text-h6">EDIT DATA WISATA</div>
              <div>Input Data Wisata Baru</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card>
      <q-card-section class="row">
            <q-form
            @submit="onSubmit()"
        class="q-gutter-md col-md-6 col-xs-12"
        >
        <q-input
            filled
            v-model="form.namaWisata"
            label="Nama Wisata"
            :rules="[ val => val && val.length > 0 || 'Mohon isi Nama Wisata']"
        />
        <q-input
            filled
            v-model="form.tempatWisata"
            label="Tempat Wisata"
            :rules="[ val => val && val.length > 0 || 'Mohon isi Tempat Wisata']"
        />
        <q-input
            filled
            v-model="form.harga"
            type="number"
            label="Harga Rp."
            :rules="[ val => val  > 0 || 'Mohon isi Harga Wisata']"
        />
        <div class="flex">
          Pilih Ranting
          <q-rating
          v-model="form.rating"
          size="2em"
          :max="5"
          class="q-ml-md"
          color="red"
          />
        </div>
        <q-input
          v-model="form.deskripsi"
          filled
          type="textarea"
          label="Deskripsi"
        />
        <q-file
        accept=".jpg, image/*"
        color="orange"
        v-model="image"
        label="Gambar">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
        </q-file>
        <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
        </q-form>
      </q-card-section>
    </q-card>
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      form: {
        namaWisata: null,
        tempatWisata: null,
        harga: 0,
        rating: 0,
        deskripsi: null
      },
      image: null
    }
  },
  methods: {
    getData () {
      this.$axios.get(`pariwisata/getbyid/${this.$route.params.id}`)
        .then(res => {
          if (res.data.sukses) {
            this.form = res.data.data
          } else {
            this.$router.push({ name: 'dataPariwisata' })
          }
        })
    },
    onSubmit () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(this.form))
      this.$axios.put(`pariwisata/edit/${this.$route.params.id}`, formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.$router.push({ name: 'dataPariwisata' })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  }
}
</script>
<style scoped>
.left {
  width: 5px;
  height: 100%;
  background-color: aqua;
}
</style>
