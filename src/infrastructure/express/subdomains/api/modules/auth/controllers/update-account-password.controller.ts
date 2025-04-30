import { sendError, sendSuccess, sendValidationError } from '../../../../../../../services';
import { UpdateAccountPasswordBody } from '../../../../../validation';
import { Repository, UserEntity } from '../../../../../../../domains';
import { UpdateAccountPasswordResponse } from '../../../../../responses';
import { UserAccountVerificationStatusEnum, CustomExpressRequest, CustomExpressResponse } from '../../../../../../shared';

export async function UpdateAccountPasswordController (req: CustomExpressRequest, res: CustomExpressResponse) {
    try {
        let body: UpdateAccountPasswordBody;
        
        try {
            body = await new UpdateAccountPasswordBody(req.body).validate();
        } catch (error) {
            return sendValidationError(error, res);
        }

        const user: UserEntity = req.user;

        const updatedUserEntity = new UserEntity()
            .buildId(user._id)
            .buildEmail(user._email)
            .buildName(user._name)
            .buildGivenName(user._given_name)
            .buildFamilyName(user._family_name)
            .buildPicture(user._picture)
            .buildPassword(body.new_password)
            .buildVerificationStatus(UserAccountVerificationStatusEnum.CONFIRMED)
            .buildProfileStatus(user._profile_status)
            .buildRole(user._role)
            .buildCreatedAt(user._createdAt);

        const updatedUser = await Repository.User().update(updatedUserEntity);

        const response = new UpdateAccountPasswordResponse(updatedUser);

        return sendSuccess(response, res);

    } catch (error) {
        return sendError(error, req, res);
    }
}