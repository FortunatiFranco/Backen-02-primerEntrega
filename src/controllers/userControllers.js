import userServices from "../services/userServices.js";

export async function getAll(req, res) {
    const getUsers = await userServices.getAllUsers();
    res.json(getUsers);
}

export async function updateUser(req,res) { 
    const { id } = req.params;
    const update = req.body;
    const updateOne = await userServices.updateUser({id}, update);
    res.json(updateOne);
}

export async function deleteUser(req,res) {
    const {email} = req.body;
    const deleteOne = await userServices.deleteUser({email});
    res.json(deleteOne);
}