export default () => ({
  env: process.env.NODE_ENV ?? 'local',
  port: process.env.PORT || 4000,
  id24Url: process.env.ID24_URL,
  id24TokenPublicKey: process.env.ID24_TOKEN_PUBLIC_KEY,
  // pathMountDirUpload: process.env.PATH_MOUNTDIR_UPLOAD,
  pathMountDirUpload: process.env.PATH_MOUNTDIR_IMAGES_UPLOAD,
});
