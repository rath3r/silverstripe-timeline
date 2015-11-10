module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        settings: {
            app: 'assets',
            dist: '',
            templates: 'templates',
            temp: '.tmp'
        },
        banner: '/*!\n' +
        '* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '*/\n',
        less: {
            dev: {
                src: [
                    '<%= settings.app %>/less/timeline.less',
                ],
                dest: '<%= settings.temp %>/css/timeline.css',
            }
        },
        clean: {
            build: {
                src: [
                    "css/*",
                    "js/*"
                ]
            }
        },
        autoprefixer: {
            // prefix the specified file
            dist: {
                src: '<%= settings.temp %>/css/timeline.css',
                dest: '<%= settings.dist %>css/timeline.css'
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
        jshint: {
            all: ['<%= settings.app %>/js/*.js']
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            timelinr: {
                src: [
                    '<%= settings.app %>/js/jquery.timelinr-0.9.54.js'
                ],
                dest: '<%= settings.dist %>js/timelinr.js'
            },
        },
        watch: {
            less : {
                files : 'assets/less/**',
                tasks : [ 'less:dev' ]
            },
            autoprefixer : {
                files : '<%= settings.temp %>/css/*.css',
                tasks : [ 'autoprefixer' ]
            },
            jshint : {
                files : '<%= settings.app %>/js/*.js',
                tasks : [ 'jshint' ]
            },
            uglify : {
                files : '<%= settings.app %>/js/*.js',
                tasks : [ 'uglify' ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('css', [
        'less',
        'autoprefixer',
        'cssmin'
    ]);

    grunt.registerTask('js', [
        'jshint',
        'uglify'
    ]);

    grunt.registerTask('default', [
        'clean',
        'css',
        'js'
    ]);

};