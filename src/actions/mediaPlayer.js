export const newSearchText =
    (searchText) => ({
        type: 'NEW_SEARCH_TEXT',
        payload: {
            searchText,
        }
    })

export const newImagePlayer =
    (imagePlayer) => ({
        type: 'NEW_IMAGE_PLAYER',
        payload: {
            imagePlayer,
        }
    })

export const newArraySongs =
    (arraySongs) => ({
        type: 'NEW_ARRAY_SONGS',
        payload: {
            arraySongs,
        }
    })

export const newPlayerSC =
    (playerSC, startSong) => ({
        type: 'NEW_PLAYER_SC',
        payload: {
            playerSC,
        }
    })