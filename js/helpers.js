// General Helpers
const valueFrom = selector => document.querySelector(selector).value

// Core
const getBranch = graph => branchName =>
  graph.branches
    .filter(branch => branch.name === branchName)[0]

const has = graph => branchName => 
  getBranch(graph)(branchName) != undefined
    
// @SelfIndulgence
const thisOrThat = (_this, prop = 'name') => that => 
  _this
    ? prop 
      ? _this[prop] 
      : _this 
    : that
    


// App Helpers
const update = state => (updateEnvironment = () => null) => prop => val => {
  state[prop] = val
  updateEnvironment(val)
}

const updateBranch = update(state)(branch => {
  branch.checkout()

  document.querySelectorAll('.current-branch')
    .forEach(
      span => span.textContent = thisOrThat(state.currentBranch)(span.textContent))
})('currentBranch')

const createBranchListItem = branchName => {
  const child = document.createElement('option')

  child.value = branchName
  child.textContent = branchName
  child.setAttribute('data-branch-name', branchName)

  return child
}

const appendToBranchLists = selector => branchName =>
  Array
    .from(
      document.querySelectorAll(selector))
        .forEach(element => element.append(createBranchListItem(branchName)))
  
// @TODO: Don't assume g for getbranc
const addBranch = (branchName) => {
  const branch = getBranch(g)(branchName)
  
  if (branch) {
    branch.checkout()
    updateBranch(branch)
  } else {
    const branch = g.branch(branchName)
    updateBranch(branch)
    appendToBranchLists('#top-branch-select')(branchName)
    appendToBranchLists('.branch-select')(branchName)
  }
}
