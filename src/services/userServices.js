class userServices {
    constructor(dao) {
        this.dao = dao;
    }

    async getAllUsers() {
        return await this.dao.getAll();
    }

    async getUser(email) {
        return await this.dao.getByEmail(email)
    }

    async updateUser(email, update) {
        return await this.dao.updateByEmail(email, update)
    }

    async createUser(user) {
        return await this.dao.create(user);
    }

    async deleteUser(email) {
        return await this.dao.delete(email)
    }
}