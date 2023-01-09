import {menuArray} from '/data.js'
const feedHtml = document.getElementById('feed')
const orderList = document.getElementById('order-list')
const total = document.getElementById('total')
const orderHtml = document.getElementById('order')
const submitBtn = document.getElementById('submit-btn')
const paymentModal = document.getElementById('payment-modal')

document.addEventListener('click', function(e){
    if (e.target.dataset.order){
        order(e.target.dataset.order)
    }
    else if (e.target.dataset.remove){
        removeBtn(e.target.dataset.remove)
    }
    else if (e.target.id === 'pay-btn'){
        payBtn()
    }
})

function payBtn(){
    const inputName = document.getElementById('name')
    const inputCardNumber = document.getElementById('card')
    const inputCvv = document.getElementById('cvv')
    const orderFinalText = document.getElementById('order-final-text')
    if (inputName.value && inputCardNumber.value && inputCvv.value){
        let finalText = `<p>Thanks, ${inputName.value}! Your order is on it's way!</p>`
        orderFinalText.innerHTML = finalText
        orderFinalText.classList.toggle('hidden')
        orderHtml.classList.add('hidden')
        total.classList.add('hidden')
        submitBtn.classList.add('hidden')
        paymentModal.classList.add('hidden')
    }
    
    
}

submitBtn.addEventListener('click', function(){
    let payModal = ` <div class="modal">
                     <h3 class="modal-h3">Enter card details</h3>
                     <form>
                        <input type="text" id="name" placeholder="Enter your name" required>
                        <input type="number" id="card" placeholder="Enter card number" required>
                        <input type="number" id="cvv" placeholder="Enter CVV" required>
                        <button type="button" id="pay-btn" class="pay-btn">Pay</button>
                     </form>
                     </div>`
    paymentModal.classList.remove('hidden')                 
    paymentModal.innerHTML = payModal
})

function getOrderObj(orderId){
    let orderObj = menuArray.filter(checkOrderObj)[0]
    function checkOrderObj(menu){
        return orderId == menu.id
    }
    return orderObj
}

let orderArray = []
function order(orderId){
    let renderOrder = ''
    let totalPrice = ''
    let newPrice = 0
    let orderObject = getOrderObj(orderId)
    orderArray.push(orderObject)
    orderArray.forEach(function(menu){
            orderHtml.classList.remove('hidden')
            total.classList.remove('hidden')
            submitBtn.classList.remove('hidden')  
            renderOrder += `<div id="orders-${orderId}" class="orders">
                            <h3 class="order-name">${menu.name}</h3>
                            <button id="btn-${orderId}" class="order-btn" data-remove="${menu.id}       ">REMOVE</button>
                            <p class="order-price">$${menu.price}</p>
                            </div>` 
            newPrice += menu.price                                            
            totalPrice = `<h3>Total price:</h3>
                           <span id="price-${orderId}" class="total-price">$${newPrice}</span>
                           `                             
            orderList.innerHTML = renderOrder
            total.innerHTML = totalPrice
            })
}

function removeBtn(orderId){
    let renderOrder = ''
    let totalPrice = ''
    let newPrice = 0
    let removed = orderArray.filter(function(removedObj){
        return removedObj.id == orderId
    })[0]
    let index = orderArray.indexOf(removed)
    orderArray.splice(index, 1)
            if (orderArray.length > 0){
                orderArray.forEach(function(menu){  
                renderOrder += `<div id="orders-${orderId}" class="orders">
                                <h3 class="order-name">${menu.name}</h3>
                                <button id="btn-${orderId}" class="order-btn" data-remove="${menu.id}       ">REMOVE</button>
                                <p class="order-price">$${menu.price}</p>
                                </div>` 
                newPrice += menu.price                                            
                totalPrice = `<h3>Total price:</h3>
                            <span id="price-${orderId}" class="total-price">$${newPrice}</span>
                           `                             
            })
            }
            else{
                orderHtml.classList.add('hidden')
                total.classList.add('hidden')
                submitBtn.classList.add('hidden')
            }
            
            
            orderList.innerHTML = renderOrder
            total.innerHTML = totalPrice
    }        
    

function render(){
    let renderMenu = ''
    menuArray.forEach(function(menu){
        renderMenu += `<div class="feed-container">
                        <span class="emoji">${menu.emoji}</span>
                        <div class="menu-desc">
                            <h4 class="name">${menu.name}</h4>
                            <p class="ingredients">${menu.ingredients}</p>
                            <p class="price">$${menu.price}</p>
                        </div>
                        <button data-order='${menu.id}' class="menu-btn">+</button>
                        </div>
                       `
        })

    feedHtml.innerHTML = renderMenu
}
render()
