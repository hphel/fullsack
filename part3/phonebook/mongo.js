const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullsack:${password}@cuheo.v0v27.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phoneRecordSchema = new mongoose.Schema({
  id: { type: Number, unique: true, min: 1 },
  number: { type: String },
  name: { type: String }
})

const PhoneRecord = mongoose.model('PhoneRecord', phoneRecordSchema)

function getAll() {
    return PhoneRecord.find({});
}

function add(name, number) { 
    return PhoneRecord.find({})
    .sort({ id: -1 })
    .limit(1)
    .then(items => new PhoneRecord({
        name: name,
        number: number,
        id: items.length > 0 ? items[0].id + 1 : 1,
    }).save())
}

if (process.argv.length === 5) {
    name = process.argv[3]
    number = process.argv[4]
    add(name, number).then(res => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log("phonebook:")
    getAll().then(items => {
        items.forEach(i => {
            console.log(`${i.name} ${i.number}`)
        })
        mongoose.connection.close()
    })
}




