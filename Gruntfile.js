module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        settings: {
            app: 'assets',
            dist: 'wwwroot',
            templates: 'templates',
            temp: '.tmp'
        },
        banner: '/*!\n' +
        '* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '*/\n',
        assemble: {
            options: {
                assets: 'assets',
                layoutdir: '<%= settings.templates %>/layouts',
                partials: ['<%= settings.templates %>/partials/*.hbs' ],
            },
            site: {
                options: {
                    layout: 'index.hbs',
                    flatten: 'true'
                },
                src: ['<%= settings.templates %>/*.hbs'],
                dest: ''
            }
            //options: {
            //assets: 'wwwroot',
            //flatten: false,
            //expand: true,
            //layoutdir: '<%= settings.templates %>',
            //layout: 'index.hbs'
            //},
            //dev: {
            //options: {
            //dev: true,
            //prod: false
            //},
            //src: ['<%= settings.templates %>/**/*.hbs'],
            //dest: ''
            //}
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '<%= settings.dist %>',
                    target: 'http://localhost:8000', // target url to open
                    appName: 'open', // name of the app that opens, ie: open, start, xdg-open
                    callback: function() {}, // called when the app has opened
                    useAvailablePort: true
                }
            }
        },
        less: {
            dev: {
                src: [
                    '<%= settings.app %>/less/lg-carousel.less',
                ],
                dest: '<%= settings.temp %>/css/lg-carousel.css',
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '<%= banner %>'
            },
            main: {
                src: [
                    '<%= settings.app %>/js/lg-carousel.js',
                ],
                dest: 'js/lg-carousel.js',
            },
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            main: {
                src: ['<%= concat.main.dest %>'],
                dest: 'js/lg-carousel.min.js'
            },
        },
        jshint: {
            gruntfile: ['Gruntfile.js'],
            beforeconcat: ['assets/js/*.js'],
            afterconcat: ['js/*.js']
        },
        copy: {
            dist: {
                expand: true,
                dot: true,
                flatten: false,
                cwd: '<%= settings.app %>',
                dest: '<%= settings.dist %>',
                src: [
                    '*.{ico,png,txt}',
                    '.htaccess',
                    'images/email/{,*/}*.{jpg,svg}'
                    //'fonts/{,*/}*.*'
                ]
            },
            fonts: {
                expand: true,
                flatten: true,
                cwd: '<%= settings.app %>',
                dest: 'fonts/',
                src: [
                    'bower_components/bootstrap/fonts/{,*/}*.*',
                    'fonts/{,*/}*.*'
                ]
            },
            dev: {
                expand: true,
                flatten: false,
                cwd: '<%= settings.app %>',
                dest: '',
                src: [
                    '/images/email/*.{jpg,svg}'
                ]
            },
            svg: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= settings.app %>/images/email/',
                    src: '*.svg',
                    dest: 'images/email/'
                }]
            },
            js: {
                expand: true,
                flatten: true,
                cwd: '<%= settings.app %>',
                dest: 'js/',
                src: [
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/jquery/dist/jquery.min.js'
                ]
            },
        },
        clean: {
            build: {
                src: [
                    "css/",
                    "js/",
                    "fonts/"
                ]
            }
        },
        autoprefixer: {
            // prefix the specified file
            single_file: {
                src: '<%= settings.temp %>/css/lg-carousel.css',
                dest: 'css/lg-carousel.css'
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: 'css/',
                ext: '.min.css'
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= settings.app %>/images/',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: 'images/'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= settings.app %>/images',
                    src: '{,*/}*.svg',
                    dest: 'images/'
                }]
            }
        },
        concurrent: {
            dist: [
                'assemble',
                'copy:dist'
            ]
        },
        watch: {
            //assemble: {
            //    files: ['templates/**/*.hbs'],
            //    tasks: ['assemble']
            //},
            less : {
                files : 'assets/less/**',
                tasks : [ 'less:dev' ]
            },
            autoprefixer : {
                files : '<%= settings.temp %>/css/*.css',
                tasks : [ 'autoprefixer:single_file' ]
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile']
            },
            test: {
                files: '<%= concat.main.src %>',
                tasks: ['jshint:beforeconcat']
            },
            concat: {
                files: '<%= concat.main.src %>',
                tasks: ['concat']
            },
            //min: {
            //    files: '<%= concat.main.dest %>',
            //    tasks: ['jshint:afterconcat']
            //},
            //imagemin: {
            //files: '<%= settings.assets %>/images',
            //tasks: ['imagemin:dev']
            //},
            //copy:{
            //    files: '<%= concat.main.src %>/email',
            //    tasks: ['copy:dev']
            //},
            //svgmin: {
            //    files: '<%= settings.assets %>/images',
            //    tasks: ['svgmin']
            //}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('css', [
        'less:dev',
        'autoprefixer:single_file',
        'cssmin'
    ]);

    grunt.registerTask('images', [
        //'imagemin',
        'copy:svg'
    ]);

    grunt.registerTask('js', [
        'concat',
        'uglify'
    ]);

    grunt.registerTask('testTarget', [
        //'clean',
        'copy:dist',
    ]);

    grunt.registerTask('default', [
        'clean',
        'css',
        'js',
        //'copy:js',
        //'copy:fonts',
        //'assemble',
        //'imagemin:dev',
        //'svgmin'
    ]);

};