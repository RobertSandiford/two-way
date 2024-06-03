
module.exports = {
    "ignorePatterns": ["dist", "*.cjs", "*.js"],
    "extends": [
        "sandi-ts",
    ],
    "rules": {
        "max-len" : ["warn", 132, { 
            "ignoreComments": true, 
        } ],
    }
}
