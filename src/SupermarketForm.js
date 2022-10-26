function SupermarketForm({postSupermarket}) {
    return (
        <div>
            <form>
                <input type="text" placeholder="Name..."/>
                <input type="text" placeholder="Zipcode..."/>
                <input type="text" placeholder="Price of a dozen eggs..."/>
                <input type="text" placeholder="Price of a gallon of milk..."/>
                <input type="text" placeholder="Price of 5 pounds of flour..."/>
                
            </form>
        </div>
    )
}

export default SupermarketForm