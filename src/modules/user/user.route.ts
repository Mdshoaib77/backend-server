// import { Router } from "express";
// import { userController } from "./user.controler";
// import auth from "../../middleware/auth";

// const router = Router()



// router.post('/',userController.createUser );
// router.get('/',auth(), userController.getAllUsers);
// router.get('/:id', userController.getSingleUser)

// router.put('s/:id', userController.updateUser )
// router.delete("/:id", userController.deleteUser)


// export const userRoute = router

import { Router } from "express";
import { userController } from "./user.controler";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", userController.createUser);

router.get("/", auth("admin", "agent"), userController.getAllUsers);

router.get("/:id", userController.getSingleUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

export const userRoute = router;