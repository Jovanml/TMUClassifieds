import firebase_admin
from firebase_admin import credentials, auth
import os

#firebase credentials
cred = credentials.Certificate({
    "type": os.getenv("FIREBASE_ACCOUNT_TYPE"),
    "project_id": os.getenv("FIREBASE_PROJECT_ID"),
    "private_key_id": os.getenv("FIREBASE_PRIVATE_ID_KEY"),
    "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace('\\n', '\n'),
    "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
    "client_id": os.getenv("FIREBASE_CLIENT_ID"),
    "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
    "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("FIREBASE_PROVIDER_CERT_URL"),
    "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_CERT_URL"),
    "universe_domain": os.getenv("FIREBASE_UNIVERSE_DOMAIN"),
})
#initirlize firebase app
firebase_admin.initialize_app(cred)

#verify token passed during login
def verify_id_token(token):
    try:
        decoded_token = auth.verify_id_token(token)
        print(decoded_token)
        return decoded_token
    except auth.InvalidIdTokenError:
        return None