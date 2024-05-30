const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


//토큰 생성, 검증을 해주는 클래스 생성
class Authenticator {

    // 토큰 생성
    async createToken(data) {
        return JWT.sign(data, "gpsriding", { expiresIn: '4h' })
    }

    // 토큰 검증
    async verifyToken(token) {
        try {
            const decode = JWT.verify(token, "gpsriding");
            if (decode) return decode;
            else return false;
        } catch (e) {
            console.log(e.message);
            return false;
        }

    }
}

module.exports = Authenticator;