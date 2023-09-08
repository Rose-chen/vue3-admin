module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  /** 指定如何解析语法 */
  parser: 'vue-eslint-parser',
  /** 优先级低于 parse的语法解析配置 */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    //开启推荐规则
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],

  plugins: ['@typescript-eslint', 'vue'],
  /**
   * "off" | 0    ==> 关闭规则
   * "warn" | 1   ==> 打开的规则作为警告（不影响代码执行）
   * "error" | 2  ==> 规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    'no-var': 2, //禁用var，用let和const代替
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0, //禁止使用console
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, //禁止使用debugger

    'vue/multi-word-component-names': 'off',
  },
}
