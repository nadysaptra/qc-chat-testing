// const headers = require('../services/headers')

const roleGuard = (req, res, next) => {
    /**
     * for testing purpose will comment this out
     * const isAgent = headers.getRole(req) == 'agent';
     * const isSupervisor = headers.getRole(req) == 'supervisor';
     * if (!isAgent && !isSupervisor) {
     *      res.json({ status: 400, message: 'Unauthorized' }, 500)
     *      return;
     * }
     */
    next()
}

module.exports = {
    roleGuard
}