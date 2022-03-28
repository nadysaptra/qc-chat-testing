const getRole = (req) => {
    return req.headers.role;
}

module.exports = {
    getRole,
}