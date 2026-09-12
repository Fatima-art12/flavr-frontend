import tr1 from '../assets/TR1.jpg'
import tr2 from '../assets/TR2.jpg'
import tr3 from '../assets/TR3.jpg'
import tr4 from '../assets/TR4.jpg'
import tr5 from '../assets/TR5.jpg'
import tr6 from '../assets/TR6.jpg'
import pr1 from '../assets/PR1.jpg'
import pr2 from '../assets/PR2.jpg'
import pr3 from '../assets/PR3.jpg'
import pr4 from '../assets/PR4.jpg'
import pr5 from '../assets/PR5.jpg'
import pr6 from '../assets/PR6.jpg'

const recipes = [
  {
    id: 1,
    image: tr1,
    title: 'Creamy Garlic Pasta',
    time: '25 min',
    difficulty: 'Easy',
    cuisine: 'Italian',
    ingredients: ['200g pasta', '4 cloves garlic', '1 cup cream', 'Parmesan cheese', 'Salt & pepper'],
    steps: ['Boil pasta until al dente.', 'Sauté garlic in butter.', 'Add cream and simmer.', 'Toss pasta in sauce and top with parmesan.'],
  },
  {
    id: 2,
    image: tr2,
    title: 'Chicken Biryani',
    time: '40 min',
    difficulty: 'Medium',
    cuisine: 'Desi',
    ingredients: ['500g chicken', '2 cups basmati rice', 'Yogurt', 'Biryani masala', 'Fried onions'],
    steps: ['Marinate chicken in yogurt and spices.', 'Cook chicken until tender.', 'Layer rice and chicken.', 'Steam on low heat (dum) for 20 minutes.'],
  },
  {
    id: 3,
    image: tr3,
    title: 'Avocado Toast',
    time: '15 min',
    difficulty: 'Easy',
    cuisine: 'Breakfast',
    ingredients: ['2 slices bread', '1 ripe avocado', 'Chili flakes', 'Lemon juice', 'Salt'],
    steps: ['Toast the bread.', 'Mash avocado with lemon and salt.', 'Spread on toast.', 'Top with chili flakes.'],
  },
  {
    id: 4,
    image: tr4,
    title: 'Beef Stir Fry',
    time: '50 min',
    difficulty: 'Medium',
    cuisine: 'Asian',
    ingredients: ['300g beef strips', 'Mixed vegetables', 'Soy sauce', 'Garlic & ginger', 'Sesame oil'],
    steps: ['Marinate beef in soy sauce.', 'Stir fry beef until browned.', 'Add vegetables and stir fry.', 'Finish with sesame oil.'],
  },
  {
    id: 5,
    image: tr5,
    title: 'Momos',
    time: '30 min',
    difficulty: 'Easy',
    cuisine: 'Snacks',
    ingredients: ['Momo wrappers', 'Minced chicken/veg', 'Ginger garlic paste', 'Soy sauce', 'Spring onions'],
    steps: ['Mix filling ingredients.', 'Fill and fold wrappers.', 'Steam for 15 minutes.', 'Serve with chili dip.'],
  },
  {
    id: 6,
    image: tr6,
    title: 'Chocolate Lava Cake',
    time: '60 min',
    difficulty: 'Hard',
    cuisine: 'Dessert',
    ingredients: ['200g dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour'],
    steps: ['Melt chocolate and butter.', 'Whisk eggs and sugar, combine.', 'Fold in flour.', 'Bake until edges are set but center is soft.'],
  },
  {
    id: 7,
    image: pr1,
    title: 'Lentil Soup',
    time: '20 min',
    difficulty: 'Easy',
    cuisine: 'Comfort',
    ingredients: ['1 cup red lentils', 'Onion & garlic', 'Cumin', 'Vegetable stock', 'Lemon'],
    steps: ['Sauté onion and garlic.', 'Add lentils and stock.', 'Simmer until soft.', 'Blend and finish with lemon.'],
  },
  {
    id: 8,
    image: pr2,
    title: 'Grilled Salmon',
    time: '35 min',
    difficulty: 'Medium',
    cuisine: 'Seafood',
    ingredients: ['2 salmon fillets', 'Olive oil', 'Lemon', 'Garlic', 'Herbs'],
    steps: ['Marinate salmon in oil, lemon, garlic.', 'Preheat grill.', 'Grill 4-5 min per side.', 'Garnish with herbs.'],
  },
  {
    id: 9,
    image: pr3,
    title: 'Beef Tacos',
    time: '45 min',
    difficulty: 'Medium',
    cuisine: 'Mexican',
    ingredients: ['Taco shells', '300g minced beef', 'Taco seasoning', 'Lettuce & tomato', 'Cheese'],
    steps: ['Cook beef with seasoning.', 'Warm taco shells.', 'Fill with beef and toppings.', 'Serve immediately.'],
  },
  {
    id: 10,
    image: pr4,
    title: 'Mango Smoothie',
    time: '10 min',
    difficulty: 'Easy',
    cuisine: 'Drinks',
    ingredients: ['2 ripe mangoes', '1 cup yogurt', 'Milk', 'Honey', 'Ice'],
    steps: ['Peel and chop mangoes.', 'Blend all ingredients.', 'Pour and serve chilled.'],
  },
  {
    id: 11,
    image: pr5,
    title: 'Baked Ziti',
    time: '55 min',
    difficulty: 'Medium',
    cuisine: 'Italian',
    ingredients: ['Ziti pasta', 'Marinara sauce', 'Ricotta cheese', 'Mozzarella', 'Basil'],
    steps: ['Boil ziti.', 'Layer pasta, sauce, and cheeses.', 'Bake until bubbly.', 'Garnish with basil.'],
  },
  {
    id: 12,
    image: pr6,
    title: 'Paneer Tikka',
    time: '30 min',
    difficulty: 'Easy',
    cuisine: 'Desi',
    ingredients: ['300g paneer cubes', 'Yogurt', 'Tikka masala', 'Bell peppers', 'Onion'],
    steps: ['Marinate paneer in yogurt and spices.', 'Skewer with vegetables.', 'Grill or bake until charred.', 'Serve with mint chutney.'],
  },
]

export default recipes