import create from "zustand";

const useStore = create((set) => ({
  searchTerm: "",
  selectedItem: null,
  searchResults: [],

  setSearchTerm: (searchTerm) => set({ searchTerm }),
  selectItem: (item) => set({ selectedItem: item }),

  fetchData: async () => {
    const response = await fetch(
      "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
    );
    const data = await response.json();
    set({ searchResults: data });
  },
}));

export { useStore };
