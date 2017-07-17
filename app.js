const g = new GitGraph({
  template: "metro",
  orientation: "horizontal",
  mode: "compact"
})

const config = {
  currentBranch: null
}

// Listeners
document.querySelector('#add-branch').addEventListener('click', function (event) {
  const branchName = document.querySelector('#branch-name').value
  addBranch(branchName)
})

document.querySelector('#add-commit').addEventListener('click', (event) => {
  const message = document.querySelector('#commit-message').value                               
  g.commit(message)
})

document.querySelector('#merge-branches').addEventListener('click', event => {
  const targetName = document.querySelector('#target-branch').value                               
  const targetBranch = getBranch(g)(targetName)

  if (targetBranch) {
    config.currentBranch.merge(targetBranch)
    setCurrent(targetBranch)
  } else {
    console.error(`Can't merge ${config.currentBranch} with ${targetBranch}.`)
  }
})