import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'prompt-favorites';

/**
 * Create the favorites store with localStorage persistence
 */
function createFavoritesStore() {
	// Initialize with saved favorites or empty set
	const initialFavorites = browser 
		? JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
		: [];
	
	const { subscribe, update, set } = writable(new Set(initialFavorites));
	
	return {
		subscribe,
		
		/**
		 * Toggle a prompt ID in favorites
		 * @param {string} promptId
		 */
		toggle(promptId) {
			update(favorites => {
				const newFavorites = new Set(favorites);
				if (newFavorites.has(promptId)) {
					newFavorites.delete(promptId);
				} else {
					newFavorites.add(promptId);
				}
				
				// Persist to localStorage
				if (browser) {
					localStorage.setItem(STORAGE_KEY, JSON.stringify([...newFavorites]));
				}
				
				return newFavorites;
			});
		},
		
		/**
		 * Check if a prompt is favorited
		 * @param {string} promptId
		 * @returns {boolean}
		 */
		has(promptId) {
			let result = false;
			subscribe(favorites => {
				result = favorites.has(promptId);
			})();
			return result;
		},
		
		/**
		 * Clear all favorites
		 */
		clear() {
			set(new Set());
			if (browser) {
				localStorage.removeItem(STORAGE_KEY);
			}
		}
	};
}

export const promptsFavorites = createFavoritesStore();

/**
 * Derived store that returns an array of favorite IDs
 */
export const favoriteIds = derived(
	promptsFavorites,
	$favorites => [...$favorites]
);