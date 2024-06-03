@echo off
@echo off
(
    npm --prefix shared version %*
) && (
    npm --prefix server version %* 
) && (
    npm --prefix client version %*
) && (
    git commit . -m "save for %*"
) && (
    npm version %* 
) && (
    cd shared && pnpm publish --access=public
) & (
    cd server && pnpm publish --access=public
) & (
    cd client && pnpm publish --access=public
) &