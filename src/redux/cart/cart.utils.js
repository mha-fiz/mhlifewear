export const addItemToCart = (cartItems, cartItemToAdd) => {
  //?(1) check if the added item already in the cart
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  ); //find gives us the first object that matched

  //?(2) if it is, add 1 to the 'quantity' property
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //?(3) if it isn't, spread the cartItems array, and give base 'quantity' property of 1 to the newly added item
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
