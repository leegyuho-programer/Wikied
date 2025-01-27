module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false, // viewBox 제거 비활성화
        },
      },
    },
    {
      name: 'removeAttrs', // 특정 속성 제거
      params: { attrs: '(fill|stroke)' },
    },
  ],
};
