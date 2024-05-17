const mongoose = require("mongoose");

exports.dbConnect = async () => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Db Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
