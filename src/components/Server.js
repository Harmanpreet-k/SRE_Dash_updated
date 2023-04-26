const mongoose = require("mongoose");
let Data = null;

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

const LoggedUserSchema = new mongoose.Schema({
  email: {
    type: String, // required: true, // unique: true,
  },
});

const LoggedUser = mongoose.model("loggedUser", LoggedUserSchema);

LoggedUser.createIndexes();

const Api = new mongoose.Schema({
  apikey: {
    type: String, // required: true, // unique: true,
  },
  apiid: {
    type: String,
  },
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
  api: [Api],
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
    // user.name = req.body.name;
    // console.log(user, "user");

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
            res.send({ msg: "valid user" });
          } else {
            console.log("hi");
            res.send({ msg: "invalid user" });
          }
        }
      })

      .catch((err) => {
        res.send({ msg: "invalid user" });
      });
  } catch (e) {
    res.send({ msg: "invalid credentials" });
  }
});

app.post("/loggeduser", async (req, resp) => {
  try {
    const user = new LoggedUser(req.body);

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

app.get("/loggeduser", async (req, resp) => {
  try {
    LoggedUser.find({}).then((data) => {
      // console.log(data, "loggeddata");
      Data = data[0].email;
      // console.log(Data);
      resp.json({ msg: Data });
      // return Data;
    });
  } catch (e) {
    resp.send();
  }
});

app.post("/api", async (req, resp) => {
  // console.log(req.body.email, "api1");
  try {
    let userData;
    User.find({ email: req.body.email }).then((data) => {
      userData = data;
      const userDetails = [];
      // console.log(userData[0]?.api, "api");
      if (userData[0]?.api != undefined) {
        userDetails.push(userData[0]?.api);
      }
      resp.json({ msg: userDetails });
      console.log(userDetails, "userDetails");
    });
  } catch (e) {
    resp.send();
  }
});

app.post("/update", async (req, resp) => {
  try {
    console.log(Data, "data2");
    let result = await User.findOneAndUpdate(
      { email: req.body.email }, // Query criteria
      { $push: { api: { apikey: req.body.apiKey, apiid: req.body.apiID } } }, // Update fields
      { new: true } // Return the updated document
    );

    if (result) {
      await result.save();

      console.log("Updated User: ", result);
      console.log("Updated apikey: ", result.apikey);
      console.log("Updated apiid: ", result.apiid);

      resp.send(result); // Send the updated document as response
    } else {
      console.log("User not found");
    }
  } catch (e) {
    resp.send("Something Went Wrong");
  }
});
app.listen(5000);
