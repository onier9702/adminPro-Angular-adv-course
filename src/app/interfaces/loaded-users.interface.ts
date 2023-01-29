import { User } from '../models/user.model';

export interface LoadedUsers {
    count: number;
    ok: boolean;
    users: User[];
}