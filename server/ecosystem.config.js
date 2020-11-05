module.exports = {
  apps: [
    {
      name: 'nodepop',
      script: './server/bin/www.js',
      watch: './server/bin/www.js',
      instances: 1,
      log_file: './server/logs/nodepop.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'makethumbservice',
      script: './server/services/makeThumbService.js',
      instances: 1,
      watch: './server/services/makeThumbService.js',
      log_file: './server/logs/makeThumbService.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
