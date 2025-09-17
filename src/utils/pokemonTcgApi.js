// src/utils/pokemonTcgApi.js

const API_KEY = "4258d39a-0880-4129-b48e-89ae35b13382";
const BASE_URL = "https://api.pokemontcg.io/v2/cards";

/**
 * Busca cartas de Pokémon por query personalizada.
 * @param {string} query Query completa (ex: name:Zamazenta set.name:"Destined Rivals" number:201)
 * @returns {Promise<Array>} Array de cartas
 */
export async function searchPokemonCards(query) {
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      "X-Api-Key": API_KEY,
      "Accept": "application/json"
    }
  });
  if (!res.ok) throw new Error("Erro ao buscar cartas");
  const data = await res.json();
  return data.data;
}

/**
 * Extrai imagem e valor da carta
 * @param {Object} card Objeto da carta
 * @returns {Object} { image, price }
 */
export function getCardImageAndPrice(card) {
  const image = card.images?.large || card.images?.small || null;
  // Preço pode estar em card.tcgplayer.prices, depende do tipo
  let price = null;
  if (card.tcgplayer && card.tcgplayer.prices) {
    const prices = card.tcgplayer.prices;
    // Pega o preço de market ou normal
    price = prices.normal?.market || prices.holofoil?.market || prices.reverseHolofoil?.market || null;
  }
  return { image, price };
}
