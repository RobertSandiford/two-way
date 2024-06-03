export default {

    // base folder for tests match and ignore patterns
    testsBase: '.',

    // glob pattern or array of glob patterns of test files
    tests: [
        '**/*.sxyt.{js,mjs,jsx}',
        '**/*.test.{js,mjs,jsx}',
        '**/*.spec.{js,mjs,jsx}',
        '**/tests?/*.{js,mjs,jsx}',
        '**/__tests?__/*.{js,mjs,jsx}'
    ],

    // glob pattern or array of patterns of test files to ignore
    testsIgnore: ['**/node_modules/**/*'],

    // whether to show the full error trace when an error occurs in a test file
    showErrorTrace: false,

    // tasks to run on startup
    // accepts a function, file location (relative to project base), or array of functions and or files
    setup: undefined,

    // tasks to run before each test file is run
    beforeEachFile: undefined,

    // tasks to run after each test file is run
    afterEachFile:  undefined,

    // tasks to run before each describe block is processed
    // if the function returns an object with named properties, or the file exports named exports,
    // these will be passed to the callback function in argument 0, and can be access by destructruing e.g.
    // describe('thing', ({exportA, exportB}) => { it('should', ...) })
    beforeEachDescribe: undefined,

    // tasks to run after each describe block
    afterEachDescribe: undefined,

    // tasks to run before each it/test block
    // function returns and file exports will be passed to the it/test block as with describe above, e.g.
    // it('should', ({exportA, exportB}) => { assert('something') }) 
    beforeEachTest: undefined,

    // tasks to run after each it/test block
    afterEachTest: undefined,

    // how to execute the different parts of test files
    execution: {

        // run test files in 'parallel' or 'sequential'ly
        files: 'sequential',

        // run describe blocks within a test file in 'parallel' or 'sequential'ly
        describes: 'sequential',

        // run it/test blocks within a describe blocks in 'parallel' or 'sequential'ly
        tests: 'sequential'

    },

    // watch mode configurations
    watch: {

        //// the base directory to watch files in
        watchFilesBase: '.',

        //// glob filter or array of glob filters of files to watch
        watchFiles: '**/*.js',

        //// glob filter or array of globl filters of files to ignore
        watchFilesIgnore: '**/node_modules/**/*',

        // run all tests when starting the watcher
        runAllOnStartup: true,
    
        // re run all previously failed tests on each test run, until they pass
        reRunFailingTests: true,

    },

}