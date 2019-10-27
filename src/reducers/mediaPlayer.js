// Estado Inicial del Reducer
const INITIAL_STATE = {
    searchText: '',
    arraySongs: [],
    imagePlayer: '',
    playerSC: null,

}

//El Reducer, donde tiene todas los actions que pueden interatuar con el.
const mediaPlayer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'NEW_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.payload.searchText,
            }

        case 'NEW_IMAGE_PLAYER':
            return {
                ...state,
                imagePlayer: action.payload.imagePlayer,
            }

        case 'NEW_ARRAY_SONGS':
            return {
                ...state,
                arraySongs: action.payload.arraySongs,
            }

        case 'NEW_PLAYER_SC':
            return {
                ...state,
                playerSC: action.payload.playerSC,
            }


        default:
            return state;
    }
}

export default mediaPlayer;