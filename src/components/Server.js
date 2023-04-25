const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://souvikpal1:PeUSsHQtuybYofLi@cluster0.9n81ur5.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    }

    //   (err) => (err ? console.log(err) : console.log("Connected to database"))
  )
  .then((result) => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const UserSchema = new mongoose.Schema({
  name: {
    type: String, // required: true,
  },

  email: {
    type: String, // required: true, // unique: true,
  },

  phone: {
    type: String,
  },

  password: {
    type: String,
  },
});

const User = mongoose.model("users", UserSchema);

User.createIndexes();

// For backend and express

const express = require("express");

const app = express();

const cors = require("cors");

console.log("App listen at port 5000");

app.use(express.json());

app.use(cors());

app.get("/", (req, resp) => {
  resp.send("App is Working"); // You can check backend is working or not by // entering http://loacalhost:5000 // If you see App is working means // backend working properly
});

app.post("/register", async (req, resp) => {
  try {
    const user = new User(req.body);

    let result = await user.save();

    result = result.toObject();

    if (result) {
      delete result.password;

      resp.send(req.body);

      console.log(result);
    } else {
      console.log("User already register");
    }
  } catch (e) {
    resp.send("Something Went Wrong");
  }
});
app.post("/login", async (req, res) => {
  const user = new User(req.body);
  try {
    User.findOne({ email: user.email })
      .then((userData) => {
        console.log(userData);

        if (userData != undefined && userData != null) {
          if (userData.password == user.password) {
            // res.status(200).json;
            res.render("valid user");
            // return "Valid User";
            //  res.status(200).send("Valid User");
          }
        }
      })

      .catch((err) => {
        res.send();
        // return res.status(420).send("Valid User");
      });
  } catch (e) {
    res.send("Somthing Wrong");
  }
});
app.listen(5000);
