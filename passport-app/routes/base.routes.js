const express = require('express')
const router = express.Router()

const { checkLoggedIn, checkRole } = require('./../middleware')
const { isAdmin } = require('./../utils')

// Endpoints
router.get('/', (req, res) => res.render('index'))

router.get('/mi-perfil', checkLoggedIn, (req, res) => res.render('profile', { user: req.user, isAdmin: isAdmin(req.user) }))

router.get('/admin-page', checkLoggedIn, checkRole('ADMIN'), (req, res) => res.send('Acceso autorizado porque eres ' + req.user.role))
router.get('/editor-page', checkLoggedIn, checkRole('ADMIN', 'EDITOR'), (req, res) => res.send('Acceso autorizado porque eres ' + req.user.role))
router.get('/guest-page', checkLoggedIn, checkRole('ADMIN', 'EDITOR', 'GUEST'), (req, res) => res.send('Acceso autorizado porque eres ' + req.user.role))


module.exports = router