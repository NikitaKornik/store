import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useAuth, useCart, useFavorites } from "../hooks/useAPI";
import { compareIdsStore, favoriteIdsStore } from "./selectionStores";

export const CartActionsContext = createContext(null);
export const CartMetaContext = createContext(null);
export const FavoritesDataContext = createContext(null);
export const FavoritesActionsContext = createContext(null);
export const FavoritesMetaContext = createContext(null);
export const CompareDataContext = createContext(null);
export const CompareActionsContext = createContext(null);
export const CompareMetaContext = createContext(null);
export const SearchContext = createContext(null);
export const AuthContext = createContext(null);

function ContextProvider({ children }) {
  const {
    user,
    isAuthenticated,
    getProfile,
    login,
    register,
    logout,
    loading: authLoading,
    error: authError,
    clearError: clearAuthError,
  } = useAuth();
  const { cart, getCart } = useCart();
  const { favorites, getFavorites, toggleFavorite, removeFromFavorites } =
    useFavorites();
  const [compareItems, setCompareItems] = useState([]);
  const cartItemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );
  const favoritesCount = useMemo(() => favorites.length, [favorites]);

  useEffect(() => {
    getProfile();
    getCart();
    getFavorites();
  }, [getProfile, getCart, getFavorites]);

  useEffect(() => {
    favoriteIdsStore.setItems(favorites);
  }, [favorites]);

  useEffect(() => {
    compareIdsStore.setItems(compareItems);
  }, [compareItems]);

  useEffect(() => {
    const savedCompare = localStorage.getItem("compare");
    if (savedCompare) {
      setCompareItems(JSON.parse(savedCompare));
    }
  }, []);

  const toggleCompare = useCallback((product) => {
    setCompareItems((currentItems) => {
      const exists = currentItems.some((item) => item.id === product.id);
      const nextItems = exists
        ? currentItems.filter((item) => item.id !== product.id)
        : [...currentItems, product].slice(-4);

      localStorage.setItem("compare", JSON.stringify(nextItems));
      return nextItems;
    });
  }, []);

  const clearCompare = useCallback(() => {
    localStorage.removeItem("compare");
    setCompareItems([]);
  }, []);

  const [query, setQuery] = useState("");

  const cartActionsContext = useMemo(
    () => ({
      getCart,
    }),
    [getCart]
  );

  const cartMetaContext = useMemo(
    () => ({
      cartItemCount,
    }),
    [cartItemCount]
  );

  const searchContext = useMemo(
    () => ({
      query,
      setQuery,
    }),
    [query]
  );

  const favoritesDataContext = useMemo(
    () => ({
      favorites,
    }),
    [favorites]
  );

  const favoritesActionsContext = useMemo(
    () => ({
      getFavorites,
      toggleFavorite,
      removeFromFavorites,
    }),
    [getFavorites, removeFromFavorites, toggleFavorite]
  );

  const favoritesMetaContext = useMemo(
    () => ({
      favoritesCount,
    }),
    [favoritesCount]
  );

  const compareDataContext = useMemo(
    () => ({
      compareItems,
    }),
    [compareItems]
  );

  const compareActionsContext = useMemo(
    () => ({
      toggleCompare,
      clearCompare,
    }),
    [clearCompare, toggleCompare]
  );

  const compareMetaContext = useMemo(
    () => ({
      compareCount: compareItems.length,
    }),
    [compareItems.length]
  );

  const authContext = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      register,
      logout,
      authLoading,
      authError,
      clearAuthError,
    }),
    [
      user,
      isAuthenticated,
      login,
      register,
      logout,
      authLoading,
      authError,
      clearAuthError,
    ]
  );

  return (
    <AuthContext.Provider value={authContext}>
      <CartActionsContext.Provider value={cartActionsContext}>
        <CartMetaContext.Provider value={cartMetaContext}>
          <FavoritesDataContext.Provider value={favoritesDataContext}>
            <FavoritesActionsContext.Provider value={favoritesActionsContext}>
              <FavoritesMetaContext.Provider value={favoritesMetaContext}>
                <CompareDataContext.Provider value={compareDataContext}>
                  <CompareActionsContext.Provider value={compareActionsContext}>
                    <CompareMetaContext.Provider value={compareMetaContext}>
                      <SearchContext.Provider value={searchContext}>
                        {children}
                      </SearchContext.Provider>
                    </CompareMetaContext.Provider>
                  </CompareActionsContext.Provider>
                </CompareDataContext.Provider>
              </FavoritesMetaContext.Provider>
            </FavoritesActionsContext.Provider>
          </FavoritesDataContext.Provider>
        </CartMetaContext.Provider>
      </CartActionsContext.Provider>
    </AuthContext.Provider>
  );
}

export default ContextProvider;
