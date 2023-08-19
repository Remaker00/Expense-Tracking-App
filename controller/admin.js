const {Expense} = require('../dataB');

exports.insertExp = async (req, res) => {
    const { expense, description, category} = req.body;
    try{
        const exp = await Expense.create({ expense, description, category});
        res.status(201).send('User inserted successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting user.');
    }
};

exports.getAllExp = async (req, res) => {
    try {
        const users = await Expense.findAll();
        console.log(users);
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users.');
    }
};

exports.deleteExp = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await Expense.findByPk(userId);
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