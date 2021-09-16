# lineage

Family tree web app project

## Breaking old history:

-  git count-objects -v

1. git checkout — orphan latest_branch
2. git add -A
3. git commit -am “Initial commit message” #Committing the changes
4. git branch -D master #Deleting master branch
5. git branch -m master #renaming branch as master
6. git push -f origin master #pushes to master branch
7. git gc — aggressive — prune=all # remove the old files
