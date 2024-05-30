const JWTManager = require('../utils/JWTManager')


/**
 * 
 */
const Authenticator = async (req, res, next) => {
    OriginAuthenticator(req, res, next, 'auth')
};

const OriginAuthenticator = async (req, res, next, type) => {
    try {
        const { authorization } = req.headers

        //토큰이 없으면 팅굼
        if (!authorization) {
            console.log('여기 옴');
            return res.status(200).json({
                status: 401,
                message: 'accece denied',
            });
        }
        console.log('여기 옴');
        //jwt 토큰인지 타입 검사
        const tokentype = authorization.split(' ')[0];
        const token = authorization.split(' ')[1];
        if (tokentype !== 'Bearer') {

            return res.status(200).json({
                status: 401,
                message: 'accece denied',
            });
        }
        const jwt = new JWTManager();
        const { no, name, userType } = await jwt.verifyToken(token);
        req.userInfo = { no, name, userType }

        if (type === 'auth') {
            next();
        } else {
            return res.status(200).json({
                status: 401,
                message: 'accece denied',
            });
        }
    } catch (err) {
        return res.status(500).json({
            resultMessage: 'Server error',
        });
    }
}


module.exports = Authenticator