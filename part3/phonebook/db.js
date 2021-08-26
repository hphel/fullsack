const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')  
    })  
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)  
    })

const phoneRecordSchema = new mongoose.Schema({
    id: { type: Number, unique: true, min: 1 },
    number: { type: String, minLength: 8 },
    name: { type: String, unique: true, minLength: 3 }
})

phoneRecordSchema.plugin(uniqueValidator)

const PhoneRecord = mongoose.model('PhoneRecord', phoneRecordSchema)


exports.getAll = function () {
    return PhoneRecord.find({});
}

exports.add = function (name, number) { 
    return PhoneRecord.find({})
    .sort({ id: -1 })
    .limit(1)
    .then(items => new PhoneRecord({
        name: name,
        number: number,
        id: items.length > 0 ? items[0].id + 1 : 1,
    }).save())
}

exports.remove = function (id) {
    return PhoneRecord.deleteOne({ id: id })
}

exports.get = function (id) {
    return PhoneRecord.findOne({ id: id })
}

exports.update = function (id, newPerson) {
    return PhoneRecord.findOneAndUpdate({ id: id }, newPerson, { runValidators: true })
}