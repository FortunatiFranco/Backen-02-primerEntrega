import { userModel } from "../users-model.js";

class userDAO {
    async getAll() {
        return await userModel.find({});
    }

    async getByEmail(email) {
        return await userModel.findOne({ email }).lean();
    }

    async getById(id) {
        return await userModel.findById(id).lean();
    }

    async updateByEmail(email, update) {
        return await userModel.updateOne({ email }, update);
    }

    async create(user) {
        return await userModel.create(user)
    }

    async delete(email) {
        return await userModel.deleteOne({ email });
    }
}

export default new userDAO();