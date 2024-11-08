// استدعاء اداة تحزيم ملفات html
// التي حملناها و وضعناها في متغير لكي نستخدمها بالاسفل
const { publicDecrypt } = require("crypto");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// الغاية من هذا هو لرؤية ملف sass
// الذي سيتم تحزيمه داخل مجلد build
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// لجلب المسار الحالي الذي نحن فيه والذي هو
// D:\Hasoub-Academy-Projects\company
const path = require("path");

module.exports = {
  stats: "errors-only",
  // كتبنا من اي ملف يبدا التحزيم
  entry: "./src/js/index.js",
  // المخرج الذي سيتم عمله عند تشغل npm run dev
  output: {
    publicPath: "",
    // اسم مجلد التحزيم
    path: path.resolve(__dirname, "build"),
    // اسم الملف
    filename: "js/bundle.js",
    // ملاحظة: لو لم نكتب entry and output
    // راح يكون الافتراضي لاسم المجلد هو dist
    // واسم الملف هو main.js
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  // لتحزيم ملفات sass and css
  module: {
    rules: [
      {
        test: /\.(sass|css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,

        use: [
          {
            loader: "file-loader",

            options: {
              name: "[name].[ext]",

              outputPath: "images",
            },
          },
        ],
      },
      {
        test: /\.(svg|eot|wff|wff2|ttf)$/,

        use: [
          {
            loader: "file-loader",

            options: {
              name: "[name].[ext]",

              outputPath: "fonts",
            },
          },
        ],
      },
      {
        test: /\.html$/i,

        loader: "html-loader",
      },

      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, " build"),
    },

    // compress: true,

    port: 9000,

    // open: true,
    hot: false,
    liveReload: true,

    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [
    // لتحزيم ملف html
    // لازم كل صفحة نسويلها كذا
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),

    new HtmlWebpackPlugin({
      template: "./src/projects.html",
      filename: "projects.html",
    }),

    new HtmlWebpackPlugin({
      template: "./src/project-details.html",
      filename: "project-details.html",
    }),

    new HtmlWebpackPlugin({
      template: "./src/blog.html",
      filename: "blog.html",
    }),

    new HtmlWebpackPlugin({
      template: "./src/blog-details.html",
      filename: "blog-details.html",
    }),

    new HtmlWebpackPlugin({
      template: "./src/add-blog.html",
      filename: "add-blog.html",
    }),

    new HtmlWebpackPlugin({
      template: "./src/about.html",
      filename: "about.html",
    }),

    new HtmlWebpackPlugin({
      template: "./src/contact.html",
      filename: "contact.html",
    }),

    // استدعينا الاضافة اللي عرفناها فوق
    new MiniCssExtractPlugin({
      // هنا قم بتحديد مسار الملف المطلوب
      filename: "css/main.css", // سيتم حفظ main.css داخل مجلد css
    }),
  ],
};
