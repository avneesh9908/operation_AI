import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0
        },
        reducers: {
        addToCart: (state, action) => {
            const product=action.payload;
            const productPrice = parseFloat(product.price);

            //if card already exits
            const exitingProduct=state.items.find(
                (item)=> item.productName===product.productName
            );
            if(exitingProduct){
                // parseInt(existingProduct.quantity) + parseInt(product.quantity);
                exitingProduct.quantity+=1;
                state.total+=product.price;
                }else{
                    state.items.push(product);
                    product.quantity = product.quantity || 1;
                   
                }
                state.total = state.items.reduce(
                    (acc, item) => acc + (parseFloat(item.price) * item.quantity),
                    0
                  );
                },
                removeFromCart: (state, action)=>{
                    const productName=action.payload;
                    state.items=state.items.filter((item)=>{
                        return item.productName!==productName
                    })
                    state.total = state.items.reduce(
                        (acc, item) => acc + (parseFloat(item.price) * item.quantity),
                        0
                      );
                    },
                updateQuantity: (state, action) => {
                    const productName = action.payload.productName;
                    const quantity = action.payload.quantity;
                    const product = state.items.find((item) => item.productName === productName);
                    if (product) {
                        product.quantity = quantity;
                        // Recalculate total
                        state.total = state.items.reduce(
                          (acc, item) => acc + (parseFloat(item.price) * item.quantity),
                          0
                        );
                      }
                    },
                    clearCart: (state)=>{
                        state.items=[];
                        state.total = 0;
                    },
                    },
                    


});
export const {addToCart, removeFromCart, updateQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;