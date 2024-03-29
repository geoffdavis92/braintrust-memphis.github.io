module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			dev: {
				options: { livereload: 20015 },
				files: ['*.html','css/*.css','js/*.js']
			},
			jade: {
				files: ['./src/jade/**/*.jade'],
				tasks: ['jade:dev']
			},
			sass: {
				files: ['./src/sass/**/*.sass'],
				tasks: ['sass:dev']
			},
			babel: {
				files: ['./src/js/*.js'],
				tasks: ['babel:dev']
			}
		},
		jade: {
			dev: {
			    files: [{
			    	expand: true,
			    	cwd: './src/jade/',
			    	src: ['**/*.jade'],
			    	dest: './',
			    	ext: '.html'
			    }]
			},
			build: {
				options: {
					data: function (d,s) {
						return require('./src/jade/locals.prod.json')
					}
				},
				files: [{
					expand: true,
					cwd: './src/jade/',
					src: ['**/*.jade','!_templates/**/*.jade'],
					dest: './prod/',
					ext: '.html'
				}]
			}
		},
		sass: {
			dev: {
				options: { 
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: './src/sass',
					src: '**/*.sass',
					dest: 'css',
					ext: '.css'
				}]
			},
			build: {
				options: { 
					style: 'compressed',
					sourceMap: false
				},
				files: [{
					expand: true,
					cwd: './src/sass',
					src: '*.sass',
					dest: 'prod/css',
					ext: '.min.css'
				}]
			}
		},
		babel: {
			dev: {
				options: {
					sourceMap: 'linked',
					plugins: [
						'transform-strict-mode'
					],
					presets: ['es2015']
				},
				files: [{
					expand: true,
					cwd: './src/js/',
					src: '*.js',
					dest: './js/',
					ext: '.js'
				}]
			},
			build: {
				options: {
					sourceMap: false,
					plugins: [
						'transform-strict-mode',
						'transform-remove-console'
					],
					presets: ['es2015']
				},
				files: [{
					expand: true,
					cwd: './src/js',
					src: '*.js',
					dest: '.tmp/js',
					ext: '.js'
				}]
			}
		},
		uglify: {
			build: {
				options: {
					compress: true,
					mangle: false,
					mangleProperties: false,
					preserveComments: false
				},
				files: [{
					expand: true,
					cwd: './.tmp/js',
					src: '*.js',
					dest: './prod/js',
					ext: '.min.js'
				}]
			}
		},
		copy: {
			lib: {
				files: {
					"js/jquery.min.js" : "node_modules/jquery/dist/jquery.min.js",
					"js/bootstrap.min.js" : "node_modules/bootstrap/dist/js/bootstrap.min.js"
				}
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-jade')
	grunt.loadNpmTasks('grunt-contrib-sass')
	grunt.loadNpmTasks('grunt-babel')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-copy')

	grunt.registerTask('default',['copy'])
	grunt.registerTask('dev',['copy','watch'])
	grunt.registerTask('build',['jade:build','sass:build','babel:build','uglify:build'])
}