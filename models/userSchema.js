const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  phone :String,
  password : String,
  table : String,
  time : String,
  foods : []
}, { collection: 'myuser'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


const User = module.exports = mongoose.model('user',userSchema);
