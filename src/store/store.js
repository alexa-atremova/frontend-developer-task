import create from "zustand";

const useStore = create((set) => ({
  searchTerm: "",
  searchResults: [],

  selectedItems: [],

  setSearchTerm: (searchTerm) => set({ searchTerm }),
  selectItem: (item) =>
    set((state) => ({ selectedItems: [...state.selectedItems, item] })),
  clearItem: (item) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter(
        (selectedItem) => selectedItem.id !== item.id
      ),
    })),

  fetchData: async () => {
    const response = await fetch(
      "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
    );
    const data = await response.json();
    set({ searchResults: data });
  },
}));

export { useStore };
