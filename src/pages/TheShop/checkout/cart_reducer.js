/** @format */

import {
	ADD_TO_CART,
	CLEAR_CART,
	COUNT_CART_TOTALS,
	REMOVE_CART_ITEM,
	TOGGLE_CART_ITEM_AMOUNT,
	SIDEBAR_OPEN,
	SIDEBAR_CLOSE,
	SHIPPING_FEES,
	SHIPPING_DETAILS,
} from "../../../actions";

const cart_reducer = (state, action) => {
	if (action.type === SIDEBAR_OPEN) {
		return { ...state, isSidebarOpen: true };
	}
	if (action.type === SIDEBAR_CLOSE) {
		return { ...state, isSidebarOpen: false };
	}

	if (action.type === ADD_TO_CART) {
		const { id, color, amount, product } = action.payload;
		// console.log(product, "ActionPayload");
		const tempItem = state.cart.find((i) => i.id === id);
		if (tempItem) {
			const tempCart = state.cart.map((cartItem) => {
				if (cartItem.id === id) {
					let newAmount = cartItem.amount + amount;
					if (newAmount > cartItem.max) {
						newAmount = cartItem.max;
					}
					return { ...cartItem, amount: newAmount };
				} else {
					return cartItem;
				}
			});

			return { ...state, cart: tempCart };
		} else {
			const newItem = {
				id: id,
				_id: product._id,
				name: product.productName,
				nameArabic: product.productName_Arabic,
				color,
				amount,
				image: product.images[0].url,
				price: product.price,
				priceAfterDiscount: product.priceAfterDiscount,
				max: product.quantity,
				loyaltyPoints: product.loyaltyPoints,
				slug: product.slug,
				categorySlug: product.category.categorySlug,
				categoryName: product.category.categoryName,
				categoryNameArabic: product.category.categoryName_Arabic,
				relatedProducts: product.relatedProducts,
				belongsTo: product.belongsTo,
			};
			return { ...state, cart: [...state.cart, newItem] };
		}
	}
	if (action.type === REMOVE_CART_ITEM) {
		const tempCart = state.cart.filter((item) => item.id !== action.payload);
		return { ...state, cart: tempCart };
	}
	if (action.type === CLEAR_CART) {
		return { ...state, cart: [] };
	}
	if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
		const { id, value } = action.payload;
		const tempCart = state.cart.map((item) => {
			if (item.id === id) {
				if (value === "inc") {
					let newAmount = item.amount + 1;
					if (newAmount > item.max) {
						newAmount = item.max;
					}
					return { ...item, amount: newAmount };
				}
				if (value === "dec") {
					let newAmount = item.amount - 1;
					if (newAmount < 1) {
						newAmount = 1;
					}
					return { ...item, amount: newAmount };
				}
			}
			return item;
		});

		return { ...state, cart: tempCart };
	}
	if (action.type === COUNT_CART_TOTALS) {
		const { total_items, total_amount } = state.cart.reduce(
			(total, cartItem) => {
				const { amount, priceAfterDiscount } = cartItem;

				total.total_items += amount;
				total.total_amount += priceAfterDiscount * amount;
				return total;
			},
			{
				total_items: 0,
				total_amount: 0,
			}
		);
		return { ...state, total_items, total_amount };
	}

	if (action.type === SHIPPING_FEES) {
		const { ShippingPrice } = action.payload;
		return { ...state, shipping_fee: ShippingPrice };
	}

	if (action.type === SHIPPING_DETAILS) {
		const { chosenShipmentDetails } = action.payload;
		return { ...state, shipmentChosen: chosenShipmentDetails };
	}
	throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
