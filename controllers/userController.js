const { User } = require('../database');

exports.insertUser = async (req, res) => {
    const { name, des, price, quan } = req.body;
    try {
        const user = await User.create({ name, des, price, quan });
        res.status(201).send('User inserted successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting user.');
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        console.log(users);
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users.');
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.destroy();
            res.status(200).send('User deleted successfully.');
        } else {
            res.status(404).send('User not found.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting user.');
    }
};

exports.editUser = async (req, res) => {
    const userId = req.params.id;
    const updateuser = req.body;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.update(updateuser);
            res.status(200).send('User edited successfully.');
        } else {
            res.status(404).send('User not found.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error editing user.');
    }
};
