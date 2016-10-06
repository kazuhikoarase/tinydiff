module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    src: 'src',
    build: 'build',
    dist: 'dist',
    ts: {
      main: {
        options : { sourceMap: false },
        src: ['<%= src %>/main/ts/**/*.ts'],
        outDir: '<%= build %>/ts'
      }
    },
    concat: {
      main: {
        src: ['<%= build %>/ts/<%= pkg.name %>/**/*.js'],
        dest: '<%= dist %>/<%= pkg.name %>.js'
      },
      sample: {
        src: ['<%= build %>/ts/sample/**/*.js'],
        dest: '<%= dist %>/sample.js'
      }
    },
    uglify: {
      options: { ASCIIOnly : true },
      build: {
        src: '<%= dist %>/<%= pkg.name %>.js',
        dest: '<%= dist %>/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      build: {
        options: {
          spawn: false
        },
        files: ['<%= src %>/main/ts/**/*.ts'],
        tasks: ['ts', 'concat'],
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      build: ['<%= build %>/**/*.js']
    },
    nodeunit: {
      all: ['<%= src %>/test/**/*_test.js'],
      options: {
        reporter: 'default',
        reporterOptions: {
          output: 'dist'
        }
      }
    },
    clean: {
      build : { src: ['<%= build %>', '.tscache'] },
      dist : { src: ['<%= dist %>'] }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask('default', ['ts', 'concat', 'uglify']);

};
