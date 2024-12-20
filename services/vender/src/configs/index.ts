export default () => ({
  env: process.env.NODE_ENV ?? 'local',
  port: process.env.PORT || 4001,
  id24Url: process.env.ID24_URL || 'http://localhost:4001',
  id24TokenPublicKey: process.env.ID24_TOKEN_PUBLIC_KEY,
});
