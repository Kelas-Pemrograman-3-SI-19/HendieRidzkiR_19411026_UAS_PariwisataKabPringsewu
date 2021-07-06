const pariwisataModel = require ('../model/Pariwisata')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')

exports.insertPariwisata = (data) =>
  new Promise((resolve, reject) => {
    pariwisataModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Input Pariwisata')))
    .catch(() => reject(requestResponse.serverError))
  })

  exports.getAllPariwisata = () =>
    new Promise((resolve, reject) => {
        pariwisataModel.find({})
           .then(pariwisata => resolve(requestResponse.suksesWithData(pariwisata)))
           .catch(error => resolve(requestResponse.serverError))
    })

    exports.getbyId = (id) =>
      new Promise((resolve, reject) => {
          pariwisataModel.findOne({
              _id: objectId(id)
          }).then(pariwisata => resolve(requestResponse.suksesWithData(pariwisata)))
          .catch(error => reject(requestResponse.serverError))
      })

exports.editPariwisata = (data, id, changeImage) =>
  new Promise(async(resolve, reject) => {
    pariwisataModel.updateOne({
      _id: objectId(id)
    }, data)
      .then(() => {
        if (changeImage) {
          deleteImage(data.oldImage)
        }
        resolve(requestResponse.sukses('Berhasil Edit Daftar Pariwisata'))
      }).catch(() => reject(requestResponse.serverError))
  })

  exports.delete = (id) =>
    new Promise((resolve, reject) => {
      pariwisataModel.findOne({
        _id: objectId(id)
      }).then(pariwisata => {
        pariwisataModel.deleteOne({
          _id: objectId(id)
        }).then(() => {
          deleteImage(pariwisata.image)
          resolve(requestResponse.sukses('Berhasil Hapus List pariwisata'))
        }).catch(() => reject(requestResponse.serverError))
      })
    })