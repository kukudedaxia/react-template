module.exports = {
    //繼承一些規則
    extends: [
        //airbnb編碼規範
        'airbnb-base',
        'airbnb/rules/react',
        // 从插件中获取的规则，书写规则为 「plugin:插件包名/配置名」
        'plugin:@typescript-eslint/recommended', //并非所有的eslint核心规则都与TypeScript兼容所以将从适当的TypeScript调整eslint
        'plugin:prettier/recommended', //plugin和config集成推荐写法
        'plugin:import/typescript',

        //为了支持特殊的ESLint插件（例如eslint-plugin-react），为你使用的插件添加额外的排除项，如下所示：
        'prettier/react',
        'prettier/@typescript-eslint', //  Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    ],
    // 指定解析器选项
    // parserOptions: {
    //   parser: 'babel-eslint',
    // },
    // 指定脚本的运行环境
    env: {
        browser: true,
    },
    // 别人可以直接使用你配置好的ESLint
    // root: true,
    // 脚本在执行期间访问的额外的全局变量
    // globals: {},
    // //ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。
    plugins: ['react-hooks'],
    // // 启用的规则及其各自的错误级别 每个规则对应的0，1，2分别表示off, warning, error三个错误级别(扩充阶段)
    rules: {
        // 禁止对函数形参操作
        'no-param-reassign': [
            'error',
            {
                props: false,
            },
        ],
        //此规则强制使用解构而不是通过成员表达式访问属性。
        'prefer-destructuring': 0,
        //模板字符串使用引号"或'引号。
        'no-template-curly-in-string': 1,
        //强制要求import和export声明只能出现在模块主体的顶层
        'global-require': 0,
        'react/no-array-index-key': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
        // 'prettier/prettier': 'error',
        'react/sort-comp': 0,
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }],
        'react/destructuring-assignment': 0,
        'react/prop-types': 0,
        'react/jsx-props-no-spreading': 0,
        'import/prefer-default-export': 0,
        // '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        'no-nested-ternary': 0,
        'react-hooks/rules-of-hooks': 'error', // 执行hooks的两个规则
        'react/no-array-index-key': 0,
        'import/no-cycle': 0, //两个util文件中 依赖循环了
        // 自定义引入组件不需要加后缀
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ],
    },
    //针对特定文件的配置
    overrides: [{
            files: ['*'],
            excludedFiles: ['src/**/*'],
            rules: {
                'import/no-extraneous-dependencies': 0,
                '@typescript-eslint/no-var-requires': 0,
                'react/no-array-index-key': 0,
            },
        },
        {
            files: ['serviceWorker.js'],
            rules: {
                'no-console': 0,
            },
        },
    ],
};