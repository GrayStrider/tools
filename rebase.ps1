param([string]$projectPath, [string]$master, [string]$upstream)

cd $projectPath

$exceptions = '*',$master
$branches = git branch --contains $master | 
             Select-String -Pattern \S+ -AllMatches |
             ForEach-Object { $_.Matches.Value } |
             Where-Object -FilterScript {$_ -notin $exceptions}

git checkout $master
git merge $upstream

foreach ($branch in $branches) {
    git rebase $master $branch
}
            
