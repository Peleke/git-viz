const config = {
  currentBranch: null,

  update (property) {
    return function updateValue (value) {
      if (value == undefined) {
        return
      }
      
      switch (property) {
        case 'currentBranch':
          updateBranch(getBranch(g)(value))
          break
        default:
          break
      }
    } 
  }
}