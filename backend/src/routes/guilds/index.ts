import { Router } from "express";
import { isAuthenticated } from "../../utils/middlewares";
import { getGuildsController, getSingleGuildController, getSingleGuildPartnershipController, getSingleGuildPluginController, handleBlacklistController, handlePartnerShipEmbedController, handlePartnershipManagersController, handlePartnershipSettingsController } from "../../exports";

const router = Router()


router.get('/', isAuthenticated, getGuildsController)


router.get('/:id', isAuthenticated, getSingleGuildController)

router.get('/:id/:plugin', isAuthenticated, getSingleGuildPluginController)

router.get('/:id/partnership/:partnershipid', isAuthenticated, getSingleGuildPartnershipController)


router.put('/:id/blacklist', isAuthenticated, handleBlacklistController)
router.put('/:id/partnership/embed', isAuthenticated, handlePartnerShipEmbedController)
router.put('/:id/partnership/managers', isAuthenticated, handlePartnershipManagersController)
router.put('/:id/partnership/settings', isAuthenticated, handlePartnershipSettingsController)

export default router