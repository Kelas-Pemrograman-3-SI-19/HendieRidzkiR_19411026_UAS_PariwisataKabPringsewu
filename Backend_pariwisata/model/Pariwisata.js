const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PariwisataSchema = new Schema({
    namaWisata: {
        type: String
    },
    tempatWisata: {
        type: String
    },
    harga: {
        type: Number
    },
    rating: {
        type: Number,
        default: 0
    },
    deskripsi: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('pariwisata ', PariwisataSchema)