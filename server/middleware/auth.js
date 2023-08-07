import jwt from 'jsonwebtoken';

// Sử dụng để xác thực xem token khi đã login có tồn tại hay không nếu không thì chặn lại
export const verifyToken = async (req, res, next) => {
    try {
        // Chỉ có khi token đã được tạo sẵn khi login
        let token = req.header('Authorization');
        console.log(token);
        if (!token) {
            return res.status(403).send('Access Denied');
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7).trim();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
