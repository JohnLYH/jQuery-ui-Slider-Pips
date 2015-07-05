/*global module:false*/
module.exports = function(grunt) {

    require("time-grunt")(grunt);

    var path = require("path");

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON("package.json"),

        banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " + 
                "<%= grunt.template.today(\"yyyy-mm-dd\") %>\n" + 
                "<%= pkg.homepage ? \"* \" + pkg.homepage + \"\\n\" : \"\" %>" + 
                "* Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author %>;" + 
                " Licensed <%= pkg.license %> */\n",

        // Task configuration.

        clean: [ "dist", ".tmp" ],

        bake: {
            options: {
                basePath: "src/app/views"
            },
            build: {
                files: {
                    "index.html": "src/index.html"
                }
            }
        },

        concat: {
            options: {
                banner: "<%= banner %>",
                stripBanners: true
            }
        },


        jshint: {
            jshintrc: ".jshintrc",
            gruntfile: {
                src: "Gruntfile.js"
            },
            srcfiles: {
                src: ["src/**/*.js"]
            }
        },


        copy: {
            options: {
                banner: "<%= banner %>"
            },
            fonts: {
                cwd: "src/app/fonts/",
                src: "**",
                dest: "dist/fonts/",
                expand: true
            },
            js: {
                cwd: "src/app/js/",
                src: "**",
                dest: "dist/js/",
                expand: true
            },
            pips: {
                cwd: "bower_components/jquery-ui-slider-pips/dist/",
                src: "jquery-ui-slider-pips.js",
                dest: "dist/js/",
                expand: true
            },
            sound: {
                cwd: "src/app/sound/",
                src: "**",
                dest: "dist/sound/",
                expand: true
            },
            img: {
                cwd: "src/app/img/",
                src: "**",
                dest: "dist/img/",
                expand: true
            },
            emoji: {
                cwd: "bower_components/twemoji",
                src: "**/36x36/*.png",
                dest: "dist/img/twemoji/",
                expand: true
            }
        },

        sass: {
            all: {
                options: {
                    style: "nested",
                    lineNumbers: true
                },
                files: {
                    ".tmp/css/app.css": "src/app/sass/app.scss"
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ["last 2 versions", "ie 9", "ie 10"]
            },
            all: {
                src: ".tmp/css/app.css",
                dest: ".tmp/css/app.css"
            }
        },

        uglify: {

            options: {
                mangle: {
                    except: ["jQuery", "$"]
                }
            },

            modernizr: {
                files: {
                    "dist/js/modernizr.min.js": [

                        "bower_components/modernizr/modernizr.js"

                    ]
                }
            },

            jQuery: {
                files: {
                    "dist/js/jquery-plus-ui.min.js": [

                        "bower_components/jquery/dist/jquery.js",
                        "bower_components/jquery-ui/ui/core.js",
                        "bower_components/jquery-ui/ui/widget.js",
                        "bower_components/jquery-ui/ui/mouse.js",
                        "bower_components/jquery-ui/ui/slider.js"

                    ]
                }
            },

            bower: {
                files: {
                    "dist/js/bower-libs.min.js": [

                        "bower_components/fastclick/lib/fastclick.js",
                        "bower_components/jquery.cookie/jquery.cookie.js",
                        "bower_components/jquery-placeholder/jquery.placeholder.js",
                        "bower_components/foundation/js/foundation.js",

                        "bower_components/google-code-prettify/src/prettify.js",
                        "bower_components/google-code-prettify/src/lang-css.js",
                        
                        "bower_components/twemoji/twemoji.js"

                    ]
                }
            },

            helpers: {
                files: {
                    "dist/js/helpers.js": [

                        "src/app/js/prettyPre.js",
                        "src/app/js/twemojiWrapper.js"

                    ]
                }
            }

        },

        cssmin: {

            jqueryui: {
                files: {
                    "dist/css/jqueryui.min.css": [
                        "bower_components/jquery-ui/themes/flick/jquery-ui.css",
                        "bower_components/jquery-ui/themes/flick/theme.css"
                    ]
                }
            },

            pips: {
                files: {
                    "dist/css/jquery-ui-slider-pips.min.css": [
                        "bower_components/jquery-ui-slider-pips/dist/jquery-ui-slider-pips.css"
                    ]
                }
            },

            app: {
                files: {
                    "dist/css/app.min.css": [
                        ".tmp/css/app.css"
                    ]
                }
            }

        },

        watch: {

            options: {
                reload: true
            },

            config: {
                files: ["Gruntfile.js"]
            },
            render: {
                files: ["src/**/*.html"],
                tasks: ["bake"]
            },
            sass: {
                files: ["src/**/*.scss"],
                tasks: ["sass", "autoprefixer", "cssmin"]
            },
            js: {
                files: ["src/**/*.js"],
                tasks: ["copy:js", "uglify"]
            },
            img: {
                files: ["src/img/**/*"],
                tasks: ["copy:img"]
            },
            livereload: {

              // Here we watch the files the sass task will compile to
              // These files are sent to the live reload server after sass compiles to them
              options: { livereload: true },
              files: ["dist/css/**/*", "dist/js/**/*"]

            },
        }


    });

    // These plugins provide necessary tasks.

    grunt.loadNpmTasks("grunt-bake");
    grunt.loadNpmTasks("grunt-autoprefixer");

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    // Tasks.

    grunt.registerTask("default", [
        "clean",
        "jshint", 
        "sass", 
        "autoprefixer", 
        "cssmin",
        "uglify",
        "bake",
        "copy"
    ]);

};
