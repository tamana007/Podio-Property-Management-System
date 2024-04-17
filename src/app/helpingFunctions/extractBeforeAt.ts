import React from 'react'

// function extractBeforeAt() {

  export const  extractBeforeAt=(str: string): string=> {
    const atIndex = str.indexOf('@');
    return atIndex !== -1 ? str.slice(0, atIndex) : str;
  }

// }

// export default extractBeforeAt