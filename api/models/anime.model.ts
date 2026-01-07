import mongoose, { Schema } from "mongoose";

interface AnimeType extends Document {
  name: string;
  malId: number;
  cover: string;
  totalEpisodes: number;
  status: string;
  year: number;
  genre: string;
  rating: string;
  score: Float16Array
}

const animeSchema = new Schema<AnimeType>({
  name: {
    type: String,
    required: true
  },
  malId: {
    type: Number,
    required: true
  },
  cover: String,
  totalEpisodes: Number,
  status: String,
  year: Number,
  genre: String,
  rating: String,
  score: Float16Array,
})

export const AnimeList = mongoose.model("AnimeList", animeSchema);
export type { AnimeType }