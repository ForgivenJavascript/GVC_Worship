import { BaseService} from './';

class UserService extends BaseService {
    constructor() {
        super("users");
    }

    async addNewUser(userId, email, name) {
        await this.update(userId, {
            created_on: new Date(),
            email: email,
            last_logged_in: new Date(),
            name: name,
            role: 2
        })
    }
}
export default new UserService();