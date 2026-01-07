import { Router } from "express";
import { userLogin, userLogOut, userSignUp, userInfo, addNewAnimeToList, updateAnimeStatusToList, updateAnimeEpisodeToList, deleteAnimeFromList, deleteUser } from "../controllers/user.controller.ts";
import { userAuth } from "../middlewares/auth.middleware.ts";

const router = Router();

router.route("/user/login").post(userLogin);
router.route("/user/signup").post(userSignUp);

// secured routes

// user routes
router.route("/user/logout").post(userAuth, userLogOut);
router.route("/user/user-info").get(userAuth, userInfo);
router.route("/user/delete-account").delete(userAuth, deleteUser)
// anime routes
router.route("/add/anime").post(userAuth, addNewAnimeToList);
router.route("/update/anime/status").patch(userAuth, updateAnimeStatusToList);
router.route("/update/anime/episode").patch(userAuth, updateAnimeEpisodeToList);
router.route("/delete/anime").patch(userAuth, deleteAnimeFromList);

export { router }