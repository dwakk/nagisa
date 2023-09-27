import mongoose, { Model } from "mongoose";
import { Guild } from "./schemas/Guild";

mongoose.connect('mongodb://localhost:27017/nagisa').then(() => console.log("[DATABASE]: Connecté à Mongo")).catch(err => console.log(err));