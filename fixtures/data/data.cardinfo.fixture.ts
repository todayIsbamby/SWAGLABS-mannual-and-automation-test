// fixtures/data/data.cartinfo.fixture.ts

export interface CartItemInfo {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
}

export const CART_ITEMS: CartItemInfo[] = [
  {
    id: '4',
    name: 'Sauce Labs Backpack',
    description:
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    price: '$29.99',
    quantity: 1,
  },
  {
    id: '0',
    name: 'Sauce Labs Bike Light',
    description:"A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    price: '$9.99',
    quantity: 1,
  },
  {
    id: '1',
    name: 'Sauce Labs Bolt T-Shirt',
    description:'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
    price: '$15.99',
    quantity: 1,
  },
];
