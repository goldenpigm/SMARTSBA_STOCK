// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  app: {
    head: {
      title: "Customer Stock Deposit",
      meta: [
        { charset: "UTF-8" },
        // { http-equiv:"Cache-Control", content:"no-store" },
        // { http-equiv:"Pragma", content:"no-cache" },
        // { http-equiv:"Expires", content:"-1" },
        // { http-equiv:"X-UA-Compatible", content:"IE=edge,chrome=1" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "fsprogid", content: "$PROGRAM_ID$" },
        { name: "fsprogname", content: "Customer Stock Deposit" },
        { name: "fsprogversion", content: "$TAGVERSION$" },
      ],
      script: [
        { src: "https://code.jquery.com/jquery-1.12.3.min.js" },
        { src: "https://kendo.cdn.telerik.com/2022.3.913/js/jszip.min.js" },
        { src: "https://kendo.cdn.telerik.com/2022.3.913/js/kendo.all.min.js" },
      ],
      //   style: [{ '@/assets/css/main.css' }],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.2.0/mdb.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://kendo.cdn.telerik.com/themes/6.2.0/default/default-ocean-blue.css",
        },
        {
          rel: "stylesheet",
          href: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
          integrity:
            "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  // typescript: {
  //   strict: true,
  // },
  css: [
    "@progress/kendo-theme-default/dist/all.css",
    "@/assets/css/item-std.css",
    "@/assets/css/custom-style.css",
    "@/assets/css/program_style.css",
    "@/assets/css/sba.style.css",
    "@/assets/sbse001.css",
  ],
  build: {
    transpile: ["mdb-vue-ui-kit"],
  },
  runtimeConfig: {
    public: {
      BASE_URL_UTIL:
        process.env.BASE_URL_UTIL ||
        "https://dsmartsbaws.freewillsolutions.com/api/util/smartfresh",
      BASE_URL_STOCK:
        process.env.BASE_URL_STOCK ||
        "https://dsmartsbaws.freewillsolutions.com/api/stock/smartfresh",
      BASE_URL_CASH:
        process.env.BASE_URL_CASH ||
        "https://dsmartsbaws.freewillsolutions.com/api/cash/smartfresh",
      BASE_URL_CA:
        process.env.BASE_URL_CA ||
        "https://dsmartsbaws.freewillsolutions.com/api/ca/smartfresh",
      FS_LANG: process.env.FS_LANG || "TH",
    },
  },
};
