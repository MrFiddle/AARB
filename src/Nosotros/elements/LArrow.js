import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import './LArrow.css'

function LArrow() {
  return (
    <div>
      <span className='LArrow'>
        <FontAwesomeIcon icon={solid('arrow-left')} style={{height: '40px'}}/>
      </span>
    </div>
  )
}

export default LArrow
