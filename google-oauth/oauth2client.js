const { google } = require('googleapis');
const config = require("config");
const { token } = require('morgan');

const CLIENT_ID = config.get("oauth.google.client_id");
const CLIENT_SECRET = config.get("oauth.google.client_secret");
const REDIRECT_URI = config.get("oauth.google.redirect_uri")

const scope = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];

const createConnection = () => new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const getAuthURL = (client) => client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
    scope
});

const authURL = () => getAuthURL(createConnection())

const getGoogleAccountFromCode = async (code) => {
    const auth = createConnection();
    const tokens = (await auth.getToken(code)).tokens;
    auth.setCredentials(tokens);
    const plus = google.people({ version: 'v1', auth });
    const me = await plus.people.get({ resourceName: "people/me", personFields: "emailAddresses,names" });
    return {
        id: me.data.id,
        name: me.data.names[0].displayName,
        email: me.data.emailAddresses[0].value,
        tokens
    }
}

module.exports = { authURL, getGoogleAccountFromCode }