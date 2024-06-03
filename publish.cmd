@echo off
(
    npm version %* --no-git-tag-version
)
pnpm --dir shared publish
pnpm --dir server publish
pnpm --dir client publish
