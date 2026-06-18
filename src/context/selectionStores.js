import { useSyncExternalStore } from "react";

const createIdStore = () => {
  let ids = new Set();
  const listeners = new Set();

  const emit = () => {
    listeners.forEach((listener) => listener());
  };

  return {
    setItems(items) {
      const nextIds = new Set(items.map((item) => item.id));
      const isSame =
        nextIds.size === ids.size && [...nextIds].every((id) => ids.has(id));

      if (isSame) {
        return;
      }

      ids = nextIds;
      emit();
    },
    has(id) {
      return ids.has(id);
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

export const favoriteIdsStore = createIdStore();
export const compareIdsStore = createIdStore();

export const useIsFavorite = (id) =>
  useSyncExternalStore(
    favoriteIdsStore.subscribe,
    () => favoriteIdsStore.has(id),
    () => false
  );

export const useIsCompared = (id) =>
  useSyncExternalStore(
    compareIdsStore.subscribe,
    () => compareIdsStore.has(id),
    () => false
  );
