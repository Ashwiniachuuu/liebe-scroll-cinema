import cheeseBurger from "@/assets/images/cheese-burger.jpg";
import spicyChickenBurger from "@/assets/images/spicy-chicken-burger.jpg";
import doubleBeefBurger from "@/assets/images/double-beef-burger.jpg";
import crispyChicken from "@/assets/images/crispy-chicken.jpg";
import loadedFries from "@/assets/images/loaded-fries.jpg";
import drinks from "@/assets/images/drinks.jpg";

export const menuItems = [
  {
    image: cheeseBurger,
    name: "Cheese Burger",
    description: "Aged cheddar melted over a flame-grilled patty.",
    rating: 4.9,
    price: "$9.50",
  },
  {
    image: spicyChickenBurger,
    name: "Spicy Chicken Burger",
    description: "Buttermilk chicken, chili glaze, crisp pickles.",
    rating: 4.8,
    price: "$10.20",
  },
  {
    image: doubleBeefBurger,
    name: "Double Beef Burger",
    description: "Two smashed patties, smoked bacon, house sauce.",
    rating: 5.0,
    price: "$12.80",
  },
  {
    image: crispyChicken,
    name: "Crispy Chicken",
    description: "Golden tenders with a light, shattering crust.",
    rating: 4.7,
    price: "$8.40",
  },
  {
    image: loadedFries,
    name: "Loaded Fries",
    description: "Hand-cut fries under molten cheese and herbs.",
    rating: 4.8,
    price: "$6.90",
  },
  {
    image: drinks,
    name: "Drinks",
    description: "Ice-cold classics, poured over crystal ice.",
    rating: 4.6,
    price: "$3.50",
  },
];
