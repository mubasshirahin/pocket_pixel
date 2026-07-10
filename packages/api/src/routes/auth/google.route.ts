import { Request, Response, Router } from 'express';
import Joi from 'joi';
import type { GoogleSignInPayload } from '@expense-tracker/shared';
import { authService, utilService } from '../../services';
import { asyncHandler } from '../../middleware/error-handler';

const router = Router();
const googleSchema = Joi.object<GoogleSignInPayload>({
  credential: Joi.string().required(),
});

router.post(
  '/google',
  asyncHandler(async (req: Request, res: Response) => {
    const { error, value } = googleSchema.validate(req.body);
    if (error) return utilService.replyError(res, error.message);

    const result = await authService.googleSignIn(value as GoogleSignInPayload);
    return utilService.replyOk(res, result);
  }),
);

export default router;
