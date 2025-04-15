/* eslint-disable no-undef */
export default function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          runtime: "automatic",
        },
      ],
    ],
  };
}
