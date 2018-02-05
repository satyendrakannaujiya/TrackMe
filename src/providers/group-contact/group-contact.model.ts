import { UserProfile } from "../user-profiles/user-profile.model";

export class GroupContact {
  constructor(public userProfile: UserProfile, public isConnected: boolean) {}
}
