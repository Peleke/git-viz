const state = {
  currentBranch: null,

  update (property) {
    return function updateValue (value) {
      if (value == undefined) {
        return
      }
      
      switch (property) {
        case 'currentBranch':
          updateBranch(value)
          break
        default:
          break
      }
    } 
  }
}