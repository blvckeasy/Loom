import { GoogleAuthUserProfileInterface } from "./user-profile.interface";

export interface UserInfoInterface {
    status: number;
    data: GoogleAuthUserProfileInterface
}