const mainFilmsNavigationMap = {
  all: {
    itemTitle: `All movies`,
    countEntries(filmsMain) {
      return filmsMain.filter((film) => film).length;
    }
  },
  watchlist: {
    itemTitle: `Watchlist`,
    countEntries(filmsMain) {
      return filmsMain.filter((film) => film.isInWatchlist).length;
    }
  },
  history: {
    itemTitle: `History`,
    countEntries(filmsMain) {
      return filmsMain.filter((film) => film.isInHistory).length;
    }
  },
  favorites: {
    itemTitle: `Favorites`,
    countEntries(filmsMain) {
      return filmsMain.filter((film) => film.isInFavorites).length;
    }
  }
};

export const generateNavigation = (filmsMain) => {
  return Object.entries(mainFilmsNavigationMap).map(([id, params]) => {
    return {
      id: id,
      title: params.itemTitle,
      number: params.countEntries(filmsMain),
    };
  });
};
