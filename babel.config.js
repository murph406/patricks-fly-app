module.exports = function (api) {
    api.cache(true)

    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./src'],
                    alias: {
                        '@components': './src/components',
                        '@pages': './src/pages',
                        '@features': './src/features',
                        '@utils': './src/utils',
                        '@hooks': './src/hooks',
                        '@services': './src/services',
                        '@stores': './src/stores',
                        '@router': './src/router',
                        '@assets': './src/assets',
                        '@constants': './src/constants',
                        '@config': './src/config',
                        '@api': './src/api',
                        '@': './src',
                    },
                },
            ],
        ],
    }
}