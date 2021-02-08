module.exports = {
    isAdmin: user => user.role.includes('ADMIN'),
    isEditor: user => user.role.includes('EDITOR'),
    isUser: user => user.role.includes('USER')
}