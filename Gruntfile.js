module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      options: {
          watch: true,
          keepAlive: true,
          transform:  [["babelify", {presets: ["react"]}]]
      },
      "src/bundle.js": ["app/components/*.js", "app/pages/*.js"],
    },
    uglify: {
      "src/bundle.min.js": ["src/bundle.js"],
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-browserify");
};
