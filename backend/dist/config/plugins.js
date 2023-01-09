module.exports = {
    "upload-plugin-cache": {
        enabled: true,
        config: {
            maxAge: 3600 * 24 * 30, // 30 day cache for media files (when the file path is the same)
        },
    }
};
