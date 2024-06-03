@echo off
(
    npm --prefix shared version %* --no-git-tag-version
) & (
    npm --prefix server version %* --no-git-tag-version
) & (
    npm --prefix client version %* --no-git-tag-version
) & (
    npm version %* --no-git-tag-version
)

