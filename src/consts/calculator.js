export const calcSubPrice = (item) => {
    return item.count * item.product.price
}

export const calcTotalPrice = (products) => {
    let totalPrice = 0
    products.forEach(item => {
        totalPrice += item.subPrice
    })
    return totalPrice
}