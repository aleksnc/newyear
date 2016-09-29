module.exports = function(grunt){
  grunt.initConfig({
    sprite:{
      all: {
        src: 'source/img/icon/*.png',
        dest: 'source/img/spritesheet.png',
        destCss: 'source/css/sprite.less'
      }
    },
    image: {
      static: {
        options: {
          pngquant: true,
          optipng: false,
          zopflipng: true,
          advpng: true,
          jpegRecompress: false,
          jpegoptim: true,
          mozjpeg: true,
          gifsicle: true,
          svgo: true
        }
      },
      dynamic: {
        files: [{
          expand: true,
          cwd: 'source/img/',
          src: '**/*.{png,jpg,gif,svg}',
          //src: '*.{png,jpg,gif,svg}',
          dest: 'dest/img/'
        }]
      }
    },
    pug: {
      compile: {
        files: [{
          cwd: 'source',
          src: ['*.pug'],
          dest: 'dest',
          expand: true,
          ext: '.html',
        }]
      },
      options: {
        pretty: true,
      }
    },
    less: {
      development: {
        options: {
          paths: ['source/']
        },
        files: {
          'dest/css/style.css': 'source/css/style.less'
        }
      }
    },
    merge_media: {
      options: {
        compress: true,
        logFile: true
      },
      files:{
        src: 'dest/css/*.css',
        dest: 'dest/css/'
      }
    },
    autoprefixer:{
      options: {
        browsers: ['> 1%', 'last 5 versions', 'Firefox ESR', 'Opera 12.1'],
        cascade: false
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'dest/css/*.css',
        dest: 'dest/css/'
      }
    },
    copy: {
      css: {
        files: [{
          cwd: 'source/css',
          src: '**/*.css',
          dest: 'dest/css',
          expand: true,
        }]
      },
      js: {
        files: [{
          cwd: 'source/js',
          src: '**/*.js',
          dest: 'dest/js',
          expand: true,
        }]
      },
    },
    watch: {
      js: {
        files: ['source/js/**/*.js'],
        tasks: ['copy:js'],
      },
      css: {
        files: ['source/css/**/*.css'],
        tasks: ['copy:css','cmq'],
      },
      pug: {
        files: ['source/**/*.pug'],
        tasks: ['pug'],
      },
      less: {
        files: ['source/**/*.less'],
        tasks: ['less','autoprefixer'],
        options: {
          spawn: false
        }
      },
      imagemin: {
        files: ['source/img/**/*.{png,jpg,gif}'],
        dest: 'dest/img/',
        tasks: ['image'],
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'dest/css/*.css',
            'dest/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: 'dest'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-merge-media');
  grunt.loadNpmTasks('grunt-image');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.registerTask('default', [
    'image',
    'sprite',
    'copy',
    'pug',
    'less',
    'autoprefixer',
    'merge_media',
    'browserSync',
    'watch'
  ]);
};
