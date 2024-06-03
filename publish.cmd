@echo off
pnpm --dir shared publish --access=public
pnpm --dir server publish --access=public
pnpm --dir client publish --access=public
