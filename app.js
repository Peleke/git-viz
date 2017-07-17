const g = new GitGraph({
  template: "metro",
  orientation: "horizontal",
  mode: "compact"
})

/** 
 * Listeners
 **/

// Globally disable form submissions...Laziness.
document.querySelector('body').addEventListener('click', e => e.preventDefault())

// Change current branch via select
document.querySelector('#branch-select').addEventListener('click', e => {
  const {options, selectedIndex} = e.target
  config.update('currentBranch')(options[selectedIndex].value)
})

document.querySelector('#add-branch').addEventListener('click', function (event) {
  const branchName = document.querySelector('#branch-name').value
  addBranch(branchName)
})

document.querySelector('#add-commit').addEventListener('click', (event) => {
  const author = valueFrom('#commit-author')
  const message = valueFrom('#commit-message')
  g.commit({ author, message })
})

// document.querySelector('#merge-branches').addEventListener('click', event => {
//   const targetName = document.querySelector('#target-branch').value                               
//   const targetBranch = getBranch(g)(targetName)

//   if (targetBranch) {
//     config.currentBranch.merge(targetBranch)
//     setCurrent(targetBranch)
//   } else {
//     console.error(`Can't merge ${config.currentBranch} with ${targetBranch}.`)
//   }
// })