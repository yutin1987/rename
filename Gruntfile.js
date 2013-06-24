module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          "./index.html": ["./dev/*.jade"]
        }
      }
    },
    coffee:{
      options:{
        bare: true
      },
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: './dev/coffee/',
        src: ['*.coffee'],
        dest: './dev/script/',
        ext: '.js'
      }
    },
    compass: {
      dist: {
        options: {
          config: './config.rb'
        }
      }
    },
    uglify: {
      my_target: {
        options:{
          beautify: false,
          report: false,
          mangle: {
            except: ['$scope','$cookieStore']
          }
        },
        files: {
          './script/page.js': ['./dev/script/helper*.js','./dev/script/page.js'],
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          './style/page.css': ['./dev/style/reset.css','./dev/style/bootstrap.css','./dev/style/page.css']
        }
      }
    },
    watch: {
      files: ['**/*.jade','**/*.coffee','**/*.sass'],
      tasks: ['jade','coffee','uglify','compass','cssmin']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jade','coffee','uglify','compass','cssmin','watch']);

};
