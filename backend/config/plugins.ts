export default ({ env }) => ({
  "upload-plugin-cache": {
    enabled: true,
    config: {
      maxAge: 3600 * 24 * 7,
    },
  },
  upload: {
    config: {
      provider: 'strapi-provider-upload-aws-s3-advanced',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),
        region: 'ap-southeast-2',
        baseUrl: env('CDN_BASE_URL'),
        params: {
          Bucket: env('AWS_BUCKET'),
          acl: 'public-read',
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
