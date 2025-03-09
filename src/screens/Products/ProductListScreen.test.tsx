import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import  store from '../../redux/store';
import { getProducts } from '../../redux/slices/productsSlice';
import cartThunk from '../../redux/thunks/cartThunk';
import ProductListScreen from './ProductListScreen';

// Mocking navigation prop
const mockNavigation = { navigate: jest.fn() };

describe('ProductListScreen', () => {
  const mockDispatch = jest.fn();
  const mockUseSelector = jest.fn();

  // Mock product data
  const mockProducts = [
    { id: 1, title: 'Product 1', price: 10, images: ['image1.png'] },
    { id: 2, title: 'Product 2', price: 20, images: ['image2.png'] },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test loading state
  it('renders loading spinner when products are loading', () => {
    mockUseSelector.mockReturnValue({ products: [], loading: true, error: null });

    const { getByTestId } = render(
      <Provider store={store}>
        <ProductListScreen navigation={mockNavigation} />
      </Provider>
    );

    const spinner = getByTestId('loading-spinner');
    expect(spinner).toBeTruthy();
  });

  // Test error state
  it('renders error message when there is an error', () => {
    mockUseSelector.mockReturnValue({ products: [], loading: false, error: 'Error fetching products' });

    const { getByText } = render(
      <Provider store={store}>
        <ProductListScreen navigation={mockNavigation} />
      </Provider>
    );

    const errorText = getByText('Error: Error fetching products');
    expect(errorText).toBeTruthy();
  });

  // Test product list rendering
  it('renders product list', () => {
    mockUseSelector.mockReturnValue({ products: mockProducts, loading: false, error: null });

    const { getByText } = render(
      <Provider store={store}>
        <ProductListScreen navigation={mockNavigation} />
      </Provider>
    );

    const productTitle = getByText('Product 1');
    expect(productTitle).toBeTruthy();
  });

  // Test navigation when a product is pressed
  it('navigates to product detail screen when product card is pressed', () => {
    mockUseSelector.mockReturnValue({ products: mockProducts, loading: false, error: null });

    const { getByText } = render(
      <Provider store={store}>
        <ProductListScreen navigation={mockNavigation} />
      </Provider>
    );

    fireEvent.press(getByText('Product 1'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ProductDetail', { product: mockProducts[0], quantity: 0 });
  });

  // Test pagination by scrolling to the bottom
  it('loads more products when reaching the end of the list', async () => {
    mockUseSelector.mockReturnValue({ products: mockProducts, loading: false, error: null });

    const { getByTestId } = render(
      <Provider store={store}>
        <ProductListScreen navigation={mockNavigation} />
      </Provider>
    );

    const list = getByTestId('product-list');
    fireEvent.scroll(list, { nativeEvent: { contentOffset: { y: 100 }, contentSize: { height: 500 }, layoutMeasurement: { height: 500 } } });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(getProducts({ page: 2, limit: 10 }));
    });
  });

  // Test adding product to cart
  it('adds product to cart when add to cart button is pressed', () => {
    mockUseSelector.mockReturnValue({ products: mockProducts, loading: false, error: null });

    const { getByText } = render(
      <Provider store={store}>
        <ProductListScreen navigation={mockNavigation} />
      </Provider>
    );

    fireEvent.press(getByText('Add to Cart'));
    expect(mockDispatch).toHaveBeenCalledWith(
      cartThunk.addToCart({
        id: mockProducts[0].id,
        title: mockProducts[0].title,
        price: mockProducts[0].price,
        quantity: 1,
        image: mockProducts[0].images[0],
      })
    );
  });
});
