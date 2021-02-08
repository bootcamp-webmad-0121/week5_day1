const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const bcryptSalt = 10



// User signup
router.get("/registro", (req, res) => res.render("auth/signup"))

router.post("/registro", (req, res, next) => {

    const { username, password } = req.body

    if (username === "" || password === "") {
        res.render("auth/signup", { errorMsg: "Rellena los campos" })
        return
    }

    User
        .findOne({ username })
        .then(user => {

            if (user) {
                console.log('El usuario es', user)
                res.render("auth/signup", { errorMsg: "El usuario ya existe" })
                return
            }

            // Validación pwd

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, password: hashPass })
                .then(() => res.redirect("/"))
                .catch(() => res.render("auth/signup", { errorMsg: "Error de servidor" }))
        })
        .catch(error => next(new Error(error)))
})



// User login
router.get("/iniciar-sesion", (req, res) => res.render("auth/login", { errorMsg: req.flash("error") }))

router.post("/iniciar-sesion", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/iniciar-sesion",
    failureFlash: true,
    passReqToCallback: true
}))


// User logout
router.get("/cerrar-sesion", (req, res) => {
    req.logout();
    res.redirect("/iniciar-sesion");
});

module.exports = router