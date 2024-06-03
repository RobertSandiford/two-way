@echo off
(
    cd shared && pnpm publish --access=public %*
) && (
    cd server && pnpm publish --access=public %*
) && (
    cd client && pnpm publish --access=public %*
)