const express = require("express")
const cors = require('cors')
const { check, validationResult } = require("express-validator")
const connectDB = require('./config/db')
const Users = require('./models/User')

const app = express()


app.use(cors())
app.use(express.json({ extended: false }))

connectDB()


//gettin all users 

app.get('/allUser/:pgn', async (req, res) => {
    try {

        let startPoint = (req.params.pgn - 1) * 10
        const result = {}
        if (req.params.pgn - 1 > 0) {
            result.prev = req.params.pgn - 1
        }
        // console.log(Users.countDocuments().exec());
        if ((req.params.pgn) * 10 < await Users.countDocuments().exec()) {
            console.log(req.params.pgn);
            result.next = Number(req.params.pgn) + 1
        }

        const users = await Users.find().skip(startPoint).limit(10)

        result.users = users

        res.json(result)



    } catch (err) {

        console.error(err);

        res.status(500).json({ msg: "Server error !!" })

    }
})

// adding users 

app.post('/addUser', [
    check("name", "Name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("address", "Address is required").not().isEmpty(),
    check("pincode", "pincode is required").isNumeric(),
    check('number1', 'Check primary number').isNumeric()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = new Users({ ...req.body })

        await user.save()
        res.send({ msg: "Saved successfully" })

    } catch (err) {

        console.error(err);

        res.status(500).json({ msg: "Server error !!" })

    }
    console.log(req.body);


})



app.delete('/deleteUser/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const user = await Users.findByIdAndDelete(id)

        // await user.save()
        res.send({ msg: "Deleted successfully" })

    } catch (err) {

        console.error(err);

        res.status(500).json({ msg: "Server error !!" })

    }

})


app.put('/updateUser', [
    check("email", "email is required").isEmail(),
    check("address", "Address is required").not().isEmpty(),
    check("pincode", "pincode is required").isNumeric(),
    check('number1', 'Check primary number').isNumeric(),
    check('number2', 'Check secondary number').isNumeric()
], async (req, res) => {

    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, number1,number2,email,address,pincode } = req.body;


    const user = Users.findByIdAndUpdate(id, { number1,number2,email,address,pincode }, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Server error!!" })
        }
        console.log("updated");
        res.status(200).json({ msg: "Updated" })
    })

    // await user.save()
    // res.send({ msg: "Deleted successfully" })


})









const PORT = process.env.PORT || 5001;


app.listen(PORT, () => console.log(`server is running on port ${PORT}`))