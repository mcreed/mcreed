module.exports = function(grunt) {

    // For rev cache busting
    var globalConfig = {
        rev: ((new Date()).valueOf().toString()) + (Math.floor((Math.random()*1000000)+1).toString())
    };

    grunt.initConfig({
        globalConfig: globalConfig,
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            build: {
                src: [
                    'app/assets/scripts/vendor/*.js',
                    'app/assets/scripts/app.js'
                ],
                dest: 'dist/assets/scripts/app.js',
            }
        },

        uglify: {
            build: {
                src: 'dist/assets/scripts/app.js',
                dest: 'dist/assets/scripts/app.min.<%= globalConfig.rev %>.js'
            }
        },

        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'app/assets/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/assets/images/'
                }]
            }
        },

        compass: {
            build: {
                options: {
                    sassDir: 'app/assets/styles',
                    cssDir: 'dist/assets/styles',
                    environment: 'production',
                    outputStyle: 'compressed'
                }
            }
        },

        rename: {
            main: {
                files: [
                    {src: ['dist/assets/styles/app.css'], dest: 'dist/assets/styles/app.min.<%= globalConfig.rev %>.css'},
                ]
            }
        },


        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: false
                },
            },
            //beforeconcat: ['app/assets/app.js'],
            //afterconcat: ['dist/assets/app.min.js']
        },

        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'app/index.html'
                }
            }
        },

        clean: {
          build: {
            src: [ 'dist' ]
          },
        },

        copy: {
          main: {
            files: [{
                expand: true,
                cwd: 'app/assets/audio/',
                src: ['**/*.{mp3,wav,aiff}'],
                dest:'dist/assets/audio'
            }]
          }
        },

        replace: {
            build: {
                src: ['dist/*.html', 'dist/**/*.css','dist/**/*.js'],
                overwrite: true,
                replacements: [{
                    from: '/assets/',
                    to: '//cdn.mcreed.com/mcreed/'
                },{
                    from: 'app.min.js',
                    to: 'app.min.<%= globalConfig.rev %>.js'
                },{
                    from: 'app.css',
                    to: 'app.min.<%= globalConfig.rev %>.css'
                }]
            }
        },

        watch: {
            options:{
                livereload: true,
            },
            css: {
                files: ['app/assets/styles/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false,
                }
            },
            scripts: {
                files: ['app/assets/scripts/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            }
        },

        'sftp-deploy': {
            cdn: {
                auth: {
                    host: 'ftp2.ftptoyoursite.com',
                    port: 22,
                    authKey: 'cdn'
                },
                src: './dist/assets',
                dest: 'cdn.mcreed.com/web/content/mcreed/',
                exclusions: [
                    '.dist/**/.DS_Store'
                ],
                server_sep: '/'
            },
            production: {
                auth: {
                    host: 'ftp2.ftptoyoursite.com',
                    port: 22,
                    authKey: 'production'
                },
                src: './dist/',
                dest: 'www.mcreed.com/web/content/',
                exclusions: [
                    './dist/**/.DS_Store',
                    './dist/assets'
                ],
                server_sep: '/'
            }
        },


    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-sftp-deploy');
    grunt.loadNpmTasks('grunt-contrib-rename');

    grunt.registerTask('default', ['clean', 'concat', 'compass', 'jshint', 'uglify', 'imagemin', 'htmlmin', 'copy', 'rename', 'replace', 'watch']);
    grunt.registerTask('deploy:assets', ['sftp-deploy:cdn']);
    grunt.registerTask('deploy', ['sftp-deploy:production']);


};