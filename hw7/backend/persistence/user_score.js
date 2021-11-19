import User from '../models/ScoreCard.js';

const add_user_score = async (name, subject, score) => {
  console.log(name, subject, score)
  const existing = await User.findOne({name, subject})
  if (existing) {
    await User.updateOne({name, subject}, {name, subject, score})
    return 'Updating'
  }
  else{
    try{
      const newUser = new User({name, subject, score})
      console.log("Created user", newUser)
      await newUser.save();
      return 'Adding'
    }
    catch (e){
      throw new Error('User creation error:' + e);
    }
  }
}

const delete_db = async () => {
  try{
    await User.deleteMany({});
    console.log("database deleted");
  } catch(e) {
    throw new Error('Database deletion failed')
  }
}

const browse_user_score = async (type, filter) => {
  var data;
  if(type === 'name'){
    data = await User.find({name: filter}, {"name": 1, "subject": 1, "score": 1, "_id": 0})
  }
  else{
    data = await User.find({subject: filter}, {"name": 1, "subject": 1, "score": 1, "_id": 0})
  }
  return data
}

export {add_user_score, browse_user_score, delete_db}