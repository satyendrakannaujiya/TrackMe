import { UserProfile } from "../user-profiles/user-profile.model";
import { Position } from "./position.model";

export class JourneyDetails {
  constructor(
    started_by: UserProfile = new UserProfile(),
    current_position: Position = new Position(),
    members: Array<UserProfile> = [],
    positions: Array<Position> = [],
    status: string = "",
    from: string = "",
    to: string = ""
  ) {}
}
