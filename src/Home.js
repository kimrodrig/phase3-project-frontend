import React from 'react';

function Home() {
    return(
        <div className='home-section'>
            <p>
                Food prices are going up everywhere. It's nice to know which supermarkets are still reasonably affordable! 
                If you live in lower Manhattan, you can enter your zipcode below and see a list of supermarkets near you sorted by expensiveness: least first, always.
            </p>
            <p>
                Since prices change quickly, some of our data may be out of date. If you've recently been to one of these locations and noticed our information is no longer accurate, by all means update the prices to reflect today's prices.
                You may also add a new supermarket if it's not yet in our system!
            </p>
        </div>
    )
}

export default Home