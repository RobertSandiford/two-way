
module.exports = {
    "ignorePatterns": ["dist", "*.cjs", "*.js"],
    "extends": [
        "sandi-ts",
    ],
    "rules": {
        /* for heathens
        "indent": ["warn", 2],
        "semi": ["warn", "always"],
        */
        "max-len" : ["warn", 128, { 
            "ignoreComments": true, 
        } ], // maximum 120 chars per line
    }
}
