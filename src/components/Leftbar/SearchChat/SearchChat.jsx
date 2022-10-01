import React from 'react'
import "./SearchChat.css"
function SearchChat() {
  return (
    <div className='search_chat'>
        
        <div>
            
			<input type="text" placeholder="Search or Start"></input>
            <ion-icon name="search-outline" role="img" className="md hydrated" aria-label="search outline"></ion-icon>
		</div>
    </div>
  )
}

export default SearchChat