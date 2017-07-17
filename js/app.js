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
document.querySelector('#top-branch-select').addEventListener('click', e => {
  const {options, selectedIndex} = e.target
  const updatedBranch = getBranch(g)(options[selectedIndex].value)
  state.update('currentBranch')(updatedBranch)
})

document.querySelector('#add-branch').addEventListener('click', function (event) {
  const branchName = document.querySelector('#branch-name').value
  addBranch(branchName)
})

document.querySelector('#add-commit').addEventListener('click', e => {
  const author = valueFrom('#commit-author')
  const message = valueFrom('#commit-message')
  g.commit({ author, message })
})

// @TODO: Don't assume g defined
document.querySelector('#merge-branches').addEventListener('click', e => {
  const source = getBranch(g)(valueFrom('#merge-source-branch'))
  const target = getBranch(g)(valueFrom('#merge-target-branch'))

  // @TODO: Complain if no source/target
  if (!source || !target) {
    return
  }

  source.merge(target)
})