export const checkAuth = async (req, res, next) => {
    try {
        if (req.session && req.session.user) {
            req.user = req.session.user;
            next();
        } else {
            return res.status(401).json({ isAuthenticated: false, message: "Vous n'êtes pas connecté" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
