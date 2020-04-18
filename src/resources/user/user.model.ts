import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  pseudo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    enum: ["internaut", "admin", "fact_checker"],
    default: "internaut",
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
export { User, UserSchema };
