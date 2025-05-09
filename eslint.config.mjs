import { config } from "@remotion/eslint-config-flat";

const eslintConfig = [
  ...config,
  {
    rules: {
      "no-undef": "off",
    },
  },
];
export default eslintConfig;
