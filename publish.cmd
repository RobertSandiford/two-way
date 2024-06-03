@echo off
(
    npm --prefix shared version %*
) && (
    npm --prefix server version %* 
) && (
    npm --prefix client version %*
) && (
    npm version %* --no-git-tag-version
) &&  (
    git commit . -m "%*" && git tag %*
)  && (
    cd shared && pnpm publish --access=public
) && (
    cd ../server && pnpm publish --access=public
) && (
    cd ../client && pnpm publish --access=public
)