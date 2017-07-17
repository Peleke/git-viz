// Helpers
const has = graph => branchName => 
  getBranch(graph)(branchName) != undefined

const getBranch = graph => branchName =>
  graph.branches
    .filter(branch => branch.name === branchName)[0]

const setCurrent = config => branch => {
  config.currentBranch = branch
  document.querySelector('#current-branch').textContent = branch.name
} 

const createBranchListItem = branchName => {
  const child = document.createElement('li')
  child.className = 'list-group-item'
  child.textContent = branchName
  child.setAttribute('data-branch-name', branchName)

  child.addEventListener('click', event => {
    const branchName = child.getAttribute('data-branch-name')
    let branch = g.branches
                    .filter(branch => branch.name === branchName)[0]

    if (branch) {
      branch.checkout()
      setCurrent(branch)
    }
  })

  return child
}

const appendToBranchList = id => branchListItem =>
  document.querySelector(id).append(branchListItem)

const addBranch = (branchName) => {
  const noBranches = document.querySelector('.no-branches')
  const branch = has(g)(branchName)
  
  if (noBranches) {
    noBranches.remove()
  }

  if (branch) {
    branch.checkout()
    setCurrent(config)(branch)
  } else {
    const branch = g.branch(branchName)
    setCurrent(config)(branch)
    appendToBranchList('#branch-list')(createBranchListItem(branchName))
  }
}
