const { initializeApp, cert } = require('firebase-admin/app');
const {getAuth} = require('firebase-admin/auth');
const serviceAccount = require('../iic-auth-test-firebase-adminsdk.json') || require('../serviceAccountExample.json');
initializeApp({
    credential: cert(serviceAccount)
});

class firebaseAdmin {
    async verifyIdToken(idToken) {
        let {err, user} = false
        try {
            const decodedToken = await getAuth().verifyIdToken(idToken);
            user = {
                uid: decodedToken.uid,
            };
        } catch (error) {
            err = {error: error.message};
        } finally {
            return {
                err,
                user
            }
        }
    }
    async getUser(uid) {
        let {err, user} = false
        try {
            user = await getAuth().getUser(uid);
        } catch (error) {
            err = {error: error.message};
        } finally {
            return {
                err,
                user:user.toJSON()
            }
        }
    }
}

module.exports = {
    firebaseAdmin
}