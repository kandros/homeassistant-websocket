# Home Assistant WebSocket demo

## setup
```bash
mv .env.example .env
npm install
```

## add api token
- go to http://homeassistant.local:8123/profile/security
- Scroll down to "Long-Lived Access Tokens"
- Click "Create  Token"
- put the token in the `.env` file

## run
```bash
npm start
``` 