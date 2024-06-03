@echo off
(
    npm --prefix shared version %*
) && (
    npm --prefix server version %* 
) && (
    npm --prefix client version %*
) && (
    git commit . -m "%*"
) && (
    npm version %* 
) 