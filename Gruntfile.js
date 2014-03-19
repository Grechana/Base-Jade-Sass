module.exports = function(grunt) {
 
    // configure the tasks
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
 
        // copy from the source directory to build
        copy: {
            build: {
                cwd: 'source',
                src: [ '**', '!**/*.jade', '!sass', '!sass/*', '!**/*.scss' ],
                dest: 'build',
                expand: true
            },
        },

        // clean the build directory
        clean: {
            build: {
                src: [ 'build' ]
            },
        },

        watch: {
            sass: {
                files: [ 'source/sass/*.scss', 'source/sass/*/*.scss' ],
                tasks: [ 'sass' ]
            },
            jade: {
                files: 'source/**/*.jade',
                tasks: [ 'jade' ]
            },
            copy: {
              files: [ 'source/**', '!source/**/*.scss', '!source/**/*.jade' ],
              tasks: [ 'copy' ]
            }
        },

        jade: {
            compile: {
                options: {
                    data: {}
                },
                files: [{
                    expand: true,
                    cwd: 'source',
                    src: [ '**/*.jade' ],
                    dest: 'build',
                    ext: '.html'
                }]
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'source/sass',
                    src: [ '*.scss' ],
                    dest: 'build/style',
                    ext: '.css'
                }]
            }
        },

        connect: {
            server: {
                options: {
                    port: 4000,
                    base: 'build',
                    hostname: '*'
                }
            }
        }
 
    });
 
    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
 
    // define the tasks

    grunt.registerTask(
        'build', 
        [ 'clean', 'copy', 'jade', 'sass' ]
    );

    grunt.registerTask(
        'default',
        ['build', 'connect', 'watch']
        //['watch']
    );
};